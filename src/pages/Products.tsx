import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductGrid } from '@/components/ProductGrid';
import { useProducts, useProductCategories } from '@/hooks/useProducts';
import { Input } from '@/components/ui/input';
import { Loader2, Zap, Search, ArrowLeft, ArrowRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ProductCategory } from '@/types/product';

export default function Products() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showPromotionsOnly, setShowPromotionsOnly] = useState(!!location.state?.showPromos);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const pageSize = 12;

  useEffect(() => {
    if (location.state?.showPromos) {
      setShowPromotionsOnly(true);
    }
  }, [location.state]);

  const { data, isLoading, isFetching, isError } = useProducts({ 
    page: currentPage, 
    pageSize, 
    category: selectedCategory || undefined 
  });
  
  const { data: categories, isLoading: isLoadingCategories } = useProductCategories();

  const products = data?.data || [];
  const totalCount = data?.count || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  // Client-side filtering is now only for search term and promo, as category is handled by the API
  const filteredProducts = products.filter(product =>
    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!showPromotionsOnly || (showPromotionsOnly && product.promo_active))
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleCategoryChange = (value: string) => {
    const newCategory = value as ProductCategory;
    if (selectedCategory === newCategory) {
      setSelectedCategory(null); // Deselect if clicked again
    } else {
      setSelectedCategory(newCategory);
    }
    setCurrentPage(1); // Reset to first page on category change
  };

  return (
    <div className="min-h-screen bg-background relative">
      <div 
        className="absolute inset-0 opacity-[0.2]" // Increased opacity
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 flex items-center justify-center overflow-hidden gradient-hero">
        <div className="absolute inset-0 gradient-glow opacity-30" />
        {/* Removed redundant grid background from here */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 animate-fade-in">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Notre Collection</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-tight mb-4 animate-slide-up">
              Tous nos <span className="text-gradient">Produits</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Parcourez notre sélection complète de maillots, équipements et accessoires sportifs.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        {/* Filters */}
        <div className="mb-8 md:mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                <div className="relative flex-grow w-full md:w-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Rechercher un produit..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-card shadow-sm focus-visible:ring-primary"
                    />
                </div>
                <Button
                    variant={showPromotionsOnly ? "default" : "outline"}
                    onClick={() => setShowPromotionsOnly(!showPromotionsOnly)}
                    className="w-full md:w-auto flex-shrink-0"
                >
                    <Tag className="w-4 h-4 mr-2" />
                    {showPromotionsOnly ? "Voir tout" : "Promotions"}
                </Button>
            </div>
            {isLoadingCategories ? (
                <div className="h-10 w-full bg-card rounded-lg animate-pulse" />
            ) : (
                <div className="flex justify-center">
                    <ToggleGroup 
                      type="single" 
                      value={selectedCategory || ''}
                      onValueChange={handleCategoryChange}
                      className="flex-wrap justify-center gap-2"
                    >
                        <ToggleGroupItem value="" aria-label="Toggle all">
                            Tout
                        </ToggleGroupItem>
                        {categories?.map(cat => (
                            <ToggleGroupItem key={cat} value={cat} aria-label={`Toggle ${cat}`}>
                                {cat}
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                </div>
            )}
        </div>
      
        {/* Product Listing */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <div className="text-center text-destructive py-16">Erreur lors du chargement des produits.</div>
        ) : (
          <div className="relative">
            {isFetching && !isLoading && (
              <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
              </div>
            )}
            
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground">Aucun produit ne correspond à votre sélection.</p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <Button 
                  variant="outline" 
                  onClick={handlePreviousPage} 
                  disabled={currentPage === 1 || isFetching}
                  className="group"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Précédent
                </Button>
                <span className="font-medium text-muted-foreground">
                  Page {currentPage} sur {totalPages}
                </span>
                <Button 
                  variant="outline" 
                  onClick={handleNextPage} 
                  disabled={currentPage === totalPages || isFetching}
                  className="group"
                >
                  Suivant
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
