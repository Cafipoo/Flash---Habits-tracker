import React, { useState, useMemo } from 'react';
import { useApp } from '../contexts/AppContext';
import { HabitCard } from './HabitCard';
import { CreateHabitDialog } from './CreateHabitDialog';
import { Button } from './ui/button';
import { Plus, ArrowUpDown } from 'lucide-react';
import { Habit, SortBy } from '../lib/types';
import { formatDate, getStreak } from '../lib/storage';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

export const HabitList: React.FC = () => {
  const { habits, addHabit, updateHabit, deleteHabit, viewPeriod, sortBy, setSortBy, completions } = useApp();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [deletingHabitId, setDeletingHabitId] = useState<string | null>(null);
  
  const today = formatDate(new Date());

  const sortedHabits = useMemo(() => {
    const activeHabits = habits.filter(h => !h.archived);
    
    switch (sortBy) {
      case 'name':
        return [...activeHabits].sort((a, b) => a.name.localeCompare(b.name));
      
      case 'date':
        return [...activeHabits].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      
      case 'frequency':
        const frequencyOrder = { daily: 0, weekly: 1, monthly: 2 };
        return [...activeHabits].sort((a, b) => 
          frequencyOrder[a.frequency] - frequencyOrder[b.frequency]
        );
      
      case 'status':
        return [...activeHabits].sort((a, b) => {
          const aCompleted = completions.some(c => c.habitId === a.id && c.date === today);
          const bCompleted = completions.some(c => c.habitId === b.id && c.date === today);
          return (aCompleted ? 1 : 0) - (bCompleted ? 1 : 0);
        });
      
      default:
        return activeHabits;
    }
  }, [habits, sortBy, completions, today]);

  const handleSave = (habitData: Omit<Habit, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (editingHabit) {
      updateHabit(editingHabit.id, habitData);
      setEditingHabit(null);
    } else {
      addHabit(habitData);
    }
  };

  const handleEdit = (habit: Habit) => {
    setEditingHabit(habit);
    setCreateDialogOpen(true);
  };

  const handleDelete = (habitId: string) => {
    setDeletingHabitId(habitId);
  };

  const confirmDelete = () => {
    if (deletingHabitId) {
      deleteHabit(deletingHabitId);
      setDeletingHabitId(null);
    }
  };

  const handleCloseDialog = () => {
    setCreateDialogOpen(false);
    setEditingHabit(null);
  };

  return (
    <div className="pb-6">
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2 flex-1">
          <ArrowUpDown className="w-5 h-5 text-muted-foreground" />
          <Select value={sortBy} onValueChange={(value: SortBy) => setSortBy(value)}>
            <SelectTrigger className="w-40 bg-input-background border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nom</SelectItem>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="frequency">Fréquence</SelectItem>
              <SelectItem value="status">Statut</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={() => setCreateDialogOpen(true)}
          className="bg-primary hover:bg-primary/90 gap-2"
        >
          <Plus className="w-5 h-5" />
          AJOUTER
        </Button>
      </div>

      {sortedHabits.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Plus className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2">Aucune habitude</h3>
          <p className="text-muted-foreground mb-6">
            Créez votre première habitude pour commencer votre transformation !
          </p>
          <Button
            onClick={() => setCreateDialogOpen(true)}
            className="bg-primary hover:bg-primary/90"
          >
            CRÉER UNE HABITUDE
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              date={today}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <CreateHabitDialog
        open={createDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSave}
        editHabit={editingHabit}
      />

      <AlertDialog open={!!deletingHabitId} onOpenChange={() => setDeletingHabitId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cette habitude ? Cette action est irréversible et supprimera également tout l'historique associé.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
