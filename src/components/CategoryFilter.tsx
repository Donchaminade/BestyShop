import { cn } from '@/lib/utils';
import { ProductCategory } from '@/types/product';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Wheat, BarChart, Nut, Leaf, CookingPot, Carrot, Apple, Feather, Droplet, Cookie, Heart } from 'lucide-react'; // Corrected icons

const categories: { value: ProductCategory | 'all'; label: string; icon: React.ElementType }[] = [
  { value: 'all', label: 'Tout', icon: ShoppingBag },
  { value: 'Farines bio', label: 'Farines bio', icon: Wheat },
  { value: 'Céréales bio', label: 'Céréales bio', icon: BarChart },
  { value: 'Légumineuses bio', label: 'Légumineuses bio', icon: Nut },
  { value: 'Plantes et fleurs pour boissons naturelles', label: 'Boissons Naturelles', icon: Leaf },
  { value: 'Épices et condiments bio', label: 'Épices et Condiments', icon: CookingPot },
  { value: 'Racines et tubercules transformés', label: 'Racines et Tubercules', icon: Carrot },
  { value: 'Fruits séchés et dérivés', label: 'Fruits Séchés', icon: Apple },
  { value: 'Produits de cueillette traditionnelle', label: 'Cueillette', icon: Feather },
  { value: 'Huiles végétales bio', label: 'Huiles Végétales', icon: Droplet },
  { value: 'Sucres et édulcorants naturels', label: 'Sucres Naturels', icon: Cookie },
  { value: 'Produits bien-être naturels', label: 'Bien-être', icon: Heart },
];

interface CategoryFilterProps {
  selected: ProductCategory | 'all';
  onChange: (category: ProductCategory | 'all') => void;
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
      {categories.map(({ value, label, icon: Icon }) => (
        <Button
          key={value}
          variant={selected === value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onChange(value)}
          className={cn(
            'transition-all duration-300',
            selected === value && 'shadow-glow'
          )}
        >
          <Icon className="w-4 h-4 mr-2" />
          {label}
        </Button>
      ))}
    </div>
  );
}
