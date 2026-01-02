import { Instagram, Facebook, MessageCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSettings } from '@/hooks/useSettings'; // Import useSettings

export function Footer() {
  const { data: settings, isLoading } = useSettings();

  const shopName = settings?.shop_name || "NutriPack";
  const logoUrl = settings?.logo_url || "/logo.jpeg";
  const whatsappNumber = settings?.whatsapp_number || '+22899181626';

  const email = 'contact@nutripack.com';
  const openingHours = 'Disponible en ligne 24h/24, 7j/7';

  if (isLoading) {
    return (
      <footer className="bg-card border-t border-border py-8 text-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
        <p className="text-sm text-muted-foreground mt-2">Chargement des paramètres...</p>
      </footer>
    );
  }
  
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <img
                src={logoUrl}
                alt={shopName}
                className="w-10 h-10 rounded-lg object-cover"
              />
                          <span className="font-display text-2xl md:text-3xl tracking-wide">
                          {shopName}
                          </span>            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              NutriPack : Votre source pour des produits alimentaires 100% bio et naturels. Fraîcheur, saveur et qualité garanties, directement du producteur à votre table.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Produits
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Horaires */}
          <div>
            <h4 className="font-display text-lg mb-4">Contact & Horaires</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp: {whatsappNumber}
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${email}`} 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Email: {email}
                </a>
              </li>
              <li>
                <p className="text-sm text-muted-foreground">
                  Horaires: {openingHours}
                </p>
              </li>
              <li>
                <a 
                  href="#" 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {shopName}. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
