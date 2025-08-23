import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';

const Women = () => {
  const getProductsByGender = useStore(state => state.getProductsByGender);
  const womenProducts = getProductsByGender('women');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Women's Collection</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Elevate your style with our curated women's footwear collection, blending fashion and comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {womenProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {womenProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No women's products available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Women;