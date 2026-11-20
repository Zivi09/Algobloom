import { db } from '../db/index.js';
import { getLessonQuiz } from '../curriculum/quizData.js';
import { ProgressService } from './progressService.js';

export interface QuizSubmissionResult {
  score: number;
  totalQuestions: number;
  xpEarned: number;
  plantUpdated: {
    algorithmId: string;
    stage: string;
    flowerType: string;
  } | null;
  unlockedAchievements: string[];
  explanations: string[];
  flaggedCheating?: boolean;
}

export class QuizService {
  public static evaluateQuiz(
    userId: string,
    lessonId: string,
    answers: number[],
    timeSpentSeconds: number
  ): QuizSubmissionResult {
    const quizInfo = getLessonQuiz(lessonId);
    if (!quizInfo) {
      throw new Error(`Quiz for lesson "${lessonId}" not found`);
    }

    const totalQuestions = quizInfo.questions.length;
    let score = 0;
    const incorrectQuestions: string[] = [];
    const explanations: string[] = [];

    // Anti-cheat timing heuristic: minimum 3 seconds total for 5 questions
    const flaggedCheating = timeSpentSeconds < 3;

    for (let i = 0; i < totalQuestions; i++) {
      const q = quizInfo.questions[i];
      const submitted = answers[i];
      const isCorrect = submitted === q.correctIndex;

      if (isCorrect) {
        score += 1;
      } else {
        incorrectQuestions.push(q.question);
      }
      explanations.push(q.explanation);
    }

    // Anti-cheat score adjustment if suspiciously instant
    let xpEarned = 0;
    if (flaggedCheating) {
      xpEarned = 10; // minimal XP for instant automated bots
    } else {
      if (score === 5) xpEarned = 150;
      else if (score === 4) xpEarned = 100;
      else if (score === 3) xpEarned = 60;
      else if (score === 2) xpEarned = 30;
      else xpEarned = 10;
    }

    // 1. Record Submission
    db.addQuizSubmission({
      user_id: userId,
      lesson_id: lessonId,
      score,
      total_questions: totalQuestions,
      answers_payload: answers,
      time_spent_seconds: timeSpentSeconds,
      xp_awarded: xpEarned,
    });

    // 2. Update Lesson Progress
    const existingProgress = db.findLessonProgress(userId, lessonId);
    const existingBest = existingProgress?.best_score || 0;
    const bestScore = Math.max(existingBest, score);
    const attempts = (existingProgress?.attempts_count || 0) + 1;
    const status =
      bestScore >= 5 ? 'mastered' : bestScore >= 4 ? 'completed' : 'in_progress';
    const now = new Date().toISOString();

    db.upsertLessonProgress(userId, lessonId, {
      best_score: bestScore,
      attempts_count: attempts,
      status,
      completed_at: status !== 'in_progress' ? now : null,
    });

    // 3. User Plant update (bloom if score >= 4)
    let plantUpdated: { algorithmId: string; stage: string; flowerType: string } | null = null;
    const existingPlant = db.findUserPlant(userId, lessonId);

    if (score >= 4) {
      const plant = db.upsertUserPlant(userId, lessonId, {
        plant_name: existingPlant?.plant_name || `${quizInfo.title} Blossom`,
        flower_type: existingPlant?.flower_type || quizInfo.flowerType,
        stage: 'bloomed',
        bloomed_at: existingPlant?.bloomed_at || now,
      });

      plantUpdated = {
        algorithmId: lessonId,
        stage: 'bloomed',
        flowerType: plant.flower_type,
      };

      // Remove from revision queue if previously failed
      db.removeRevisionItem(userId, lessonId);
    } else {
      // Add or keep in revision queue
      db.upsertRevisionItem(userId, lessonId, {
        algorithm_title: quizInfo.title,
        reason: `Scored ${score}/${totalQuestions}. Review tricky concepts!`,
        incorrect_questions: incorrectQuestions,
      });

      if (existingPlant) {
        plantUpdated = {
          algorithmId: lessonId,
          stage: existingPlant.stage,
          flowerType: existingPlant.flower_type,
        };
      }
    }

    // 4. Update Profile XP
    const profile = db.findProfileByUserId(userId);
    if (profile) {
      db.updateProfile(userId, {
        total_xp: profile.total_xp + xpEarned,
        last_active_date: now.split('T')[0],
      });
    }

    // 5. Update Guild XP if user is in a guild
    const membership = db.getUserGuildMembership(userId);
    if (membership) {
      db.addXpToGuild(membership.guild_id, xpEarned);
    }

    // 6. Check and unlock achievements
    const unlockedAchievements = ProgressService.evaluateAchievements(userId);

    return {
      score,
      totalQuestions,
      xpEarned,
      plantUpdated,
      unlockedAchievements,
      explanations,
      flaggedCheating,
    };
  }
}
