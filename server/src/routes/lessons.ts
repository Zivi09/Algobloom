import { Router, Response } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.js';
import { QuizService } from '../services/quizService.js';
import { getLessonQuiz } from '../curriculum/quizData.js';

const router = Router();

// GET /api/v1/lessons/:lessonId/quiz (Client-safe quiz questions - answer key masked!)
router.get('/:lessonId/quiz', (req, res): void => {
  const { lessonId } = req.params;
  const quizInfo = getLessonQuiz(lessonId);

  if (!quizInfo) {
    res.status(404).json({ error: `Lesson quiz "${lessonId}" not found` });
    return;
  }

  // Anti-cheat: Mask correct answers and explanations before sending to client
  const clientSafeQuestions = quizInfo.questions.map((q) => ({
    id: q.id,
    question: q.question,
    options: q.options,
  }));

  res.json({
    lessonId: quizInfo.lessonId,
    title: quizInfo.title,
    flowerType: quizInfo.flowerType,
    questions: clientSafeQuestions,
  });
});

// POST /api/v1/lessons/:lessonId/quiz/submit
router.post(
  '/:lessonId/quiz/submit',
  requireAuth,
  (req: AuthenticatedRequest, res: Response): void => {
    try {
      const userId = req.user!.userId;
      const lessonId = req.params.lessonId as string;
      const { answers, timeSpentSeconds } = req.body;

      if (!Array.isArray(answers)) {
        res.status(400).json({ error: 'answers must be an array of numbers' });
        return;
      }

      const timeSpent = typeof timeSpentSeconds === 'number' ? timeSpentSeconds : 30;

      const result = QuizService.evaluateQuiz(userId, lessonId, answers, timeSpent);

      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to submit quiz' });
    }
  }
);

export default router;
