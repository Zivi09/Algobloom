import {
  UserProfile,
  UserProgress,
  LeaderboardEntry,
  Guild,
  PublicGardenProfile,
  GardenReactionType,
} from '../types';

const TOKEN_KEY = 'algobloom_token';
const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:3001/api/v1';

// In-memory or local mock fallback state to ensure seamless offline functionality
const MOCK_CURRENT_USER: UserProfile = {
  id: 'usr-botanist-current',
  email: 'learner@algobloom.dev',
  username: 'blossom_coder',
  displayName: 'Cherry Coder',
  bio: 'Blooming algorithms one step at a time 🌸 Computer Science Explorer',
  avatarFlower: 'cherry-blossom',
  totalXp: 380,
  currentStreak: 4,
  leagueTier: 'BUDDING',
  isGardenPublic: true,
  role: 'USER',
};

const MOCK_LEADERBOARD_USERS: LeaderboardEntry[] = [
  {
    rank: 1,
    userId: 'usr-1',
    username: 'daisy_master',
    displayName: 'Daisy Chen',
    avatarFlower: 'sunflower',
    totalXp: 1850,
    streak: 24,
    leagueTier: 'ANCIENT_GROVE',
    bloomedCount: 12,
  },
  {
    rank: 2,
    userId: 'usr-2',
    username: 'lotus_coder',
    displayName: 'Leo Varma',
    avatarFlower: 'lotus',
    totalXp: 1520,
    streak: 18,
    leagueTier: 'BLOSSOM',
    bloomedCount: 9,
  },
  {
    rank: 3,
    userId: 'usr-3',
    username: 'orchid_maya',
    displayName: 'Maya Patel',
    avatarFlower: 'orchid',
    totalXp: 1340,
    streak: 15,
    leagueTier: 'BLOSSOM',
    bloomedCount: 8,
  },
  {
    rank: 4,
    userId: 'usr-4',
    username: 'rose_algorithmist',
    displayName: 'Sam Thorne',
    avatarFlower: 'rose',
    totalXp: 1190,
    streak: 12,
    leagueTier: 'BUDDING',
    bloomedCount: 7,
  },
  {
    rank: 5,
    userId: 'usr-5',
    username: 'tulip_tutor',
    displayName: 'Alex Kim',
    avatarFlower: 'tulip',
    totalXp: 980,
    streak: 9,
    leagueTier: 'BUDDING',
    bloomedCount: 6,
  },
  {
    rank: 6,
    userId: 'usr-6',
    username: 'lavender_dev',
    displayName: 'Sophia Martinez',
    avatarFlower: 'lavender',
    totalXp: 850,
    streak: 7,
    leagueTier: 'SPROUT',
    bloomedCount: 5,
  },
  {
    rank: 7,
    userId: 'usr-7',
    username: 'botanist_kai',
    displayName: 'Kai Tanaka',
    avatarFlower: 'daisy',
    totalXp: 720,
    streak: 5,
    leagueTier: 'SPROUT',
    bloomedCount: 4,
  },
];

