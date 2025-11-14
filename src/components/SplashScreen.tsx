import React, { useEffect, useMemo } from 'react';

type SplashVariant = 'slide' | 'fade' | 'explode';

interface SplashScreenProps {
  onFinish: () => void;
  durationMs?: number;
  variant?: SplashVariant;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish, durationMs = 1600, variant = 'slide' }) => {
  const exitClass = useMemo(() => {
    switch (variant) {
      case 'fade':
        return 'splash-exit-fade';
      case 'explode':
        return 'splash-exit-explode';
      case 'slide':
      default:
        return 'splash-exit-slide';
    }
  }, [variant]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      onFinish();
    }, durationMs);
    return () => window.clearTimeout(timer);
  }, [durationMs, onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden">
      <div className={`splash-logo-wrapper ${exitClass}`} style={{ animationDuration: `${durationMs}ms` }}>
        {/* Logo: utilisez votre icône/nom de marque existant */}
        <div className="flex items-center gap-3">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl">
            {/* Éclair SVG net */}
            <svg width="56" height="56" viewBox="0 0 24 24" className="text-white" shapeRendering="crispEdges">
              <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" fill="currentColor" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <span className="text-6xl tracking-widest" style={{ textRendering: 'optimizeLegibility' }}>FLASH</span>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;


