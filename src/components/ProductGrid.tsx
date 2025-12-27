import { Product, ProductCategory } from '@/types/product';
import { ProductCard } from './ProductCard';



interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGridDisplay: React.FC<ProductGridProps> = ({ products, title }) => {

  const displayProducts = products.length > 8 ? products.slice(0, 8) : products;

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        {title && (
          <div className="text-center mb-10">
            <h2 className="font-display text-4xl md:text-5xl mb-2">{title}</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>
        )}

        {products && products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {displayProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Aucun produit disponible pour le moment
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export { ProductGridDisplay as ProductGrid };
