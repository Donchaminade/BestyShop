import { useState } from 'react';
import { Eye, ShoppingCart, Tag } from 'lucide-react';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/whatsapp';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductModal } from './ProductModal';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/use-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const hasPromo = product.promo_active && product.promo_price;
  const displayPrice = hasPromo ? product.promo_price! : product.price;
  const discount = hasPromo 
    ? Math.round(((product.price - product.promo_price!) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Ajouté au panier",
      description: `${product.name} a été ajouté à votre panier.`,
      action: (
        <a href="#" className="font-bold">Voir le panier</a>
      ),
    });
  };

  return (
    <>
      <article className="group relative rounded-xl overflow-hidden gradient-card border border-border/50 card-hover">
        {/* Promo Badge */}
        {hasPromo && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-promo text-promo-foreground font-bold shadow-lg">
              <Tag className="w-3 h-3 mr-1" />
              -{discount}%
            </Badge>
          </div>
        )}

        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-secondary/30">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-secondary animate-pulse" />
          )}
          <img
            src={product.image_url || '/placeholder.svg'}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="w-full"
            >
              <Eye className="w-4 h-4 mr-2" />
              Détails
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
            {product.category}
          </div>
          
          <h3 className="font-medium text-primary line-clamp-2 mb-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="font-display text-2xl text-primary">
              {formatPrice(displayPrice)}
            </span>
            {hasPromo && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button className="w-full" onClick={handleAddToCart}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Au panier
          </Button>
        </div>
      </article>

      <ProductModal 
        product={product} 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </>
  );
}
