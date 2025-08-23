import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';

const Products = () => {
  const products = useStore(state => state.products);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">All Products</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our complete collection of premium sneakers designed for performance and style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No products available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;