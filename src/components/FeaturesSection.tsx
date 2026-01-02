// src/components/FeaturesSection.tsx
import { Gem, ShieldCheck, Sparkles } from 'lucide-react';
import { AnimatedSection } from './ui/AnimatedSection';

const features = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-primary" />,
    title: 'Produits 100% Biologiques',
    description: 'Notre sélection rigoureuse de produits certifiés biologiques, sans pesticides ni OGM, pour une alimentation saine et respectueuse de l\'environnement.',
  },
  {
    icon: <Gem className="w-10 h-10 text-primary" />,
    title: 'Fraîcheur Garantie',
    description: 'Nous collaborons directement avec des producteurs locaux pour vous garantir des produits d\'une fraîcheur incomparable, livrés directement chez vous.',
  },
  {
    icon: <Sparkles className="w-10 h-10 text-primary" />,
    title: 'Saveurs Authentiques',
    description: 'Redécouvrez le vrai goût des aliments. Nos produits préservent toutes leurs saveurs naturelles pour des repas équilibrés et délicieux.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {features.map((feature, index) => (
            <AnimatedSection key={feature.title} delay={index * 200}>
              <div className="p-6">
                <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-display text-2xl mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