const MOCK_GUILDS: Guild[] = [
  {
    id: 'guild-binary-botanists',
    name: 'The Binary Botanists',
    motto: 'Divide, conquer, and let the branches bloom 🌿',
    bannerColor: '#92B890',
    totalXp: 8420,
    level: 5,
    memberCount: 24,
    ownerId: 'usr-1',
    sacredTreeStage: 'great-oak',
    communalProgress: 75,
    members: [
      {
        userId: 'usr-1',
        username: 'daisy_master',
        displayName: 'Daisy Chen',
        avatarFlower: 'sunflower',
        role: 'OWNER',
        xpContributed: 1850,
        joinedAt: '2026-10-01T00:00:00Z',
      },
      {
        userId: 'usr-2',
        username: 'lotus_coder',
        displayName: 'Leo Varma',
        avatarFlower: 'lotus',
        role: 'OFFICER',
        xpContributed: 1520,
        joinedAt: '2026-10-05T00:00:00Z',
      },
      {
        userId: 'usr-3',
        username: 'orchid_maya',
        displayName: 'Maya Patel',
        avatarFlower: 'orchid',
        role: 'MEMBER',
        xpContributed: 1340,
        joinedAt: '2026-10-12T00:00:00Z',
      },
    ],
  },
  {
    id: 'guild-graph-grove',
    name: 'Graph Grove',
    motto: 'Traversing the shortest path to wisdom 🪷',
    bannerColor: '#E29578',
    totalXp: 6310,
    level: 4,
    memberCount: 19,
    ownerId: 'usr-2',
    sacredTreeStage: 'sapling',
    communalProgress: 45,
    members: [
      {
        userId: 'usr-2',
        username: 'lotus_coder',
        displayName: 'Leo Varma',
        avatarFlower: 'lotus',
        role: 'OWNER',
        xpContributed: 1520,
        joinedAt: '2026-10-02T00:00:00Z',
      },
    ],
  },
  {
    id: 'guild-dp-blossom',
    name: 'DP Blossom Club',
    motto: 'Remembering past subproblems, blooming future solutions 🌺',
    bannerColor: '#A8DADC',
    totalXp: 5190,
    level: 3,
    memberCount: 16,
    ownerId: 'usr-4',
    sacredTreeStage: 'sapling',
    communalProgress: 60,
    members: [
      {
        userId: 'usr-4',
        username: 'rose_algorithmist',
        displayName: 'Sam Thorne',
        avatarFlower: 'rose',
        role: 'OWNER',
        xpContributed: 1190,
        joinedAt: '2026-10-08T00:00:00Z',
      },
    ],
  },
  {
    id: 'guild-sorting-sprouts',
    name: 'Sorting Sprouts',
    motto: 'Bringing graceful order to random chaos 🌱',
    bannerColor: '#F3C68F',
    totalXp: 3840,
    level: 2,
    memberCount: 14,
    ownerId: 'usr-5',
    sacredTreeStage: 'seed',
    communalProgress: 30,
    members: [],
  },
];

class ApiClient {
  private token: string | null = null;

  constructor() {
    this.token = this.getToken();
  }

  public getToken(): string | null {
    if (this.token) return this.token;
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  }

