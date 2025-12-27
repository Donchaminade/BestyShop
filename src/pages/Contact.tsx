import React from 'react';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Zap, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


// Helper component for animations
const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};


export default function Contact() {
  // Form state and submission logic can be enhanced with react-hook-form later if needed
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to handle form submission (e.g., via an API endpoint or mailto link)
    alert("Formulaire envoyé ! (simulation)");
  };

  return (
    <div className="min-h-screen bg-background relative">
      <div 
        className="absolute inset-0 opacity-[0.2]" // Increased opacity
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Hero Section (Unchanged as requested) */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden gradient-hero">
        <div className="absolute inset-0 gradient-glow opacity-30" />
        {/* Removed redundant grid background from here */}
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Restons Connectés</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-tight mb-4">
            Contactez <span className="text-gradient">BestyShop</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Avez-vous des questions, des commentaires ou besoin d'assistance ? Notre équipe est là pour vous aider.
          </p>
        </div>
      </section>
      
      {/* Contact Info Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection>
              <Card className="text-center p-6 h-full">
                <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-display text-2xl mb-2">Par E-mail</h3>
                <p className="text-muted-foreground mb-4">La meilleure façon de nous joindre pour toute demande.</p>
                <Button asChild variant="outline">
                  <a href="mailto:contact@bestyshop.com">contact@bestyshop.com</a>
                </Button>
              </Card>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <Card className="text-center p-6 h-full">
                <Phone className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-display text-2xl mb-2">Par Téléphone</h3>
                <p className="text-muted-foreground mb-4">Pour les demandes urgentes, appelez-nous.</p>
                <Button asChild variant="outline">
                  <a href="tel:+22899181626">+228 99 18 16 26</a>
                </Button>
              </Card>
            </AnimatedSection>
            <AnimatedSection delay={400}>
              <Card className="text-center p-6 h-full">
                <MapPin className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-display text-2xl mb-2">Service Client</h3>
                <p className="text-muted-foreground mb-4">Disponibles en ligne, pour une beauté accessible partout.</p>
                <p className="font-semibold text-foreground">Retrouvez-nous sur les réseaux !</p>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Form & FAQ Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-start">
          <AnimatedSection>
            <h2 className="font-display text-4xl md:text-5xl mb-6">Envoyez-nous un message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input type="text" placeholder="Votre nom complet" required />
              <Input type="email" placeholder="Votre adresse e-mail" required />
              <Textarea placeholder="Votre message..." required rows={6} />
              <Button type="submit" size="lg" className="w-full">
                Envoyer le Message
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <h2 className="font-display text-4xl md:text-5xl mb-6">Questions Fréquentes</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Quels sont les délais de livraison ?</AccordionTrigger>
                <AccordionContent>
                  Les délais de livraison varient de 2 à 5 jours ouvrables pour les commandes nationales. Vous recevrez un numéro de suivi dès l'expédition.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Puis-je retourner un produit ?</AccordionTrigger>
                <AccordionContent>
                  Oui, vous avez 14 jours pour retourner un article dans son état d'origine. Veuillez consulter notre politique de retour pour plus de détails.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Proposez-vous des conseils personnalisés ?</AccordionTrigger>
                <AccordionContent>
                  Oui, nos experts sont disponibles pour vous offrir des conseils personnalisés sur les produits et les routines de beauté adaptées à vos besoins.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Comment puis-je suivre ma commande ?</AccordionTrigger>
                <AccordionContent>
                  Une fois votre commande expédiée, vous recevrez un e-mail contenant un lien de suivi pour suivre votre colis en temps réel.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
