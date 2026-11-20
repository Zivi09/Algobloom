import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {
  AlgoRaceRecord,
  BookmarkRecord,
  DatabaseSchema,
  GardenReactionRecord,
  GuildMemberRecord,
  GuildRecord,
  LessonProgressRecord,
  QuizSubmissionRecord,
  RaceParticipantRecord,
  RevisionItemRecord,
  UserAchievementRecord,
  UserPlantRecord,
  UserProfileRecord,
  UserRecord,
} from './schema.js';
import { createInitialSeedData } from './seed.js';

export class JsonDatabase {
  private filePath: string;
  private data: DatabaseSchema;
  private isWriting: boolean = false;

  constructor(filePath?: string) {
    const defaultDataDir = path.resolve(process.cwd(), 'server', 'data');
    if (!fs.existsSync(defaultDataDir)) {
      try {
        fs.mkdirSync(defaultDataDir, { recursive: true });
      } catch (err) {
        // fallback
      }
    }
    this.filePath = filePath || path.join(defaultDataDir, 'db.json');
    this.data = this.loadOrInitialize();
  }

  private loadOrInitialize(): DatabaseSchema {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        // Ensure all arrays exist
        return {
          users: parsed.users || [],
          user_profiles: parsed.user_profiles || [],
          lesson_progress: parsed.lesson_progress || [],
          user_plants: parsed.user_plants || [],
          quiz_submissions: parsed.quiz_submissions || [],
          user_achievements: parsed.user_achievements || [],
          bookmarks: parsed.bookmarks || [],
          revision_items: parsed.revision_items || [],
          garden_reactions: parsed.garden_reactions || [],
          guilds: parsed.guilds || [],
          guild_members: parsed.guild_members || [],
          algo_races: parsed.algo_races || [],
          race_participants: parsed.race_participants || [],
        };
      }
    } catch (err) {
      console.warn('Could not read existing database file, initializing with seed data.', err);
    }

    const seed = createInitialSeedData();
    this.saveDirect(seed);
    return seed;
  }

  private saveDirect(dataToSave: DatabaseSchema): void {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const tempPath = `${this.filePath}.${Date.now()}.tmp`;
    const jsonStr = JSON.stringify(dataToSave, null, 2);
    fs.writeFileSync(tempPath, jsonStr, 'utf-8');
    fs.renameSync(tempPath, this.filePath);
  }

  public persist(): void {
    this.saveDirect(this.data);
  }

  // --- Users ---
  public findUserById(id: string): UserRecord | undefined {
    return this.data.users.find((u) => u.id === id);
  }

  public findUserByEmail(email: string): UserRecord | undefined {
    return this.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  public createUser(user: Omit<UserRecord, 'id' | 'created_at' | 'updated_at'>): UserRecord {
    const now = new Date().toISOString();
    const newUser: UserRecord = {
      ...user,
      id: `usr-${crypto.randomUUID()}`,
      created_at: now,
      updated_at: now,
    };
    this.data.users.push(newUser);
    this.persist();
    return newUser;
  }

  // --- Profiles ---
  public findProfileByUserId(userId: string): UserProfileRecord | undefined {
    return this.data.user_profiles.find((p) => p.user_id === userId);
  }

  public findProfileByUsername(username: string): UserProfileRecord | undefined {
    return this.data.user_profiles.find(
      (p) => p.username.toLowerCase() === username.toLowerCase()
    );
  }

  public createProfile(profile: UserProfileRecord): UserProfileRecord {
    this.data.user_profiles.push(profile);
    this.persist();
    return profile;
  }

  public updateProfile(
    userId: string,
    updates: Partial<UserProfileRecord>
  ): UserProfileRecord | undefined {
    const index = this.data.user_profiles.findIndex((p) => p.user_id === userId);
    if (index === -1) return undefined;
    const now = new Date().toISOString();
    this.data.user_profiles[index] = {
      ...this.data.user_profiles[index],
      ...updates,
      updated_at: now,
    };
    this.persist();
    return this.data.user_profiles[index];
  }

  public getAllProfiles(): UserProfileRecord[] {
    return [...this.data.user_profiles];
  }

  // --- Lesson Progress ---
  public getLessonProgress(userId: string): LessonProgressRecord[] {
    return this.data.lesson_progress.filter((lp) => lp.user_id === userId);
  }

  public findLessonProgress(
    userId: string,
    lessonId: string
  ): LessonProgressRecord | undefined {
    return this.data.lesson_progress.find(
      (lp) => lp.user_id === userId && lp.lesson_id === lessonId
    );
  }

  public upsertLessonProgress(
    userId: string,
    lessonId: string,
    data: Partial<LessonProgressRecord>
  ): LessonProgressRecord {
    const now = new Date().toISOString();
    const index = this.data.lesson_progress.findIndex(
      (lp) => lp.user_id === userId && lp.lesson_id === lessonId
    );

    if (index !== -1) {
      const existing = this.data.lesson_progress[index];
      const updated: LessonProgressRecord = {
        ...existing,
        ...data,
        updated_at: now,
      };
      this.data.lesson_progress[index] = updated;
      this.persist();
      return updated;
    } else {
      const created: LessonProgressRecord = {
        id: `lp-${crypto.randomUUID()}`,
        user_id: userId,
        lesson_id: lessonId,
        status: data.status || 'in_progress',
        best_score: data.best_score || 0,
        attempts_count: data.attempts_count || 1,
        completed_at: data.completed_at || null,
        updated_at: now,
      };
      this.data.lesson_progress.push(created);
      this.persist();
      return created;
    }
  }

  // --- User Plants ---
  public getUserPlants(userId: string): UserPlantRecord[] {
    return this.data.user_plants.filter((p) => p.user_id === userId);
  }

  public findUserPlant(userId: string, algorithmId: string): UserPlantRecord | undefined {
    return this.data.user_plants.find(
      (p) => p.user_id === userId && p.algorithm_id === algorithmId
    );
  }

  public upsertUserPlant(
    userId: string,
    algorithmId: string,
    data: Partial<UserPlantRecord>
  ): UserPlantRecord {
    const now = new Date().toISOString();
    const index = this.data.user_plants.findIndex(
      (p) => p.user_id === userId && p.algorithm_id === algorithmId
    );

    if (index !== -1) {
      const existing = this.data.user_plants[index];
      const updated: UserPlantRecord = {
        ...existing,
        ...data,
      };
      this.data.user_plants[index] = updated;
      this.persist();
      return updated;
    } else {
      const created: UserPlantRecord = {
        id: `plt-${crypto.randomUUID()}`,
        user_id: userId,
        algorithm_id: algorithmId,
        plant_name: data.plant_name || `${algorithmId} Seedling`,
        stage: data.stage || 'seed',
        flower_type: data.flower_type || 'daisy',
        planted_at: data.planted_at || now,
        bloomed_at: data.bloomed_at || null,
      };
      this.data.user_plants.push(created);
      this.persist();
      return created;
    }
  }

  // --- Quiz Submissions ---
  public addQuizSubmission(
    submission: Omit<QuizSubmissionRecord, 'id' | 'submitted_at'>
  ): QuizSubmissionRecord {
    const record: QuizSubmissionRecord = {
      ...submission,
      id: `qs-${crypto.randomUUID()}`,
      submitted_at: new Date().toISOString(),
    };
    this.data.quiz_submissions.push(record);
    this.persist();
    return record;
  }

  public getQuizSubmissions(userId: string, lessonId?: string): QuizSubmissionRecord[] {
    return this.data.quiz_submissions.filter((q) => {
      if (q.user_id !== userId) return false;
      if (lessonId && q.lesson_id !== lessonId) return false;
      return true;
    });
  }

  // --- Achievements ---
  public getUserAchievements(userId: string): UserAchievementRecord[] {
    return this.data.user_achievements.filter((a) => a.user_id === userId);
  }

  public addAchievement(userId: string, achievementId: string): UserAchievementRecord {
    const existing = this.data.user_achievements.find(
      (a) => a.user_id === userId && a.achievement_id === achievementId
    );
    if (existing) return existing;

    const record: UserAchievementRecord = {
      id: `ach-${crypto.randomUUID()}`,
      user_id: userId,
      achievement_id: achievementId,
      unlocked_at: new Date().toISOString(),
    };
    this.data.user_achievements.push(record);
    this.persist();
    return record;
  }

  // --- Bookmarks ---
  public getBookmarks(userId: string): BookmarkRecord[] {
    return this.data.bookmarks.filter((b) => b.user_id === userId);
  }

  public toggleBookmark(userId: string, algorithmId: string): boolean {
    const index = this.data.bookmarks.findIndex(
      (b) => b.user_id === userId && b.algorithm_id === algorithmId
    );
    if (index !== -1) {
      this.data.bookmarks.splice(index, 1);
      this.persist();
      return false; // removed
    } else {
      this.data.bookmarks.push({
        id: `bm-${crypto.randomUUID()}`,
        user_id: userId,
        algorithm_id: algorithmId,
        created_at: new Date().toISOString(),
      });
      this.persist();
      return true; // added
    }
  }

  public setBookmarks(userId: string, algorithmIds: string[]): void {
    this.data.bookmarks = this.data.bookmarks.filter((b) => b.user_id !== userId);
    const now = new Date().toISOString();
    for (const algId of algorithmIds) {
      this.data.bookmarks.push({
        id: `bm-${crypto.randomUUID()}`,
        user_id: userId,
        algorithm_id: algId,
        created_at: now,
      });
    }
    this.persist();
  }

  // --- Revision Items ---
  public getRevisionItems(userId: string): RevisionItemRecord[] {
    return this.data.revision_items.filter((r) => r.user_id === userId);
  }

  public upsertRevisionItem(
    userId: string,
    lessonId: string,
    item: { algorithm_title: string; reason: string; incorrect_questions: string[] }
  ): RevisionItemRecord {
    const index = this.data.revision_items.findIndex(
      (r) => r.user_id === userId && r.lesson_id === lessonId
    );
    const now = new Date().toISOString();
    if (index !== -1) {
      this.data.revision_items[index] = {
        ...this.data.revision_items[index],
        ...item,
        added_at: now,
      };
      this.persist();
      return this.data.revision_items[index];
    } else {
      const record: RevisionItemRecord = {
        id: `rev-${crypto.randomUUID()}`,
        user_id: userId,
        lesson_id: lessonId,
        ...item,
        added_at: now,
      };
      this.data.revision_items.push(record);
      this.persist();
      return record;
    }
  }

  public removeRevisionItem(userId: string, lessonId: string): void {
    this.data.revision_items = this.data.revision_items.filter(
      (r) => !(r.user_id === userId && r.lesson_id === lessonId)
    );
    this.persist();
  }

  // --- Reactions ---
  public getReactionsForUser(receiverId: string): GardenReactionRecord[] {
    return this.data.garden_reactions.filter((r) => r.receiver_id === receiverId);
  }

  public addReaction(
    giverId: string,
    receiverId: string,
    reactionType: 'blossom' | 'bee' | 'water'
  ): GardenReactionRecord {
    const record: GardenReactionRecord = {
      id: `rx-${crypto.randomUUID()}`,
      giver_id: giverId,
      receiver_id: receiverId,
      reaction_type: reactionType,
      created_at: new Date().toISOString(),
    };
    this.data.garden_reactions.push(record);
    this.persist();
    return record;
  }

  // --- Guilds ---
  public getAllGuilds(): GuildRecord[] {
    return [...this.data.guilds];
  }

  public findGuildById(id: string): GuildRecord | undefined {
    return this.data.guilds.find((g) => g.id === id);
  }

  public findGuildByName(name: string): GuildRecord | undefined {
    return this.data.guilds.find((g) => g.name.toLowerCase() === name.toLowerCase());
  }

  public createGuild(guild: Omit<GuildRecord, 'id' | 'created_at' | 'total_xp' | 'level'>): GuildRecord {
    const newGuild: GuildRecord = {
      ...guild,
      id: `gld-${crypto.randomUUID()}`,
      total_xp: 0,
      level: 1,
      created_at: new Date().toISOString(),
    };
    this.data.guilds.push(newGuild);
    // Add owner as owner member
    this.data.guild_members.push({
      id: `gm-${crypto.randomUUID()}`,
      guild_id: newGuild.id,
      user_id: guild.owner_id,
      role: 'OWNER',
      joined_at: new Date().toISOString(),
    });
    this.persist();
    return newGuild;
  }

  public addXpToGuild(guildId: string, xpToAdd: number): GuildRecord | undefined {
    const guild = this.data.guilds.find((g) => g.id === guildId);
    if (!guild) return undefined;
    guild.total_xp += xpToAdd;
    // Level formula: level = Math.floor(total_xp / 1500) + 1
    guild.level = Math.max(1, Math.floor(guild.total_xp / 1500) + 1);
    this.persist();
    return guild;
  }

  public getGuildMembers(guildId: string): GuildMemberRecord[] {
    return this.data.guild_members.filter((gm) => gm.guild_id === guildId);
  }

  public getUserGuildMembership(userId: string): GuildMemberRecord | undefined {
    return this.data.guild_members.find((gm) => gm.user_id === userId);
  }

  public joinGuild(guildId: string, userId: string): GuildMemberRecord {
    // Remove from any existing guild first
    this.data.guild_members = this.data.guild_members.filter((gm) => gm.user_id !== userId);
    const member: GuildMemberRecord = {
      id: `gm-${crypto.randomUUID()}`,
      guild_id: guildId,
      user_id: userId,
      role: 'MEMBER',
      joined_at: new Date().toISOString(),
    };
    this.data.guild_members.push(member);
    this.persist();
    return member;
  }

  // --- AlgoRace ---
  public createAlgoRace(algorithmId: string, roomCode: string): AlgoRaceRecord {
    const race: AlgoRaceRecord = {
      id: `race-${crypto.randomUUID()}`,
      room_code: roomCode,
      algorithm_id: algorithmId,
      status: 'waiting',
      created_at: new Date().toISOString(),
    };
    this.data.algo_races.push(race);
    this.persist();
    return race;
  }

  public findRaceByRoomCode(roomCode: string): AlgoRaceRecord | undefined {
    return this.data.algo_races.find(
      (r) => r.room_code.toUpperCase() === roomCode.toUpperCase()
    );
  }

  public updateRaceStatus(
    raceId: string,
    status: 'waiting' | 'in_progress' | 'finished'
  ): void {
    const race = this.data.algo_races.find((r) => r.id === raceId);
    if (race) {
      race.status = status;
      this.persist();
    }
  }

  public addRaceParticipant(
    raceId: string,
    userId: string
  ): RaceParticipantRecord {
    const existing = this.data.race_participants.find(
      (rp) => rp.race_id === raceId && rp.user_id === userId
    );
    if (existing) return existing;

    const participant: RaceParticipantRecord = {
      id: `rp-${crypto.randomUUID()}`,
      race_id: raceId,
      user_id: userId,
      final_score: 0,
      rank: null,
      finished_at: null,
    };
    this.data.race_participants.push(participant);
    this.persist();
    return participant;
  }

  public getRaceParticipants(raceId: string): RaceParticipantRecord[] {
    return this.data.race_participants.filter((rp) => rp.race_id === raceId);
  }

  public updateRaceParticipant(
    raceId: string,
    userId: string,
    updates: Partial<RaceParticipantRecord>
  ): void {
    const participant = this.data.race_participants.find(
      (rp) => rp.race_id === raceId && rp.user_id === userId
    );
    if (participant) {
      Object.assign(participant, updates);
      this.persist();
    }
  }
}

export const db = new JsonDatabase();
