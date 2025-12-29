import { NavLink, Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { Badge } from '@/components/ui/badge';
import { CartDrawer } from './CartDrawer';
import { useSettings } from '@/hooks/useSettings'; // Import useSettings

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAdmin } = useAuth();
  const { items } = useCart();
  const { data: settings, isLoading: settingsLoading, isError: settingsError } = useSettings(); // Fetch settings

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Fallback values if settings are not loaded or error
  const shopName = settings?.shop_name || "BestyShop";
  const logoUrl = settings?.logo_url || "/logo.jpeg";

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary' : 'text-muted-foreground'
    }`;
  
  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `block px-4 py-3 rounded-lg transition-colors ${
    isActive ? 'bg-secondary text-primary font-semibold' : 'hover:bg-secondary'
  }`;


  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                      <img
                        src={logoUrl}
                        alt={shopName}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <span className="font-display text-2xl md:text-3xl tracking-wide">
                        {shopName.substring(0, shopName.length - 4)}<span className="text-primary">{shopName.slice(-4)}</span>
                      </span>
                    </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/" className={navLinkClasses}>Accueil</NavLink>
            <NavLink to="/products" className={navLinkClasses}>Produits</NavLink>
            <NavLink to="/about" className={navLinkClasses}>À propos</NavLink>
            <NavLink to="/contact" className={navLinkClasses}>Contact</NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">


            <CartDrawer>
              <Button variant="ghost" size="icon" className="relative rounded-full">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-primary text-primary-foreground p-1 text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </CartDrawer>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-slide-up">
            <div className="flex flex-col gap-2">
              <NavLink to="/" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>Accueil</NavLink>
              <NavLink to="/products" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>Produits</NavLink>
              <NavLink to="/about" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>À propos</NavLink>
              <NavLink to="/contact" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
              

            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
