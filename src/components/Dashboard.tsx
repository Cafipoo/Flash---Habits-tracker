import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { HabitList } from './HabitList';
import { Statistics } from './Statistics';
import { Profile } from './Profile';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { ListTodo, BarChart3, UserCircle, Zap, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ViewPeriod } from '../lib/types';

export const Dashboard: React.FC = () => {
  const { user, viewPeriod, setViewPeriod } = useApp();
  const [activeTab, setActiveTab] = useState('habits');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-6 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" 
            style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 35px, white 35px, white 40px)',
            }}
          />
        </div>
        
        <div className="relative z-10 max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl text-white tracking-wider">FLASH</h1>
                <p className="text-sm text-white/80">Bonjour, {user?.name}</p>
              </div>
            </div>
          </div>

          {/* View Period Selector */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-2">
            <Calendar className="w-4 h-4 text-white ml-2" />
            <Select 
              value={viewPeriod} 
              onValueChange={(value: ViewPeriod) => setViewPeriod(value)}
            >
              <SelectTrigger className="border-0 bg-transparent text-white flex-1 focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Vue Journalière</SelectItem>
                <SelectItem value="week">Vue Hebdomadaire</SelectItem>
                <SelectItem value="month">Vue Mensuelle</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-card border-2 border-primary/20 p-1">
            <TabsTrigger 
              value="habits" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <ListTodo className="w-4 h-4 mr-2" />
              Habitudes
            </TabsTrigger>
            <TabsTrigger 
              value="stats"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Stats
            </TabsTrigger>
            <TabsTrigger 
              value="profile"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <UserCircle className="w-4 h-4 mr-2" />
              Profil
            </TabsTrigger>
          </TabsList>

          <TabsContent value="habits" className="mt-0">
            <HabitList />
          </TabsContent>

          <TabsContent value="stats" className="mt-0">
            <Statistics />
          </TabsContent>

          <TabsContent value="profile" className="mt-0">
            <Profile />
          </TabsContent>
        </Tabs>
      </div>

      {/* Speed Lines Effect (decorative) */}
      <div className="fixed bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
    </div>
  );
};
