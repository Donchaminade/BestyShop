import { MessageCircle, Tag, X } from 'lucide-react';
import { Product } from '@/types/product';
import { formatPrice, generateWhatsAppLink } from '@/lib/whatsapp';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useSettings } from '@/hooks/useSettings'; // Import useSettings
import { Loader2 } from 'lucide-react'; // Import Loader2

interface ProductModalProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  const { data: settings, isLoading: settingsLoading, isError: settingsError } = useSettings(); // Fetch settings
  const whatsappNumber = settings?.whatsapp_number || ''; // Default to empty string

  const hasPromo = product.promo_active && product.promo_price;
  const displayPrice = hasPromo ? product.promo_price! : product.price;
  const discount = hasPromo 
    ? Math.round(((product.price - product.promo_price!) / product.price) * 100)
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-0 overflow-hidden bg-card border-border">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-50 rounded-full bg-background/80 p-2 hover:bg-background transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative aspect-square bg-secondary/30">
            {hasPromo && (
              <Badge className="absolute top-3 left-3 z-10 bg-promo text-promo-foreground font-bold">
                <Tag className="w-3 h-3 mr-1" />
                -{discount}%
              </Badge>
            )}
            <img
              src={product.image_url || '/placeholder.svg'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col">
            <DialogHeader className="text-left">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                {product.category}
              </div>
              <DialogTitle className="text-xl font-semibold text-primary">
                {product.name}
              </DialogTitle>
            </DialogHeader>

            <p className="text-muted-foreground text-sm mt-4 flex-grow">
              {product.description || 'Un produit de qualité pour les vrais passionnés de football.'}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-6">
              <span className="font-display text-3xl text-primary">
                {formatPrice(displayPrice)}
              </span>
              {hasPromo && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* WhatsApp Button */}
            {settingsLoading ? (
                <Button size="lg" className="w-full mt-6" disabled>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Chargement...
                </Button>
            ) : settingsError || !whatsappNumber ? (
                <Button size="lg" className="w-full mt-6" disabled>
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp non disponible
                </Button>
            ) : (
                <a 
                href={generateWhatsAppLink(whatsappNumber, product)} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block mt-6"
                >
                <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#22c55e] text-white">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Commander via WhatsApp
                </Button>
                </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
