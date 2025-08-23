import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';
import { Badge } from '@/components/ui/badge';

const NewArrivals = () => {
  const getNewArrivals = useStore(state => state.getNewArrivals);
  const newProducts = getNewArrivals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl font-bold text-foreground">New Arrivals</h1>
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              Fresh
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Be the first to experience our latest innovations in footwear technology and design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {newProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No new arrivals at the moment. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewArrivals;