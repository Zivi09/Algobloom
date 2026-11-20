import { GuildRole, LeagueTier, PlantStage, Role, UserSettings } from '../types/index.js';

export interface UserRecord {
  id: string;
  email: string;
  password_hash: string | null;
  oauth_provider: string | null;
  oauth_id: string | null;
  role: Role;
  created_at: string;
  updated_at: string;
}

export interface UserProfileRecord {
  user_id: string;
  username: string;
  display_name: string;
  bio: string | null;
  avatar_flower: string;
  total_xp: number;
  current_streak: number;
  last_active_date: string;
  league_tier: LeagueTier;
  is_garden_public: boolean;
  settings: UserSettings;
  created_at: string;
  updated_at: string;
}

export interface LessonProgressRecord {
  id: string;
  user_id: string;
  lesson_id: string;
  status: 'started' | 'in_progress' | 'completed' | 'mastered';
  best_score: number;
  attempts_count: number;
  completed_at: string | null;
  updated_at: string;
}

export interface UserPlantRecord {
  id: string;
  user_id: string;
  algorithm_id: string;
  plant_name: string;
  stage: PlantStage;
  flower_type: string;
  planted_at: string;
  bloomed_at: string | null;
}

export interface QuizSubmissionRecord {
  id: string;
  user_id: string;
  lesson_id: string;
  score: number;
  total_questions: number;
  answers_payload: number[] | Record<string, unknown>;
  time_spent_seconds: number;
  xp_awarded: number;
  submitted_at: string;
}

export interface UserAchievementRecord {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
}

export interface BookmarkRecord {
  id: string;
  user_id: string;
  algorithm_id: string;
  created_at: string;
}

export interface RevisionItemRecord {
  id: string;
  user_id: string;
  lesson_id: string;
  algorithm_title: string;
  reason: string;
  incorrect_questions: string[];
  added_at: string;
}

export interface GardenReactionRecord {
  id: string;
  giver_id: string;
  receiver_id: string;
  reaction_type: 'blossom' | 'bee' | 'water';
  created_at: string;
}

export interface GuildRecord {
  id: string;
  name: string;
  motto: string | null;
  banner_color: string;
  total_xp: number;
  level: number;
  owner_id: string;
  created_at: string;
}

export interface GuildMemberRecord {
  id: string;
  guild_id: string;
  user_id: string;
  role: GuildRole;
  joined_at: string;
}

export interface AlgoRaceRecord {
  id: string;
  room_code: string;
  algorithm_id: string;
  status: 'waiting' | 'in_progress' | 'finished';
  created_at: string;
}

export interface RaceParticipantRecord {
  id: string;
  race_id: string;
  user_id: string;
  final_score: number;
  rank: number | null;
  finished_at: string | null;
}

export interface DatabaseSchema {
  users: UserRecord[];
  user_profiles: UserProfileRecord[];
  lesson_progress: LessonProgressRecord[];
  user_plants: UserPlantRecord[];
  quiz_submissions: QuizSubmissionRecord[];
  user_achievements: UserAchievementRecord[];
  bookmarks: BookmarkRecord[];
  revision_items: RevisionItemRecord[];
  garden_reactions: GardenReactionRecord[];
  guilds: GuildRecord[];
  guild_members: GuildMemberRecord[];
  algo_races: AlgoRaceRecord[];
  race_participants: RaceParticipantRecord[];
}
