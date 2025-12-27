import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
// import { Header } from '@/components/Header'; // Remove direct import
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ProductGrid } from '@/components/ProductGrid';
import { PromoSection } from '@/components/PromoSection';
import { StorySection } from '@/components/StorySection';
import { LocalSeoSection } from '@/components/LocalSeoSection';
// import { Footer } from '@/components/Footer'; // Remove direct import
import { ProductCategory } from '@/types/product';
import { useProducts } from '@/hooks/useProducts'; // Import useProducts
import { Loader2 } from 'lucide-react'; // Import Loader2

const Index = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as ProductCategory | null;
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>(
    categoryParam || 'all'
  );

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Use useProducts without pagination for Index page
  const { data, isLoading, isError } = useProducts({
    category: selectedCategory === 'all' ? undefined : selectedCategory,
    enablePagination: false, // Disable pagination for Index page
  });

  // Normalize possible shapes returned by useProducts
  const products = Array.isArray(data) ? data : data?.products ?? data?.data ?? [];

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      
      <PromoSection />

      {/* Catalogue Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-4xl md:text-5xl mb-2">NOTRE CATALOGUE</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-8" />
            
            <CategoryFilter 
              selected={selectedCategory} 
              onChange={setSelectedCategory} 
            />
          </div>
        </div>
      </section>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : isError ? (
        <div className="text-center text-destructive">Erreur lors du chargement des produits.</div>
      ) : (
        <>
          <ProductGrid products={products} />
          <StorySection />
        </>
      )}
      <LocalSeoSection />
    </>
  );
};

export default Index;