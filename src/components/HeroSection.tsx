import { Link } from 'react-router-dom';
import { ArrowRight, Zap, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AboutVideoContent } from '@/components/AboutVideoSection';
import { useSettings } from '@/hooks/useSettings'; // Import useSettings
import { Loader2 } from 'lucide-react'; // Import Loader2
import { X } from 'lucide-react'; // Import X icon, as it might be used here

export function HeroSection() {
  const { data: settings, isLoading: settingsLoading, isError: settingsError } = useSettings(); // Fetch settings
  const presentationVideoUrl = settings?.presentation_video_url || '/about.mp4'; // Default to /about.mp4
  const shopName = settings?.shop_name || "BestyShop"; // Get shop name

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden gradient-hero">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 gradient-glow opacity-50" />
      
      {/* Animated Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8 animate-fade-in">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Découvrez nos dernières collections</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 animate-slide-up">
            RÉVÉLEZ VOTRE ÉCLAT
            <br />
            <span className="text-gradient">AVEC {shopName}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Découvrez nos gammes exclusives de produits de beauté, de soins et de cosmétiques pour révéler votre beauté naturelle.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/promosection">
              <Button size="lg" className="group min-w-[200px]">
                Explorer les Produits
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/promosection">
              <Button variant="outline" size="lg" className="min-w-[200px]">
                Offres Exclusives
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border/50 max-w-md mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div>
              <div className="font-display text-3xl md:text-4xl text-primary">500+</div>
              <div className="text-xs text-muted-foreground mt-1">Articles Beauté</div>
            </div>
            <div>
              <div className="font-display text-3xl md:text-4xl text-primary">24h</div>
              <div className="text-xs text-muted-foreground mt-1">Livraison Rapide</div>
            </div>
            <div>
              <div className="font-display text-3xl md:text-4xl text-primary">100%</div>
              <div className="text-xs text-muted-foreground mt-1">Qualité Garantie</div>
            </div>
          </div>

          {/* Play Video Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                className="mt-12 text-primary hover:text-primary-foreground animate-pulse-glow-button text-lg font-semibold"
                disabled={settingsLoading || settingsError || !presentationVideoUrl}
              >
                {settingsLoading && <Loader2 className="w-6 h-6 mr-2 animate-spin" />}
                {!settingsLoading && (settingsError || !presentationVideoUrl) && <X className="w-6 h-6 mr-2" />}
                {!settingsLoading && !settingsError && presentationVideoUrl && <PlayCircle className="w-6 h-6 mr-2" />}
                Regarder la Vidéo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
              <AboutVideoContent autoPlay={true} videoUrl={presentationVideoUrl} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
