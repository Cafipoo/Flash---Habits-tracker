import React, { useEffect, useState } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { LandingPage } from './components/LandingPage';
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';
import { Dashboard } from './components/Dashboard';
import { Toaster } from './components/ui/sonner';
import SplashScreen from './components/SplashScreen';

const AppContent: React.FC = () => {
  const { user } = useApp();
  const [showSignup, setShowSignup] = useState(false);
  const [showApp, setShowApp] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Auto-hide splash if user returns to root. Can be controlled as needed.
    const timer = window.setTimeout(() => setShowSplash(false), 1600);
    return () => window.clearTimeout(timer);
  }, []);

  // Splash screen first
  if (showSplash) {
    return <SplashScreen variant="explode" durationMs={1400} onFinish={() => setShowSplash(false)} />;
  }

  // Show landing page if not in app mode and no user
  if (!showApp && !user) {
    return <LandingPage onGetStarted={() => setShowApp(true)} />;
  }

  // Show auth forms if in app mode but no user
  if (!user) {
    return showSignup ? (
      <SignupForm onSwitchToLogin={() => setShowSignup(false)} />
    ) : (
      <LoginForm onSwitchToSignup={() => setShowSignup(true)} />
    );
  }

  return <Dashboard />;
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
      <Toaster position="top-center" />
    </AppProvider>
  );
}
