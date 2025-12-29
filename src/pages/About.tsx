import { ArrowRight, Zap, CheckCircle, Heart, Users, Loader2, AlertCircle } from 'lucide-react'; // Added Loader2, AlertCircle
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { TestimonialSection } from '@/components/TestimonialSection';
import { SocialMediaSection } from '@/components/SocialMediaSection';
import { useSettings } from '@/hooks/useSettings'; // Import useSettings

export default function About() {
  const { data: settings, isLoading: settingsLoading, isError: settingsError } = useSettings(); // Fetch settings

  const shopName = settings?.shop_name || "BestyShop";

  if (settingsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (settingsError) {
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
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
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
            Bien plus que des <span className="text-gradient">produits de beauté</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {shopName} est né d'une passion pour la beauté et le bien-être. Nous ne vendons pas seulement des produits, nous partageons une philosophie, des conseils et l'amour de prendre soin de soi.
          </p>
        </div>
      </section>


      {/* Section: Notre Mission */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <img 
                src="https://placehold.co/800x600/ff69b4/ffffff?text=BEAUTY+MISSION" 
                alt="Produits de beauté disposés avec élégance" 
                className="rounded-xl shadow-elevated w-full h-auto object-cover"
              />
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <h2 className="font-display text-4xl md:text-5xl mb-4">Notre <span className="text-gradient">Mission</span></h2>
              <p className="text-muted-foreground text-lg mb-6">
                Chez {shopName}, notre mission est de sublimer votre beauté naturelle. Nous croyons que chaque personne mérite de se sentir confiante et radieuse. C'est pourquoi nous nous engageons à offrir des produits de haute qualité qui respectent votre peau et révèlent votre éclat unique.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Heart className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <span>
                    <strong className="text-foreground">Pour vous, par des passionnés :</strong> Chaque article est sélectionné avec soin par nos experts, pour celles et ceux qui cultivent leur bien-être.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <span>
                    <strong className="text-foreground">Qualité irréprochable :</strong> Nous garantissons des produits dont la pureté et l'efficacité sont irréprochables, pour une expérience beauté en toute confiance.
                  </span>
                </li>
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* Section: Qualité & Authenticité */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection delay={200} className="order-last md:order-first">
              <h2 className="font-display text-4xl md:text-5xl mb-4"><span className="text-gradient">Qualité</span> & <span className="text-gradient">Authenticité</span></h2>
              <p className="text-muted-foreground text-lg mb-6">
                L'authenticité est notre maître-mot. Chaque produit {shopName} est une promesse d'excellence. Nous travaillons sans relâche pour vous proposer des cosmétiques et des soins qui respectent votre corps et l'environnement.
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
                src="https://placehold.co/800x600/ff69b4/ffffff?text=QUALITY+GUARANTEE" 
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
              {shopName}, c'est plus qu'une boutique, c'est une source d'inspiration. Nous sommes dédiés à offrir un service client exceptionnel et à construire un espace où chacun peut trouver les conseils et les produits adaptés à ses besoins. Votre épanouissement est notre plus belle réussite.
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
