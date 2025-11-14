export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Habit {
  id: string;
  userId: string;
  name: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  color: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  archived: boolean;
}

export interface HabitCompletion {
  id: string;
  habitId: string;
  userId: string;
  completedAt: string;
  date: string; // YYYY-MM-DD format
}

export type ViewPeriod = 'day' | 'week' | 'month';

export type SortBy = 'name' | 'date' | 'frequency' | 'status';

export interface NotificationSettings {
  enabled: boolean;
  time: string; // HH:MM format
  days: number[]; // 0-6, Sunday is 0
}
