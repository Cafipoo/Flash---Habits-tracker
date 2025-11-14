import React, { useMemo } from 'react';
import { useApp } from '../contexts/AppContext';
import { formatDate } from '../lib/storage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Flame, TrendingUp, Target, Award } from 'lucide-react';

export const Statistics: React.FC = () => {
  const { habits, completions, getHabitStreak } = useApp();

  // Calculate statistics
  const stats = useMemo(() => {
    const today = formatDate(new Date());
    const todayCompletions = completions.filter(c => c.date === today).length;
    const totalActiveHabits = habits.filter(h => !h.archived).length;
    const completionRate = totalActiveHabits > 0 
      ? Math.round((todayCompletions / totalActiveHabits) * 100) 
      : 0;

    const allStreaks = habits.map(h => getHabitStreak(h.id));
    const longestStreak = Math.max(0, ...allStreaks);
    const totalCompletions = completions.length;

    return {
      todayCompletions,
      totalActiveHabits,
      completionRate,
      longestStreak,
      totalCompletions,
    };
  }, [habits, completions, getHabitStreak]);

  // Prepare data for last 7 days
  const last7DaysData = useMemo(() => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = formatDate(date);
      const count = completions.filter(c => c.date === dateStr).length;
      
      data.push({
        date: date.toLocaleDateString('fr-FR', { weekday: 'short' }),
        completions: count,
      });
    }
    return data;
  }, [completions]);

  // Prepare data for habits completion rate
  const habitsData = useMemo(() => {
    return habits
      .filter(h => !h.archived)
      .map(habit => {
        const habitCompletions = completions.filter(c => c.habitId === habit.id);
        const streak = getHabitStreak(habit.id);
        return {
          name: habit.name.length > 15 ? habit.name.substring(0, 15) + '...' : habit.name,
          completions: habitCompletions.length,
          streak,
          color: habit.color,
        };
      })
      .sort((a, b) => b.completions - a.completions)
      .slice(0, 5);
  }, [habits, completions, getHabitStreak]);

  return (
    <div className="pb-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-primary" />
            <p className="text-sm text-muted-foreground">Aujourd'hui</p>
          </div>
          <p className="text-3xl">{stats.todayCompletions}/{stats.totalActiveHabits}</p>
        </div>

        <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 border-2 border-secondary/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-secondary" />
            <p className="text-sm text-muted-foreground">Taux</p>
          </div>
          <p className="text-3xl">{stats.completionRate}%</p>
        </div>

        <div className="bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-primary" />
            <p className="text-sm text-muted-foreground">Plus longue série</p>
          </div>
          <p className="text-3xl">{stats.longestStreak}</p>
        </div>

        <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 border-2 border-secondary/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-secondary" />
            <p className="text-sm text-muted-foreground">Total</p>
          </div>
          <p className="text-3xl">{stats.totalCompletions}</p>
        </div>
      </div>

      {/* Last 7 Days Chart */}
      <div className="bg-card border-2 border-primary/20 rounded-xl p-4 mb-6">
        <h3 className="mb-4">PROGRESSION 7 JOURS</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={last7DaysData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(220, 0, 0, 0.1)" />
            <XAxis 
              dataKey="date" 
              stroke="#a0a0a0"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#a0a0a0"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1a1a1a', 
                border: '2px solid rgba(220, 0, 0, 0.3)',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#ffffff' }}
            />
            <Line 
              type="monotone" 
              dataKey="completions" 
              stroke="#DC0000" 
              strokeWidth={3}
              dot={{ fill: '#DC0000', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Habits Chart */}
      {habitsData.length > 0 && (
        <div className="bg-card border-2 border-primary/20 rounded-xl p-4">
          <h3 className="mb-4">TOP HABITUDES</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={habitsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(220, 0, 0, 0.1)" />
              <XAxis 
                type="number" 
                stroke="#a0a0a0"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                stroke="#a0a0a0"
                style={{ fontSize: '12px' }}
                width={100}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '2px solid rgba(220, 0, 0, 0.3)',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#ffffff' }}
              />
              <Bar 
                dataKey="completions" 
                fill="#DC0000"
                radius={[0, 8, 8, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

          {/* Streaks Display */}
          <div className="mt-6 space-y-2">
            <h4 className="text-sm text-muted-foreground mb-3">SÉRIES ACTUELLES</h4>
            {habitsData.map((habit, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: habit.color }}
                  />
                  <span className="text-sm">{habit.name}</span>
                </div>
                {habit.streak > 0 && (
                  <div className="flex items-center gap-1 text-secondary">
                    <Flame className="w-4 h-4" />
                    <span className="text-sm">{habit.streak}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
