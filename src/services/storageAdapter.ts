import { UserProfile, UserProgress } from '../types';
import { apiClient } from './apiClient';

const GUEST_STORAGE_KEY = 'algobloom_user_progress_v1';
const AUTH_USER_KEY = 'algobloom_auth_user';

type AuthListener = (user: UserProfile | null) => void;

export class StorageAdapter {
  private static instance: StorageAdapter;
  private currentUser: UserProfile | null = null;
  private token: string | null = null;
  private authListeners: Set<AuthListener> = new Set();

  private constructor() {
    this.token = apiClient.getToken();
    const storedUser = localStorage.getItem(AUTH_USER_KEY);
    if (storedUser) {
      try {
        this.currentUser = JSON.parse(storedUser);
      } catch {
        this.currentUser = null;
      }
    }
  }

  public static getInstance(): StorageAdapter {
    if (!StorageAdapter.instance) {
      StorageAdapter.instance = new StorageAdapter();
    }
    return StorageAdapter.instance;
  }

  public isLoggedIn(): boolean {
    return !!this.token && !!this.currentUser;
  }

  public getCurrentUser(): UserProfile | null {
    return this.currentUser;
  }

  public getToken(): string | null {
    return this.token;
  }

  public onAuthChange(listener: AuthListener): () => void {
    this.authListeners.add(listener);
    // Call immediately with current state
    listener(this.currentUser);
    return () => this.authListeners.delete(listener);
  }

  private notifyAuthChange(): void {
    this.authListeners.forEach((fn) => {
      try {
        fn(this.currentUser);
      } catch (err) {
        console.error('Error in auth change listener:', err);
      }
    });
  }

  public async login(email: string, pass: string): Promise<UserProfile> {
    const res = await apiClient.auth.login(email, pass);
    this.token = res.token;
    this.currentUser = res.user;
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(res.user));
    this.notifyAuthChange();
    return res.user;
  }

  public async register(
    email: string,
    pass: string,
    username: string,
    displayName: string,
    guestProgressToSync?: UserProgress
  ): Promise<UserProfile> {
    const res = await apiClient.auth.register(email, pass, username, displayName);
    this.token = res.token;
    this.currentUser = res.user;
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(res.user));

    if (guestProgressToSync) {
      await this.migrateGuestToAccount(guestProgressToSync);
    }

    this.notifyAuthChange();
    return res.user;
  }

  public async logout(): Promise<void> {
    await apiClient.auth.logout();
    this.token = null;
    this.currentUser = null;
    localStorage.removeItem(AUTH_USER_KEY);
    this.notifyAuthChange();
  }

  public async migrateGuestToAccount(guestProgress: UserProgress): Promise<UserProgress> {
    const res = await apiClient.auth.syncGuest(guestProgress);
    if (res.updatedProgress) {
      this.saveLocalCache(res.updatedProgress);
      return res.updatedProgress;
    }
    return guestProgress;
  }

  public loadLocalProgress(): UserProgress | null {
    try {
      const raw = localStorage.getItem(GUEST_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.warn('Failed to parse local progress:', e);
      return null;
    }
  }

  public saveLocalCache(progress: UserProgress): void {
    try {
      localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }

  public async syncProgress(progress: UserProgress): Promise<void> {
    // Always persist to local cache first for offline tolerance
    this.saveLocalCache(progress);

    // If authenticated, sync with server
    if (this.isLoggedIn()) {
      try {
        await apiClient.progress.sync(progress);
      } catch (err) {
        console.warn('Background cloud progress sync failed, cached locally:', err);
      }
    }
  }
}

export const storageAdapter = StorageAdapter.getInstance();
