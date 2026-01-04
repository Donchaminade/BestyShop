import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductGrid } from '@/components/ProductGrid';
import { useProducts } from '@/hooks/useProducts';
import { Input } from '@/components/ui/input';
import {
  Loader2,
  Zap,
  Search,
  ArrowLeft,
  ArrowRight,
  Tag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ProductCategory } from '@/types/product';

export default function Products() {
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showPromotionsOnly, setShowPromotionsOnly] = useState(
    !!location.state?.showPromos
  );
  const [selectedCategory, setSelectedCategory] = useState<
    ProductCategory | 'all'
  >('all');

  const pageSize = 12;

  /* --------------------------------------------
   * Arrivée depuis une autre page (promotions)
   * -------------------------------------------- */
  useEffect(() => {
    if (location.state?.showPromos) {
      setShowPromotionsOnly(true);
      setCurrentPage(1);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  /* --------------------------------------------
   * Reset pagination sur filtres client-side
   * -------------------------------------------- */
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, showPromotionsOnly]);

  /* --------------------------------------------
   * Fetch produits (catégorie côté API)
   * -------------------------------------------- */
  const { data, isLoading, isFetching, isError } = useProducts({
    page: currentPage,
    pageSize,
    category: selectedCategory === 'all' ? undefined : selectedCategory,
  });

  const products = data?.data ?? [];
  const totalCount = data?.count ?? 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  /* --------------------------------------------
   * Filtrage client-side optimisé
   * -------------------------------------------- */
  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(term) ||
        product.description?.toLowerCase().includes(term);

      const matchesPromo =
        !showPromotionsOnly || product.promo_active === true;

      return matchesSearch && matchesPromo;
    });
  }, [products, searchTerm, showPromotionsOnly]);

  /* --------------------------------------------
   * Handlers
   * -------------------------------------------- */
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleCategoryChange = (value: ProductCategory | 'all') => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* 🔥 BACKGROUND DÉCORATIF – NE BLOQUE PLUS LES CLICS */}
      <div
        className="absolute inset-0 opacity-[0.2] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* CONTENU */}
      <div className="relative z-10">
        {/* HERO */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 text-center gradient-hero">
          <div className="container mx-auto px-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Notre Sélection Bio
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl mb-4">
              Tous nos <span className="text-gradient">Produits Bio</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Parcourez notre sélection complète de produits 100% biologiques.
            </p>
          </div>
        </section>

        {/* MAIN */}
        <div className="container mx-auto px-4 pb-16">
          {/* FILTRES */}
          <div className="mb-10">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-3"
                />
              </div>

              <Button
                variant={showPromotionsOnly ? 'default' : 'outline'}
                onClick={() => setShowPromotionsOnly((p) => !p)}
              >
                <Tag className="w-4 h-4 mr-2" />
                {showPromotionsOnly ? 'Voir tout' : 'Promotions'}
              </Button>
            </div>

            <CategoryFilter
              selected={selectedCategory}
              onChange={handleCategoryChange}
            />
          </div>

          {/* LISTE */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
          ) : isError ? (
            <div className="text-center text-destructive py-16">
              Erreur lors du chargement des produits.
            </div>
          ) : (
            <div className="relative">
              {isFetching && (
                <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center z-20 rounded-xl">
                  <Loader2 className="w-10 h-10 animate-spin text-primary" />
                </div>
              )}

              {filteredProducts.length > 0 ? (
                <ProductGrid products={filteredProducts} />
              ) : (
                <div className="text-center py-16 text-muted-foreground">
                  Aucun produit ne correspond à votre sélection.
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                  <Button
                    variant="outline"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1 || isFetching}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Précédent
                  </Button>

                  <span className="font-medium text-muted-foreground">
                    Page {currentPage} sur {totalPages}
                  </span>

                  <Button
                    variant="outline"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages || isFetching}
                  >
                    Suivant
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
