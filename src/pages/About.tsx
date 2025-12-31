import { ArrowRight, Zap, CheckCircle, Heart, Users, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { TestimonialSection } from '@/components/TestimonialSection';
import { SocialMediaSection } from '@/components/SocialMediaSection';
import { useSettings } from '@/hooks/useSettings'; // Import useSettings
import { hexToHsl } from '@/lib/colorUtils'; // Import hexToHsl

export default function About() {
  const { data: settings, isLoading, isError } = useSettings(); // Fetch settings

  const shopName = settings?.shop_name || "Tayba Market";
  const primaryColorHsl = settings?.primary_color ? hexToHsl(settings.primary_color) : '222.2 47.4% 11.2%'; // Fallback to a dark HSL

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="font-display text-2xl mb-2">Erreur de chargement</h1>
          <p className="text-muted-foreground mb-6">
            Impossible de charger les paramètres de la boutique.
          </p>
          <Button onClick={() => window.location.reload()}>
            Recharger la page
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div 
        className="absolute inset-0 opacity-[0.2]" // Increased opacity
        style={{
          backgroundImage: `linear-gradient(hsl(${primaryColorHsl} / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(${primaryColorHsl} / 0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden gradient-hero">
        <div className="absolute inset-0 gradient-glow opacity-30" />
        {/* Removed redundant grid background from here */}
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 animate-fade-in">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Notre Essence, Votre Éclat</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-tight mb-4 animate-slide-up">
            Bien plus que des <span className="text-gradient">produits de qualité</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Tayba Market est votre destination pour une sélection variée de produits alimentaires, cosmétiques et bien d'autres, avec une spécialité de produits venant d'Allemagne. Nous nous engageons à vous offrir le meilleur.
          </p>
        </div>
      </section>


      {/* Section: Notre Mission */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <img 
                src="/image.png" 
                alt="Produits de beauté disposés avec élégance" 
                className="rounded-xl shadow-elevated w-full h-auto object-cover"
              />
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <h2 className="font-display text-4xl md:text-5xl mb-4">Notre <span className="text-gradient">Mission</span></h2>
              <p className="text-muted-foreground text-lg mb-6">
                Chez {shopName}, notre mission est de vous offrir des produits de qualité supérieure. Nous nous engageons à sélectionner rigoureusement des articles, principalement d'Allemagne, pour satisfaire vos besoins en produits alimentaires, cosmétiques et divers. Notre objectif est de vous apporter satisfaction et bien-être au quotidien.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Heart className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <span>
                    <strong className="text-foreground">Qualité garantie :</strong> Chaque article est sélectionné avec soin, en privilégiant l'origine allemande pour l'excellence et la fiabilité.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <span>
                    <strong className="text-foreground">Variété et satisfaction :</strong> Nous vous offrons une large gamme de produits pour répondre à tous vos besoins, avec la garantie d'une expérience d'achat agréable.
                  </span>
                </li>
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* Section: Qualité & Authenticité */}
      <section className="py-16 md:py-24" style={{ backgroundColor: `hsl(${primaryColorHsl} / 0.3)` }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection delay={200} className="order-last md:order-first">
              <h2 className="font-display text-4xl md:text-5xl mb-4"><span className="text-gradient">Qualité</span> & <span className="text-gradient">Authenticité</span></h2>
              <p className="text-muted-foreground text-lg mb-6">
                L'authenticité et la qualité sont nos priorités. Chez {shopName}, chaque produit est choisi avec soin pour sa provenance et son excellence, notamment pour nos articles importés d'Allemagne. Nous nous engageons à vous offrir le meilleur pour votre quotidien.
              </p>
              <Link to="/products">
                <Button variant="outline" className="group">
                  Découvrir la collection
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </AnimatedSection>
            <AnimatedSection className="order-first md:order-last">
              <img 
                src="/klity.png" 
                alt="Flacons de produits de beauté disposés avec élégance" 
                className="rounded-xl shadow-elevated w-full h-auto object-cover"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Section: Notre Engagement */}
      <section className="py-16 md:py-24 text-center">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <Users className="w-12 h-12 mx-auto text-primary mb-4" />
            <h2 className="font-display text-4xl md:text-5xl mb-4">Notre <span className="text-gradient">Engagement Communautaire</span></h2>
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
              {shopName} est votre partenaire pour des produits du quotidien de qualité. Nous sommes dédiés à offrir un service client exceptionnel et à construire un espace où chacun peut trouver les produits alimentaires, cosmétiques et divers adaptés à ses besoins. Votre satisfaction est notre priorité.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact">
                  <Button size="lg" className="min-w-[220px]">
                    Contactez notre équipe
                  </Button>
                </Link>
                <p className="text-muted-foreground">ou suivez-nous sur les réseaux !</p>
              </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Section: Témoignages */}
      <TestimonialSection />

      {/* Section: Réseaux Sociaux */}
      <SocialMediaSection />

    </div>
  );
}
