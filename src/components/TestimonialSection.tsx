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
import { Play } from 'lucide-react'; // Ajout de l'icône Play

// Nouvelle structure pour les témoignages vidéo TikTok
const tiktokTestimonials = [
  {
    tiktokUrl: 'https://www.tiktok.com/@bestyshop/video/7315573420803527969', // Exemple d'URL TikTok
    thumbnailUrl: 'https://placehold.co/300x533/ff69b4/ffffff?text=TikTok+Beauté+1', // Placeholder pour la miniature
    title: 'Mon produit BestyShop préféré !',
  },
  {
    tiktokUrl: 'https://www.tiktok.com/@bestyshop/video/7315573420803527970',
    thumbnailUrl: 'https://placehold.co/300x533/ff69b4/ffffff?text=TikTok+Beauté+2',
    title: 'Routine beauté avec BestyShop',
  },
  {
    tiktokUrl: 'https://www.tiktok.com/@bestyshop/video/7315573420803527971',
    thumbnailUrl: 'https://placehold.co/300x533/ff69b4/ffffff?text=TikTok+Beauté+3',
    title: 'Déballage BestyShop',
  },
  {
    tiktokUrl: 'https://www.tiktok.com/@bestyshop/video/7315573420803527972',
    thumbnailUrl: 'https://placehold.co/300x533/ff69b4/ffffff?text=TikTok+Beauté+4',
    title: 'Les indispensables BestyShop',
  },
  {
    tiktokUrl: 'https://www.tiktok.com/@bestyshop/video/7315573420803527973',
    thumbnailUrl: 'https://placehold.co/300x533/ff69b4/ffffff?text=TikTok+Beauté+5',
    title: 'Avis sur les produits BestyShop',
  },
];

export function TestimonialSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h2 className="font-display text-4xl md:text-5xl text-center mb-12">
            Ils nous <span className="text-gradient">aiment sur TikTok</span>
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
