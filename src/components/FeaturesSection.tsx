// src/components/FeaturesSection.tsx
import { Gem, ShieldCheck, Sparkles } from 'lucide-react';
import { AnimatedSection } from './ui/AnimatedSection';

const features = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-primary" />,
    title: 'Qualité Supérieure Garantie',
    description: 'Chaque produit est méticuleusement sélectionné pour sa pureté, son efficacité et son respect de votre peau. Votre satisfaction est notre priorité absolue.',
  },
  {
    icon: <Gem className="w-10 h-10 text-primary" />,
    title: 'Collections Exclusives & Tendances',
    description: 'Découvrez des marques de niche, des éditions limitées et les dernières innovations en matière de beauté. Soyez toujours à la pointe de la tendance.',
  },
  {
    icon: <Sparkles className="w-10 h-10 text-primary" />,
    title: 'Conseils Personnalisés',
    description: 'Nos experts sont à votre écoute pour vous guider vers les produits parfaits adaptés à vos besoins spécifiques et à votre type de peau.',
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
