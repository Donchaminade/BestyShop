import { cn } from '@/lib/utils';
import { ProductCategory } from '@/types/product';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Sparkles, Heart, SprayCan, Hand, Scissors, Gem } from 'lucide-react'; // Updated icons

const categories: { value: ProductCategory | 'all'; label: string; icon: React.ElementType }[] = [
  { value: 'all', label: 'Tout', icon: ShoppingBag },
  { value: 'Maquillage', label: 'Maquillage', icon: Sparkles },
  { value: 'Soins Visage', label: 'Soins Visage', icon: Heart },
  { value: 'Soins Corps', label: 'Soins Corps', icon: Hand },
  { value: 'Parfums', label: 'Parfums', icon: SprayCan },
  { value: 'Accessoires Beauté', label: 'Accessoires', icon: Gem },
  { value: 'Cheveux', label: 'Cheveux', icon: Scissors },
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
