import { User, Habit, HabitCompletion, NotificationSettings } from './types';

const STORAGE_KEYS = {
  USER: 'flash_user',
  HABITS: 'flash_habits',
  COMPLETIONS: 'flash_completions',
  NOTIFICATIONS: 'flash_notifications',
};

// User management
export const getUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const userJson = localStorage.getItem(STORAGE_KEYS.USER);
  return userJson ? JSON.parse(userJson) : null;
};

export const setUser = (user: User) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const removeUser = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.USER);
};

// Habits management
export const getHabits = (): Habit[] => {
  if (typeof window === 'undefined') return [];
  const habitsJson = localStorage.getItem(STORAGE_KEYS.HABITS);
  return habitsJson ? JSON.parse(habitsJson) : [];
};

export const setHabits = (habits: Habit[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
};

export const addHabit = (habit: Habit) => {
  const habits = getHabits();
  habits.push(habit);
  setHabits(habits);
};

export const updateHabit = (habitId: string, updates: Partial<Habit>) => {
  const habits = getHabits();
  const index = habits.findIndex(h => h.id === habitId);
  if (index !== -1) {
    habits[index] = { ...habits[index], ...updates, updatedAt: new Date().toISOString() };
    setHabits(habits);
  }
};

export const deleteHabit = (habitId: string) => {
  const habits = getHabits();
  const filtered = habits.filter(h => h.id !== habitId);
  setHabits(filtered);
  
  // Also delete completions
  const completions = getCompletions();
  const filteredCompletions = completions.filter(c => c.habitId !== habitId);
  setCompletions(filteredCompletions);
};

// Completions management
export const getCompletions = (): HabitCompletion[] => {
  if (typeof window === 'undefined') return [];
  const completionsJson = localStorage.getItem(STORAGE_KEYS.COMPLETIONS);
  return completionsJson ? JSON.parse(completionsJson) : [];
};

export const setCompletions = (completions: HabitCompletion[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.COMPLETIONS, JSON.stringify(completions));
};

export const addCompletion = (completion: HabitCompletion) => {
  const completions = getCompletions();
  completions.push(completion);
  setCompletions(completions);
};

export const removeCompletion = (completionId: string) => {
  const completions = getCompletions();
  const filtered = completions.filter(c => c.id !== completionId);
  setCompletions(filtered);
};

export const isHabitCompletedOnDate = (habitId: string, date: string): boolean => {
  const completions = getCompletions();
  return completions.some(c => c.habitId === habitId && c.date === date);
};

// Notifications management
export const getNotificationSettings = (): NotificationSettings => {
  if (typeof window === 'undefined') return { enabled: false, time: '09:00', days: [0, 1, 2, 3, 4, 5, 6] };
  const settingsJson = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
  return settingsJson ? JSON.parse(settingsJson) : { enabled: false, time: '09:00', days: [0, 1, 2, 3, 4, 5, 6] };
};

export const setNotificationSettings = (settings: NotificationSettings) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(settings));
};

// Utility functions
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const getStreak = (habitId: string): number => {
  const completions = getCompletions()
    .filter(c => c.habitId === habitId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (completions.length === 0) return 0;

  let streak = 0;
  const today = formatDate(new Date());
  const yesterday = formatDate(new Date(Date.now() - 24 * 60 * 60 * 1000));

  let currentDate = completions[0].date === today ? today : completions[0].date === yesterday ? yesterday : null;
  
  if (!currentDate) return 0;

  for (const completion of completions) {
    if (completion.date === currentDate) {
      streak++;
      const date = new Date(currentDate);
      date.setDate(date.getDate() - 1);
      currentDate = formatDate(date);
    } else {
      break;
    }
  }

  return streak;
};
