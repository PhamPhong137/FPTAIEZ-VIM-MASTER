import { UserProgress } from '../types';

const KEY = 'vimmaster_progress_v1';

const INITIAL_PROGRESS: UserProgress = {
  currentLevel: 1,
  badges: [],
  challengePoints: 0,
  codesUsed: []
};

export const loadProgress = (): UserProgress => {
  try {
    const stored = localStorage.getItem(KEY);
    if (stored) {
      return { ...INITIAL_PROGRESS, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.error("Failed to load progress", e);
  }
  return INITIAL_PROGRESS;
};

export const saveProgress = (progress: UserProgress) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Failed to save progress", e);
  }
};

export const exportProgress = (): string => {
  const p = loadProgress();
  return btoa(JSON.stringify(p));
};

export const importProgress = (code: string): boolean => {
  try {
    const decoded = atob(code);
    const parsed = JSON.parse(decoded);
    if (parsed.currentLevel) {
      saveProgress(parsed);
      return true;
    }
  } catch (e) {
    console.error("Invalid code", e);
  }
  return false;
};