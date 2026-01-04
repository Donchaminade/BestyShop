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

  const shopName = settings?.shop_name || "NutriPack";
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
            <span className="text-sm font-medium text-primary">Notre Philosophie : Votre Bien-être Naturel</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-tight mb-4 animate-slide-up">
            L'Essence du Naturel pour <span className="text-gradient">votre Alimentation</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            NutriPack est votre source de confiance pour une sélection variée de produits alimentaires 100% biologiques et naturels. Nous nous engageons à vous offrir le meilleur de la terre.
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
                alt="Produits bio frais et naturels" 
                className="rounded-xl shadow-elevated w-full h-auto object-cover"
              />
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <h2 className="font-display text-4xl md:text-5xl mb-4">Notre <span className="text-gradient">Mission</span></h2>
              <p className="text-muted-foreground text-lg mb-6">
                Chez {shopName}, notre mission est de vous offrir le meilleur de la nature. Nous nous engageons à sélectionner rigoureusement des produits alimentaires 100% biologiques, issus de circuits courts et respectueux de l'environnement, pour une alimentation saine et éthique.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Heart className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <span>
                    <strong className="text-foreground">Origine contrôlée :</strong> Chaque produit est tracé, certifié biologique et cultivé avec passion par des producteurs engagés.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <span>
                    <strong className="text-foreground">Santé et vitalité :</strong> Nous vous proposons une alimentation qui nourrit votre corps et votre esprit, pour un bien-être au quotidien et une vitalité retrouvée.
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
                L'authenticité et la traçabilité sont nos maîtres mots. Chez {shopName}, chaque produit est sélectionné avec le plus grand soin, directement auprès de producteurs respectueux de l'agriculture biologique. Nous nous engageons à vous offrir des saveurs pures et un savoir-faire traditionnel.
              </p>
              <Link to="/products">
                <Button variant="outline" className="group">
                  Découvrir nos produits bio
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </AnimatedSection>
            <AnimatedSection className="order-first md:order-last">
              <img 
                src="/quality.png" 
                alt="Garantie de qualité des produits bio" 
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
            <h2 className="font-display text-4xl md:text-5xl mb-4">Notre Engagement <span className="text-gradient">pour une Alimentation Durable</span></h2>
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-8">
              {shopName} est votre allié pour une alimentation saine et durable. Nous nous engageons à vous offrir un service client de proximité et à construire une communauté où chacun peut accéder à des produits alimentaires biologiques et naturels qui respectent sa santé et l'environnement. Votre bien-être est notre priorité.
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
