import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';
import { Badge } from '@/components/ui/badge';

const Sale = () => {
  const getSaleProducts = useStore(state => state.getSaleProducts);
  const saleProducts = getSaleProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl font-bold text-foreground">Sale & Clearance</h1>
            <Badge variant="destructive" className="animate-pulse">
              Up to 50% Off
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't miss out on amazing deals! Limited time offers on premium footwear.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {saleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {saleProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No sale items available right now. Check back later for great deals!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sale;