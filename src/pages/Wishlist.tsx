import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';

const Wishlist = () => {
  const getWishlistProducts = useStore(state => state.getWishlistProducts);
  const wishlistProducts = getWishlistProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-accent fill-accent" />
            <h1 className="text-4xl font-bold text-foreground">My Wishlist</h1>
            <Badge variant="secondary">
              {wishlistProducts.length} items
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your saved favorites for future purchases
          </p>
        </div>

        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg mb-4">
              Your wishlist is empty
            </p>
            <p className="text-sm text-muted-foreground">
              Start adding products to your wishlist by clicking the heart icon on any product
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;