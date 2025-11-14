import React from 'react';
import { Button } from './ui/button';
import { Zap, Target, Flame, Trophy, TrendingUp, BarChart3, Bell, Smartphone, CheckCircle, ArrowRight, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-primary/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center pulse-glow">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl tracking-wider">FLASH</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('features')} className="hover:text-primary transition-colors">
                Fonctionnalités
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="hover:text-primary transition-colors">
                Comment ça marche
              </button>
              <button onClick={() => scrollToSection('benefits')} className="hover:text-primary transition-colors">
                Avantages
              </button>
              <Button onClick={onGetStarted} className="bg-primary hover:bg-primary/90">
                COMMENCER
              </Button>
            </div>

            <Button onClick={onGetStarted} className="md:hidden bg-primary hover:bg-primary/90">
              COMMENCER
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" 
            style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 35px, #DC0000 35px, #DC0000 40px)',
            }}
          />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-6">
                <Zap className="w-4 h-4 text-secondary" />
                <span className="text-sm">Développez vos habitudes à vitesse grand V</span>
              </div>

              <h1 className="text-6xl lg:text-7xl mb-6 tracking-wider leading-tight">
                TRANSFORMEZ VOS <span className="text-primary">HABITUDES</span> EN <span className="text-secondary">SUCCÈS</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Flash est l'application ultime pour suivre et développer vos habitudes. 
                Atteignez vos objectifs avec la puissance et la vitesse d'un champion.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={onGetStarted}
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 gap-2 text-lg px-8"
                >
                  DÉMARRER MAINTENANT
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button 
                  onClick={() => scrollToSection('how-it-works')}
                  size="lg" 
                  variant="outline" 
                  className="border-primary/30 text-lg px-8"
                >
                  EN SAVOIR PLUS
                </Button>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl mb-1 text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Utilisateurs actifs</div>
                </div>
                <div>
                  <div className="text-3xl mb-1 text-secondary">500K+</div>
                  <div className="text-sm text-muted-foreground">Habitudes suivies</div>
                </div>
                <div>
                  <div className="text-3xl mb-1 text-primary">95%</div>
                  <div className="text-sm text-muted-foreground">Taux de réussite</div>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative z-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-8 border-2 border-primary/30 shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1614020661483-d2bb855eee1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBwaG9uZSUyMHNjcmVlbnxlbnwxfHx8fDE3NjEyMDc3MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Flash App Interface"
                  className="w-full h-auto rounded-2xl shadow-xl"
                />
              </div>
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="hidden lg:block py-20 px-6 bg-card/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-4 tracking-wider">FONCTIONNALITÉS TURBO</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Des outils puissants pour transformer vos habitudes en véritables succès
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card border-2 border-primary/20 rounded-xl p-6 hover:border-primary/40 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl mb-3">Suivi Intelligent</h3>
              <p className="text-muted-foreground">
                Créez et suivez vos habitudes quotidiennes, hebdomadaires ou mensuelles avec une interface intuitive.
              </p>
            </div>

            <div className="bg-card border-2 border-secondary/20 rounded-xl p-6 hover:border-secondary/40 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Flame className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl mb-3">Streaks Motivants</h3>
              <p className="text-muted-foreground">
                Maintenez votre élan avec des séries de réussite qui vous poussent à continuer jour après jour.
              </p>
            </div>

            <div className="bg-card border-2 border-primary/20 rounded-xl p-6 hover:border-primary/40 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl mb-3">Statistiques Détaillées</h3>
              <p className="text-muted-foreground">
                Visualisez vos progrès avec des graphiques et des statistiques complètes de vos performances.
              </p>
            </div>

            <div className="bg-card border-2 border-secondary/20 rounded-xl p-6 hover:border-secondary/40 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Bell className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl mb-3">Rappels Personnalisés</h3>
              <p className="text-muted-foreground">
                Ne manquez jamais une habitude avec des notifications intelligentes et personnalisables.
              </p>
            </div>

            <div className="bg-card border-2 border-primary/20 rounded-xl p-6 hover:border-primary/40 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl mb-3">Objectifs & Récompenses</h3>
              <p className="text-muted-foreground">
                Célébrez vos victoires et atteignez vos objectifs avec un système de récompenses motivant.
              </p>
            </div>

            <div className="bg-card border-2 border-secondary/20 rounded-xl p-6 hover:border-secondary/40 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Smartphone className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl mb-3">Mobile First</h3>
              <p className="text-muted-foreground">
                Une expérience optimisée pour mobile, accessible partout, tout le temps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-4 tracking-wider">COMMENT ÇA MARCHE</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trois étapes simples pour démarrer votre transformation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="relative inline-flex mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center pulse-glow">
                  <span className="text-3xl">1</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-black" />
                </div>
              </div>
              <h3 className="text-2xl mb-3">Créez vos habitudes</h3>
              <p className="text-muted-foreground">
                Définissez les habitudes que vous souhaitez développer avec des objectifs clairs et personnalisés.
              </p>
            </div>

            <div className="text-center">
              <div className="relative inline-flex mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center pulse-glow">
                  <span className="text-3xl">2</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-black" />
                </div>
              </div>
              <h3 className="text-2xl mb-3">Suivez vos progrès</h3>
              <p className="text-muted-foreground">
                Marquez vos habitudes comme complétées chaque jour et suivez votre évolution en temps réel.
              </p>
            </div>

            <div className="text-center">
              <div className="relative inline-flex mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center pulse-glow">
                  <span className="text-3xl">3</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-black" />
                </div>
              </div>
              <h3 className="text-2xl mb-3">Atteignez vos objectifs</h3>
              <p className="text-muted-foreground">
                Analysez vos statistiques, maintenez vos streaks et célébrez vos succès quotidiens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="hidden lg:block py-20 px-6 bg-card/50">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1604233098531-90b71b1b17a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBtb3RpdmF0aW9uJTIwdHJhaW5pbmd8ZW58MXx8fHwxNzYxMjA3NzExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Success and Achievement"
                className="w-full h-auto rounded-3xl shadow-2xl border-2 border-primary/30"
              />
            </div>

            <div>
              <h2 className="text-5xl mb-6 tracking-wider">POURQUOI CHOISIR <span className="text-primary">FLASH</span> ?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Plus qu'un simple tracker, Flash est votre partenaire de transformation personnelle.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg mb-2">Progression Mesurable</h4>
                    <p className="text-muted-foreground">
                      Visualisez votre évolution avec des graphiques détaillés et des statistiques précises.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0">
                    <Star className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="text-lg mb-2">Interface Intuitive</h4>
                    <p className="text-muted-foreground">
                      Design moderne et ergonomique inspiré de la vitesse et de la performance.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg mb-2">Motivation Constante</h4>
                    <p className="text-muted-foreground">
                      Les streaks et récompenses vous maintiennent motivé à long terme.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0">
                    <Trophy className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="text-lg mb-2">Résultats Prouvés</h4>
                    <p className="text-muted-foreground">
                      95% de nos utilisateurs atteignent leurs objectifs dans les 3 premiers mois.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full" 
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, white 35px, white 40px)',
                }}
              />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-5xl md:text-6xl mb-6 tracking-wider">
                PRÊT À PASSER À LA VITESSE SUPÉRIEURE ?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Rejoignez des milliers d'utilisateurs qui transforment leurs vies avec Flash. 
                Commencez votre transformation dès aujourd'hui.
              </p>
              <Button 
                onClick={onGetStarted}
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 gap-2 text-lg px-12"
              >
                DÉMARRER GRATUITEMENT
                <Zap className="w-5 h-5" />
              </Button>
              <p className="mt-4 text-sm text-white/70">
                Aucune carte de crédit requise • Configuration en 2 minutes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-primary/20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl tracking-wider">FLASH</span>
            </div>

            <div className="flex gap-8 text-sm text-muted-foreground">
              <button className="hover:text-primary transition-colors">Confidentialité</button>
              <button className="hover:text-primary transition-colors">Conditions</button>
              <button className="hover:text-primary transition-colors">Support</button>
            </div>

            <p className="text-sm text-muted-foreground">
              © 2025 Flash. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
