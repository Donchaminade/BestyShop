import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Play, Loader2, AlertCircle } from 'lucide-react'; // Ajout de l'icône Play, Loader2, AlertCircle
import { useSettings } from '@/hooks/useSettings'; // Import useSettings

export function TestimonialSection() {
  const { data: settings, isLoading: settingsLoading, isError: settingsError } = useSettings(); // Fetch settings

  const shopName = settings?.shop_name || "NutriPack";

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const tiktokTestimonials = [
    {
      tiktokUrl: 'https://www.tiktok.com/@nutripack/video/placeholder1',
      thumbnailUrl: 'https://placehold.co/300x533/84cc16/ffffff?text=Recette%20Bio',
      title: `Mes paniers ${shopName} de la semaine !`,
    },
    {
      tiktokUrl: 'https://www.tiktok.com/@nutripack/video/placeholder2',
      thumbnailUrl: 'https://placehold.co/300x533/22c55e/ffffff?text=Alimentation%20Saine',
      title: `Une alimentation saine avec ${shopName}`,
    },
    {
      tiktokUrl: 'https://www.tiktok.com/@nutripack/video/placeholder3',
      thumbnailUrl: 'https://placehold.co/300x533/84cc16/ffffff?text=Déballage%20NutriPack',
      title: `Déballage de ma commande ${shopName}`,
    },
    {
      tiktokUrl: 'https://www.tiktok.com/@nutripack/video/placeholder4',
      thumbnailUrl: 'https://placehold.co/300x533/22c55e/ffffff?text=Indispensables%20Bio',
      title: `Les indispensables bio de ${shopName}`,
    },
    {
      tiktokUrl: 'https://www.tiktok.com/@nutripack/video/placeholder5',
      thumbnailUrl: 'https://placehold.co/300x533/84cc16/ffffff?text=Avis%20Produits',
      title: `Avis sur les produits ${shopName}`,
    },
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
            Ils partagent leur expérience <span className="text-gradient">NutriPack</span>
          </h2>

          <Carousel
            plugins={[plugin.current]}
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto" // Ajustement de la largeur pour les vidéos verticales
          >
            <CarouselContent className="-ml-4">
              {tiktokTestimonials.map((video, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/3 lg:basis-1/4"> {/* Ajustement des bases */}
                  <div className="p-1">
                    <Card className="h-full flex flex-col group">
                      <a href={video.tiktokUrl} target="_blank" rel="noopener noreferrer" className="relative block w-full aspect-[9/16] rounded-lg overflow-hidden"> {/* Ratio 9/16 pour TikTok */}
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                      </a>
                      <CardContent className="flex-grow flex flex-col justify-center items-center text-center p-4">
                        <p className="text-sm font-semibold mt-2">{video.title}</p>
                      </CardContent>
                    </Card>
                  </div>
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
