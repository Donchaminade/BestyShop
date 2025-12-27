import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Flame, ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function PromoSection() {
  // Fetch all products to find all promos for the carousel
  const { data, isLoading } = useProducts({ enablePagination: false }); 
  const products = data?.data || [];
  
  const promoProducts = products?.filter((p) => p.promo_active && p.promo_price);

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  if (isLoading) {
    return (
      <section className="py-12 md:py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <Skeleton className="h-64 w-full" />
        </div>
      </section>
    );
  }

  if (!promoProducts || promoProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-promo mb-3">
            <Flame className="w-6 h-6" />
            <span className="font-display text-xl tracking-wide">OFFRES SPÉCIALES</span>
            <Flame className="w-6 h-6" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl mb-2">PROMOS DU MOMENT</h2>
          <div className="w-20 h-1 bg-promo mx-auto rounded-full" />
        </div>

        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {promoProducts.map((product) => (
              <CarouselItem key={product.id} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="p-1">
                  <ProductCard product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
        
        <div className="text-center mt-12">
          <Link to="/products" state={{ showPromos: true }}>
            <Button variant="outline" className="group">
              Voir toutes les promotions
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
