import React from 'react';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Zap, Phone, Mail, MapPin, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSettings } from '@/hooks/useSettings'; // Import useSettings


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
  const { data: settings, isLoading, isError } = useSettings(); // Fetch settings

  // Fallback values if settings are not loaded or error
  const shopName = settings?.shop_name || "NutriPack";
  const whatsappNumber = settings?.whatsapp_name || '+22893004356'; // Keeping WhatsApp number
  const emailAddress = 'contactnutripack@gmail.com'; // New email
  const locationText = 'Votre marché de produits bio en ligne'; // New location
  const openingHoursText = 'Disponible en ligne 24h/24, 7j/7'; // New opening hours


  // Form state and submission logic can be enhanced with react-hook-form later if needed
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to handle form submission (e.g., via an API endpoint or mailto link)
    alert("Formulaire envoyé ! (simulation)");
  };

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
            <span className="text-sm font-medium text-primary">Ensemble pour une Alimentation Saine</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-tight mb-4">
            Une Question ? Contactez <span className="text-gradient">{shopName}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Avez-vous des questions sur nos produits, vos commandes ou besoin de conseils personnalisés ? Notre équipe dédiée est là pour vous répondre.
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
                <p className="text-muted-foreground mb-4">Privilégiez l'e-mail pour vos questions détaillées sur nos produits ou commandes.</p>
                <Button asChild variant="outline">
                  <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
                </Button>
              </Card>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <Card className="text-center p-6 h-full">
                <Phone className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-display text-2xl mb-2">Par Téléphone / WhatsApp</h3>
                <p className="text-muted-foreground mb-4">Contactez-nous via WhatsApp pour une réponse rapide ou des questions urgentes.</p>
                <Button asChild variant="outline">
                  <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">{whatsappNumber}</a>
                </Button>
              </Card>
            </AnimatedSection>
            <AnimatedSection delay={400}>
              <Card className="text-center p-6 h-full">
                <MapPin className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-display text-2xl mb-2">Localisation & Horaires</h3>
                <p className="text-muted-foreground mb-4">{locationText}</p>
                <p className="font-semibold text-foreground">{openingHoursText}</p>
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
                <AccordionTrigger>D'où proviennent vos produits biologiques ?</AccordionTrigger>
                <AccordionContent>
                  Nos produits proviennent directement de producteurs locaux et de fermes certifiées biologiques, garantissant une traçabilité complète et le respect des normes environnementales.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Comment garantissez-vous la fraîcheur des produits ?</AccordionTrigger>
                <AccordionContent>
                  Nous travaillons en circuit court et optimisons nos livraisons pour que les produits arrivent chez vous dans les meilleures conditions de fraîcheur. Nos emballages sont également conçus pour préserver la qualité.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Puis-je commander des paniers personnalisés ?</AccordionTrigger>
                <AccordionContent>
                  Oui, nous proposons des options de paniers personnalisables. Contactez notre service client pour discuter de vos préférences et nous créerons un panier sur mesure pour vous.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Proposez-vous la livraison à domicile ?</AccordionTrigger>
                <AccordionContent>
                  Oui, nous assurons une livraison rapide et efficace à domicile dans plusieurs régions. Vérifiez notre section 'Livraison' pour plus de détails sur les zones desservies et les tarifs.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
