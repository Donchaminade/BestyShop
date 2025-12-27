// src/components/LocalSeoSection.tsx
import { MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { AnimatedSection } from './ui/AnimatedSection';

export function LocalSeoSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="bg-card border border-border rounded-xl p-8 md:p-12 text-center">
            <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl mb-4">
              Votre Destination Beauté <span className="text-gradient">Incontournable</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
              Chez BestyShop, nous sommes passionnés par la beauté et le bien-être. Nous vous offrons une sélection raffinée de produits cosmétiques, de soins et de maquillages, accessibles où que vous soyez. Découvrez l'expertise beauté à portée de clic !
            </p>
            <Link to="/contact">
              <Button size="lg">
                <Sparkles className="w-5 h-5 mr-2" />
                Découvrir Nos Conseils
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
