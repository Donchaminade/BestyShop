import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Loader2, AlertCircle } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import { TikTokCard } from './TikTokCard'; // Import the new component

export function TestimonialSection() {
  const { data: settings, isLoading: settingsLoading, isError: settingsError } = useSettings();

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  // The array now only needs the URLs
  const tiktokTestimonials = [
    { tiktokUrl: 'https://vm.tiktok.com/ZMD6B6Arb/' },
    { tiktokUrl: 'https://vm.tiktok.com/ZMD6Bas66/' },
    { tiktokUrl: 'https://vm.tiktok.com/ZMD6kcMR6/' },
    { tiktokUrl: 'https://vm.tiktok.com/ZMD6BJvg4/' },
    { tiktokUrl: 'https://vm.tiktok.com/ZMD6knKDx/' },
  ];

  if (settingsLoading) {
    return (
      <section className="py-16 md:py-24 bg-background text-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
        <p className="text-sm text-muted-foreground mt-2">Chargement des témoignages...</p>
      </section>
    );
  }

  if (settingsError) {
    return (
      <section className="py-16 md:py-24 bg-background text-center text-destructive">
        <AlertCircle className="w-6 h-6 mx-auto" />
        <p className="text-sm mt-2">Erreur de chargement des témoignages.</p>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h2 className="font-display text-4xl md:text-5xl text-center mb-12">
            Quelques videoa tiktok de <span className="text-gradient">NutriPack</span>
          </h2>

          <Carousel
            plugins={[plugin.current]}
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {tiktokTestimonials.map((video, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/3 lg:basis-1/4">
                  <TikTokCard tiktokUrl={video.tiktokUrl} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </AnimatedSection>
      </div>
    </section>
  );
}
