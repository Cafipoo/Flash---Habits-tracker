import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { LogOut, User, Bell, Settings } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { getNotificationSettings, setNotificationSettings } from '../lib/storage';

export const Profile: React.FC = () => {
  const { user, logout } = useApp();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [notificationSettings, setNotificationSettingsState] = useState(getNotificationSettings());

  const handleSaveProfile = () => {
    // In a real app, this would update the user profile
    toast('Profil mis à jour avec succès', {
      description: 'Vos informations ont été sauvegardées.',
    });
  };

  const handleToggleNotifications = (enabled: boolean) => {
    const updated = { ...notificationSettings, enabled };
    setNotificationSettings(updated);
    setNotificationSettingsState(updated);
    toast(enabled ? 'Notifications activées' : 'Notifications désactivées');
  };

  const handleLogout = () => {
    logout();
    toast('Déconnexion réussie', {
      description: 'À bientôt !',
    });
  };

  if (!user) return null;

  return (
    <div className="pb-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/30 rounded-xl p-6 mb-6 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mb-4 pulse-glow">
          <User className="w-10 h-10 text-white" />
        </div>
        <h2 className="mb-1">{user.name}</h2>
        <p className="text-muted-foreground">{user.email}</p>
      </div>

      {/* Profile Form */}
      <div className="bg-card border-2 border-primary/20 rounded-xl p-6 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-5 h-5 text-primary" />
          <h3>INFORMATIONS DU PROFIL</h3>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-input-background border-border mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-input-background border-border mt-1"
            />
          </div>

          <Button
            onClick={handleSaveProfile}
            className="w-full bg-primary hover:bg-primary/90"
          >
            SAUVEGARDER
          </Button>
        </div>
      </div>

      {/* Notifications Settings */}
      <div className="bg-card border-2 border-primary/20 rounded-xl p-6 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-secondary" />
          <h3>NOTIFICATIONS</h3>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p>Rappels quotidiens</p>
            <p className="text-sm text-muted-foreground">
              Recevez des notifications pour vos habitudes
            </p>
          </div>
          <Switch
            checked={notificationSettings.enabled}
            onCheckedChange={handleToggleNotifications}
          />
        </div>

        {notificationSettings.enabled && (
          <div className="mt-4 pt-4 border-t border-border">
            <Label htmlFor="notification-time">Heure des rappels</Label>
            <Input
              id="notification-time"
              type="time"
              value={notificationSettings.time}
              onChange={(e) => {
                const updated = { ...notificationSettings, time: e.target.value };
                setNotificationSettings(updated);
                setNotificationSettingsState(updated);
              }}
              className="bg-input-background border-border mt-1"
            />
          </div>
        )}
      </div>

      {/* Account Info */}
      <div className="bg-card border-2 border-primary/20 rounded-xl p-6 mb-4">
        <h3 className="mb-3">À PROPOS</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Application: Flash Habit Tracker</p>
          <p>Version: 1.0.0</p>
          <p>Membre depuis: {new Date(user.createdAt).toLocaleDateString('fr-FR')}</p>
        </div>
      </div>

      {/* Logout Button */}
      <Button
        onClick={handleLogout}
        variant="destructive"
        className="w-full gap-2"
      >
        <LogOut className="w-5 h-5" />
        SE DÉCONNECTER
      </Button>
    </div>
  );
};
