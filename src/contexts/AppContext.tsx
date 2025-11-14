import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Habit, HabitCompletion, ViewPeriod, SortBy } from '../lib/types';
import * as storage from '../lib/storage';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  habits: Habit[];
  setHabits: (habits: Habit[]) => void;
  completions: HabitCompletion[];
  setCompletions: (completions: HabitCompletion[]) => void;
  viewPeriod: ViewPeriod;
  setViewPeriod: (period: ViewPeriod) => void;
  sortBy: SortBy;
  setSortBy: (sort: SortBy) => void;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  addHabit: (habit: Omit<Habit, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
  updateHabit: (habitId: string, updates: Partial<Habit>) => void;
  deleteHabit: (habitId: string) => void;
  toggleHabitCompletion: (habitId: string, date: string) => void;
  getHabitStreak: (habitId: string) => number;
  refreshData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [habits, setHabitsState] = useState<Habit[]>([]);
  const [completions, setCompletionsState] = useState<HabitCompletion[]>([]);
  const [viewPeriod, setViewPeriod] = useState<ViewPeriod>('day');
  const [sortBy, setSortBy] = useState<SortBy>('date');

  useEffect(() => {
    const storedUser = storage.getUser();
    if (storedUser) {
      setUserState(storedUser);
      loadUserData();
    }
  }, []);

  const loadUserData = () => {
    const storedHabits = storage.getHabits();
    const storedCompletions = storage.getCompletions();
    setHabitsState(storedHabits);
    setCompletionsState(storedCompletions);
  };

  const setUser = (user: User | null) => {
    setUserState(user);
    if (user) {
      storage.setUser(user);
      loadUserData();
    } else {
      storage.removeUser();
      setHabitsState([]);
      setCompletionsState([]);
    }
  };

  const setHabits = (habits: Habit[]) => {
    setHabitsState(habits);
    storage.setHabits(habits);
  };

  const setCompletions = (completions: HabitCompletion[]) => {
    setCompletionsState(completions);
    storage.setCompletions(completions);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo purposes, accept any email/password
    const user: User = {
      id: storage.generateId(),
      email,
      name: email.split('@')[0],
      createdAt: new Date().toISOString(),
    };
    
    setUser(user);
    return true;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user: User = {
      id: storage.generateId(),
      email,
      name,
      createdAt: new Date().toISOString(),
    };
    
    setUser(user);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const addHabit = (habitData: Omit<Habit, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return;
    
    const habit: Habit = {
      ...habitData,
      id: storage.generateId(),
      userId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    storage.addHabit(habit);
    setHabitsState([...habits, habit]);
  };

  const updateHabit = (habitId: string, updates: Partial<Habit>) => {
    storage.updateHabit(habitId, updates);
    const updatedHabits = habits.map(h => 
      h.id === habitId ? { ...h, ...updates, updatedAt: new Date().toISOString() } : h
    );
    setHabitsState(updatedHabits);
  };

  const deleteHabit = (habitId: string) => {
    storage.deleteHabit(habitId);
    setHabitsState(habits.filter(h => h.id !== habitId));
    setCompletionsState(completions.filter(c => c.habitId !== habitId));
  };

  const toggleHabitCompletion = (habitId: string, date: string) => {
    if (!user) return;

    const existingCompletion = completions.find(
      c => c.habitId === habitId && c.date === date
    );

    if (existingCompletion) {
      storage.removeCompletion(existingCompletion.id);
      setCompletionsState(completions.filter(c => c.id !== existingCompletion.id));
    } else {
      const completion: HabitCompletion = {
        id: storage.generateId(),
        habitId,
        userId: user.id,
        completedAt: new Date().toISOString(),
        date,
      };
      storage.addCompletion(completion);
      setCompletionsState([...completions, completion]);
    }
  };

  const getHabitStreak = (habitId: string): number => {
    return storage.getStreak(habitId);
  };

  const refreshData = () => {
    loadUserData();
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        habits,
        setHabits,
        completions,
        setCompletions,
        viewPeriod,
        setViewPeriod,
        sortBy,
        setSortBy,
        login,
        signup,
        logout,
        addHabit,
        updateHabit,
        deleteHabit,
        toggleHabitCompletion,
        getHabitStreak,
        refreshData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
