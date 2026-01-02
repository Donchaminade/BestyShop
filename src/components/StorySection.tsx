// src/components/StorySection.tsx
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react'; // Added Loader2, AlertCircle
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { AnimatedSection } from './ui/AnimatedSection';
import { useSettings } from '@/hooks/useSettings'; // Import useSettings

export function StorySection() {
  const { data: settings, isLoading: settingsLoading, isError: settingsError } = useSettings(); // Fetch settings

  const shopName = settings?.shop_name || "BestyShop";

  if (settingsLoading) {
    return (
      <section className="py-16 md:py-24 bg-secondary/30 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </section>
    );
  }

  if (settingsError) {
    return (
      <section className="py-16 md:py-24 bg-secondary/30 flex items-center justify-center text-destructive">
        <AlertCircle className="w-6 h-6 mr-2" />
        <p>Erreur de chargement des informations de la boutique.</p>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <img 
              src="https://placehold.co/800x800/84cc16/ffffff?text=NATURAL%20FOOD" 
              alt="Produits alimentaires biologiques et naturels" 
              className="rounded-xl shadow-elevated w-full h-auto object-cover aspect-square"
            />
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <h2 className="font-display text-4xl md:text-5xl mb-4">
              Plus que de l'alimentation, <span className="text-gradient">une Promesse</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Chez {shopName}, nous sommes passionnés par une alimentation saine et respectueuse. Chaque produit que nous sélectionnons est une invitation à redécouvrir le goût authentique de la nature, pour votre bien-être et celui de la planète.
            </p>
            <p className="text-muted-foreground text-lg mb-8">
              Notre promesse est de vous offrir une sélection rigoureuse de produits 100% biologiques, d'origine contrôlée, pour une cuisine saine, gourmande et pleine de vitalité.
            </p>
            <Link to="/about">
              <Button variant="outline" className="group">
                Notre Engagement
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
