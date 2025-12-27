import { Facebook, Instagram, Youtube } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export function SocialMediaSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 text-center">
        <AnimatedSection>
          <h2 className="font-display text-4xl md:text-5xl mb-8">
            Suivez-nous sur les <span className="text-gradient">réseaux sociaux</span>
          </h2>
          <div className="flex justify-center space-x-6">
            <a href="https://www.tiktok.com/@bestyshop" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
              <Youtube className="w-12 h-12" /> {/* Using Youtube for TikTok as we don't have a TikTok icon directly */}
            </a>
            <a href="https://www.facebook.com/bestyshop" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
              <Facebook className="w-12 h-12" />
            </a>
            <a href="https://www.instagram.com/bestyshop" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
              <Instagram className="w-12 h-12" />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
