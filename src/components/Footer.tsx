import { ShoppingBag, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <img
                src="/logo.jpeg"
                alt="ZakSport"
                className="w-10 h-10 rounded-lg object-cover"
              />
              <span className="font-display text-2xl md:text-3xl tracking-wide">
                Besty<span className="text-primary">Shop</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              Votre destination pour les équipements sportifs authentiques. 
              Maillots officiels, éditions rétro et accessoires pour vivre votre passion.
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
                <Link to="/?category=Maillots" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Maillots
                </Link>
              </li>
              <li>
                <Link to="/?category=Retro" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Retro
                </Link>
              </li>
              <li>
                <Link to="/?category=Chaussures" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Chaussures
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://wa.me/+22897781257" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
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
            © {new Date().getFullYear()} BestyShop. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
