import React from 'react';
import { Habit } from '../lib/types';
import { useApp } from '../contexts/AppContext';
import { formatDate } from '../lib/storage';
import { Checkbox } from './ui/checkbox';
import { Flame, Trash2, Edit, Target } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { MoreVertical } from 'lucide-react';

interface HabitCardProps {
  habit: Habit;
  date: string;
  onEdit: (habit: Habit) => void;
  onDelete: (habitId: string) => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({ habit, date, onEdit, onDelete }) => {
  const { completions, toggleHabitCompletion, getHabitStreak } = useApp();
  
  const isCompleted = completions.some(
    c => c.habitId === habit.id && c.date === date
  );
  
  const streak = getHabitStreak(habit.id);

  const handleToggle = () => {
    toggleHabitCompletion(habit.id, date);
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      target: Target,
      flame: Flame,
    };
    const Icon = icons[iconName] || Target;
    return <Icon className="w-5 h-5" />;
  };

  return (
    <div 
      className="bg-card border-2 border-primary/20 rounded-lg p-4 shadow-lg hover:border-primary/40 transition-all relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${habit.color}15 0%, transparent 100%)`
      }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5" 
        style={{
          background: `radial-gradient(circle, ${habit.color} 0%, transparent 70%)`
        }}
      />
      
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-start gap-3 flex-1">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${habit.color}30`, color: habit.color }}
          >
            {getIconComponent(habit.icon)}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="mb-1">{habit.name}</h3>
            {habit.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">{habit.description}</p>
            )}
            
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1 text-xs">
                <span className="px-2 py-0.5 bg-secondary/20 text-secondary rounded">
                  {habit.frequency === 'daily' ? 'Quotidien' : habit.frequency === 'weekly' ? 'Hebdo' : 'Mensuel'}
                </span>
              </div>
              
              {streak > 0 && (
                <div className="flex items-center gap-1 text-secondary">
                  <Flame className="w-4 h-4" />
                  <span className="text-xs">{streak} jour{streak > 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            checked={isCompleted}
            onCheckedChange={handleToggle}
            className="w-6 h-6 border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(habit)}>
                <Edit className="w-4 h-4 mr-2" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(habit.id)}
                className="text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