  public setToken(token: string): void {
    this.token = token;
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      // ignore
    }
  }

  public clearToken(): void {
    this.token = null;
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      // ignore
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE}${endpoint}`;
    const token = this.getToken();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(errorData.message || `Request failed with status ${res.status}`);
      }

      return (await res.json()) as T;
    } catch (err: any) {
      // Graceful offline fallback logging
      console.warn(`[ApiClient] Live API unreachable at ${endpoint}:`, err.message || err);
      throw err;
    }
  }

  // --- Auth Endpoints ---
  public auth = {
    register: async (
      email: string,
      password: string,
      username: string,
      displayName: string
    ): Promise<{ user: UserProfile; token: string }> => {
      try {
        const res = await this.request<{ user: UserProfile; token: string }>('/auth/register', {
          method: 'POST',
          body: JSON.stringify({ email, password, username, displayName }),
        });
        if (res.token) {
          this.setToken(res.token);
        }
        return res;
      } catch {
        // Mock offline fallback
        const mockUser: UserProfile = {
          id: `usr-${Date.now()}`,
          email,
          username: username.toLowerCase().replace(/\s+/g, '_'),
          displayName: displayName || username,
          avatarFlower: 'cherry-blossom',
          totalXp: 120,
          currentStreak: 3,
          leagueTier: 'SEEDLING',
          isGardenPublic: true,
          bio: 'Aspiring botanical algorithmist 🌸',
          role: 'USER',
          createdAt: new Date().toISOString(),
        };
        const mockToken = `mock-jwt-${Date.now()}`;
        this.setToken(mockToken);
        localStorage.setItem('algobloom_mock_user', JSON.stringify(mockUser));
        return { user: mockUser, token: mockToken };
      }
    },

    login: async (
      email: string,
      password: string
    ): Promise<{ user: UserProfile; token: string }> => {
      try {
        const res = await this.request<{ user: UserProfile; token: string }>('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        });
        if (res.token) {
          this.setToken(res.token);
        }
        return res;
      } catch {
        // Offline fallback
        const savedMock = localStorage.getItem('algobloom_mock_user');
        const user: UserProfile = savedMock
          ? JSON.parse(savedMock)
          : { ...MOCK_CURRENT_USER, email };
        const token = `mock-jwt-${Date.now()}`;
        this.setToken(token);
        return { user, token };
      }
    },

    getMe: async (): Promise<{ user: UserProfile; progressSummary?: any }> => {
      try {
        return await this.request<{ user: UserProfile; progressSummary?: any }>('/auth/me');
      } catch {
        const savedMock = localStorage.getItem('algobloom_mock_user');
        const user: UserProfile = savedMock ? JSON.parse(savedMock) : MOCK_CURRENT_USER;
        return { user };
      }
    },

    logout: async (): Promise<void> => {
      try {
        await this.request('/auth/logout', { method: 'POST' });
      } catch {
        // ignore
      } finally {
        this.clearToken();
        localStorage.removeItem('algobloom_mock_user');
      }
    },

    syncGuest: async (
      guestProgress: UserProgress
    ): Promise<{ success: boolean; updatedProgress: UserProgress }> => {
      try {
        return await this.request<{ success: boolean; updatedProgress: UserProgress }>('/auth/sync-guest', {
          method: 'POST',
          body: JSON.stringify({ guestProgress }),
        });
      } catch {
        // Offline mock success
        return { success: true, updatedProgress: guestProgress };
      }
    },
  };

  // --- Progress Endpoints ---
  public progress = {
    getProgress: async (): Promise<UserProgress> => {
      try {
        return await this.request<UserProgress>('/progress');
      } catch {
        const raw = localStorage.getItem('algobloom_user_progress_v1');
        return raw ? JSON.parse(raw) : (null as any);
      }
    },

    sync: async (fullProgress: UserProgress): Promise<{ success: boolean }> => {
      try {
        return await this.request<{ success: boolean }>('/progress/sync', {
          method: 'POST',
          body: JSON.stringify({ fullProgress }),
        });
      } catch {
        return { success: true };
      }
    },

    plant: async (
      algorithmId: string,
      flowerType: string,
      plantName: string
    ): Promise<{ success: boolean; plant: any }> => {
      try {
        return await this.request('/progress/plant', {
          method: 'POST',
          body: JSON.stringify({ algorithmId, flowerType, plantName }),
        });
      } catch {
        return {
          success: true,
          plant: {
            id: `plant-${algorithmId}`,
            algorithmId,
            name: plantName,
            stage: 'seed',
            flowerType,
            plantedAt: new Date().toISOString(),
          },
        };
      }
    },

    submitQuiz: async (
      lessonId: string,
      answers: number[],
      timeSpentSeconds: number
    ): Promise<{
      score: number;
      totalQuestions: number;
      xpEarned: number;
      plantUpdated?: any;
      unlockedAchievements?: string[];
      explanations?: string[];
    }> => {
      try {
        return await this.request(`/lessons/${lessonId}/quiz/submit`, {
          method: 'POST',
          body: JSON.stringify({ answers, timeSpentSeconds }),
        });
      } catch {
        // Fallback calculation for offline mode
        const score = answers.length;
        return {
          score,
          totalQuestions: answers.length,
          xpEarned: score * 20,
          plantUpdated: {
            algorithmId: lessonId,
            stage: 'bloomed',
            flowerType: 'rose',
          },
          unlockedAchievements: [],
          explanations: [],
        };
      }
    },
  };

  // --- Social & Public Garden Endpoints ---
  public social = {
    getUserProfile: async (username: string): Promise<UserProfile> => {
      try {
        return await this.request<UserProfile>(`/users/@${username}`);
      } catch {
        const found = MOCK_LEADERBOARD_USERS.find(
          (u) => u.username.toLowerCase() === username.toLowerCase()
        );
        if (found) {
          return {
            id: found.userId,
            email: `${found.username}@algobloom.dev`,
            username: found.username,
            displayName: found.displayName,
            bio: 'Growing algorithmic mastery petal by petal in AlgoBloom 🌱',
            avatarFlower: found.avatarFlower,
            totalXp: found.totalXp,
            currentStreak: found.streak,
            leagueTier: found.leagueTier,
            isGardenPublic: true,
          };
        }
        return {
          id: 'usr-sample',
          email: `${username}@algobloom.dev`,
          username,
          displayName: username.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
          bio: 'Passionate computer science and botanical gardening learner 🌸',
          avatarFlower: 'cherry-blossom',
          totalXp: 820,
          currentStreak: 6,
          leagueTier: 'SPROUT',
          isGardenPublic: true,
        };
      }
    },

    getUserGarden: async (username: string): Promise<PublicGardenProfile> => {
      try {
        return await this.request<PublicGardenProfile>(`/users/@${username}/garden`);
      } catch {
        const profile = await this.social.getUserProfile(username);
        return {
          username: profile.username,
          displayName: profile.displayName,
          avatarFlower: profile.avatarFlower,
          bio: profile.bio || 'Blooming botanical garden in AlgoBloom.',
          totalXp: profile.totalXp,
          streak: profile.currentStreak,
          leagueTier: profile.leagueTier,
          reactions: {
            blossom: 18,
            bee: 12,
            water: 25,
          },
          badges: ['Binary Blossom', 'Graph Botanist', 'Bouquet of Five', 'Streak Bloomer'],
          flowers: [
            {
              algorithmId: 'what-is-an-algorithm',
              plantName: 'Algorithm Seedling',
              flowerType: 'daisy',
              stage: 'bloomed',
              bloomedAt: '2026-10-15T10:00:00Z',
              bestScore: 5,
            },
            {
              algorithmId: 'binary-search',
              plantName: 'Binary Search Blossom',
              flowerType: 'cherry-blossom',
              stage: 'bloomed',
              bloomedAt: '2026-10-18T14:30:00Z',
              bestScore: 5,
            },
            {
              algorithmId: 'breadth-first-search',
              plantName: 'BFS Lotus Node',
              flowerType: 'lotus',
              stage: 'bloomed',
              bloomedAt: '2026-10-22T19:15:00Z',
              bestScore: 5,
            },
            {
              algorithmId: 'merge-sort',
              plantName: 'Merge Sort Tulip',
              flowerType: 'tulip',
              stage: 'bloomed',
              bloomedAt: '2026-10-25T11:20:00Z',
              bestScore: 5,
            },
            {
              algorithmId: 'dijkstra',
              plantName: 'Golden Dijkstra',
              flowerType: 'sunflower',
              stage: 'sprout',
              plantedAt: '2026-11-01T08:00:00Z',
              bestScore: 4,
            },
          ],
        };
      }
    },

    reactToGarden: async (
      username: string,
      reactionType: GardenReactionType
    ): Promise<{ success: boolean; newCounts: Record<GardenReactionType, number> }> => {
      try {
        return await this.request(`/users/@${username}/react`, {
          method: 'POST',
          body: JSON.stringify({ reactionType }),
        });
      } catch {
        return {
          success: true,
          newCounts: { blossom: 19, bee: 13, water: 26 },
        };
      }
    },
  };

  // --- Leaderboards ---
  public leaderboard = {
    getWeekly: async (): Promise<LeaderboardEntry[]> => {
      try {
        return await this.request<LeaderboardEntry[]>('/leaderboard/weekly');
      } catch {
        return MOCK_LEADERBOARD_USERS;
      }
    },

    getAllTime: async (): Promise<LeaderboardEntry[]> => {
      try {
        return await this.request<LeaderboardEntry[]>('/leaderboard/all-time');
      } catch {
        return [...MOCK_LEADERBOARD_USERS].sort((a, b) => b.totalXp - a.totalXp);
      }
    },
  };

  // --- Garden Guilds ---
  public guilds = {
    getAll: async (): Promise<Guild[]> => {
      try {
        return await this.request<Guild[]>('/guilds');
      } catch {
        return MOCK_GUILDS;
      }
    },

    getById: async (id: string): Promise<Guild> => {
      try {
        return await this.request<Guild>(`/guilds/${id}`);
      } catch {
        const found = MOCK_GUILDS.find((g) => g.id === id);
        if (found) return found;
        return MOCK_GUILDS[0];
      }
    },

    join: async (id: string): Promise<{ success: boolean; guild: Guild }> => {
      try {
        return await this.request(`/guilds/${id}/join`, {
          method: 'POST',
        });
      } catch {
        const found = MOCK_GUILDS.find((g) => g.id === id) || MOCK_GUILDS[0];
        return {
          success: true,
          guild: {
            ...found,
            memberCount: found.memberCount + 1,
          },
        };
      }
    },
  };
}

export const apiClient = new ApiClient();
