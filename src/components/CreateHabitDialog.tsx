import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Habit } from '../lib/types';
import { Target, Flame, Zap, Trophy, Heart, BookOpen } from 'lucide-react';

interface CreateHabitDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (habit: Omit<Habit, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => void;
  editHabit?: Habit | null;
}

const COLORS = [
  { name: 'Rouge Flash', value: '#DC0000' },
  { name: 'Jaune Éclair', value: '#FFC500' },
  { name: 'Orange Feu', value: '#FF4500' },
  { name: 'Violet Nitro', value: '#8B00FF' },
  { name: 'Bleu Turbo', value: '#0080FF' },
  { name: 'Vert Boost', value: '#00FF80' },
];

const ICONS = [
  { name: 'Cible', value: 'target', icon: Target },
  { name: 'Flamme', value: 'flame', icon: Flame },
  { name: 'Éclair', value: 'zap', icon: Zap },
  { name: 'Trophée', value: 'trophy', icon: Trophy },
  { name: 'Cœur', value: 'heart', icon: Heart },
  { name: 'Livre', value: 'book', icon: BookOpen },
];

export const CreateHabitDialog: React.FC<CreateHabitDialogProps> = ({
  open,
  onClose,
  onSave,
  editHabit,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [color, setColor] = useState(COLORS[0].value);
  const [icon, setIcon] = useState(ICONS[0].value);

  useEffect(() => {
    if (editHabit) {
      setName(editHabit.name);
      setDescription(editHabit.description || '');
      setFrequency(editHabit.frequency);
      setColor(editHabit.color);
      setIcon(editHabit.icon);
    } else {
      resetForm();
    }
  }, [editHabit, open]);

  const resetForm = () => {
    setName('');
    setDescription('');
    setFrequency('daily');
    setColor(COLORS[0].value);
    setIcon(ICONS[0].value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      description,
      frequency,
      color,
      icon,
      archived: false,
    });
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-card border-2 border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {editHabit ? 'MODIFIER L\'HABITUDE' : 'NOUVELLE HABITUDE'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="name">Nom de l'habitude *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Faire du sport"
              required
              className="bg-input-background border-border mt-1"
            />
          </div>

          <div>
            <Label htmlFor="description">Description (optionnel)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez votre habitude..."
              className="bg-input-background border-border mt-1 resize-none"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="frequency">Fréquence *</Label>
            <Select value={frequency} onValueChange={(value: any) => setFrequency(value)}>
              <SelectTrigger className="bg-input-background border-border mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Quotidien</SelectItem>
                <SelectItem value="weekly">Hebdomadaire</SelectItem>
                <SelectItem value="monthly">Mensuel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Icône *</Label>
            <div className="grid grid-cols-6 gap-2 mt-2">
              {ICONS.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setIcon(item.value)}
                    className={`w-full aspect-square rounded-lg flex items-center justify-center border-2 transition-all ${
                      icon === item.value
                        ? 'border-primary bg-primary/20'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <Label>Couleur *</Label>
            <div className="grid grid-cols-6 gap-2 mt-2">
              {COLORS.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setColor(item.value)}
                  className={`w-full aspect-square rounded-lg border-2 transition-all ${
                    color === item.value
                      ? 'border-white scale-110'
                      : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: item.value }}
                  title={item.name}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {editHabit ? 'METTRE À JOUR' : 'CRÉER'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
