import { Facebook, Instagram, Youtube, Loader2 } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { useSettings } from '@/hooks/useSettings'; // Import useSettings

export function SocialMediaSection() {
  const { data: settings, isLoading } = useSettings(); // Fetch settings

  const shopName = settings?.shop_name || "Tayba Market";
  const sanitizedShopName = shopName.toLowerCase().replace(/\s/g, '');

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-secondary/30 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 text-center">
        <AnimatedSection>
          <h2 className="font-display text-4xl md:text-5xl mb-8">
            Suivez <span className="text-gradient">Tayba Market</span> sur les réseaux sociaux
          </h2>
          <div className="flex justify-center space-x-6">
            <a href={`https://www.tiktok.com/@${sanitizedShopName}`} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
              <Youtube className="w-12 h-12" /> {/* Using Youtube for TikTok as we don't have a TikTok icon directly */}
            </a>
            <a href={`https://www.facebook.com/${sanitizedShopName}`} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
              <Facebook className="w-12 h-12" />
            </a>
            <a href={`https://www.instagram.com/${sanitizedShopName}`} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
              <Instagram className="w-12 h-12" />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
