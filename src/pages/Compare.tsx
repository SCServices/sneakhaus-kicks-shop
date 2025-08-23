import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Compare = () => {
  const getCompareProducts = useStore(state => state.getCompareProducts);
  const removeFromCompare = useStore(state => state.removeFromCompare);
  const clearCompare = useStore(state => state.clearCompare);
  const compareProducts = getCompareProducts();

  if (compareProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">Product Comparison</h1>
            <p className="text-muted-foreground text-lg mb-4">
              No products to compare yet
            </p>
            <p className="text-sm text-muted-foreground">
              Add products to compare by clicking the compare icon on any product
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold text-foreground">Compare Products</h1>
            <Badge variant="secondary">
              {compareProducts.length} of 3
            </Badge>
          </div>
          <Button onClick={clearCompare} variant="outline">
            Clear All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {compareProducts.map((product) => (
            <Card key={product.id} className="relative">
              <Button
                onClick={() => removeFromCompare(product.id)}
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 z-10"
              >
                <X className="h-4 w-4" />
              </Button>
              
              <CardHeader>
                <div className="aspect-square rounded-lg overflow-hidden mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-lg">{product.name}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-foreground">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating || 'N/A'}</span>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviewCount || 0} reviews)
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Category</p>
                  <Badge variant="outline">{product.category}</Badge>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Gender</p>
                  <Badge variant="outline" className="capitalize">{product.gender}</Badge>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Available Sizes</p>
                  <div className="flex flex-wrap gap-1">
                    {product.sizes.map((size) => (
                      <Badge key={size} variant="secondary" className="text-xs">
                        {size}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Colors</p>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <div
                        key={color.name}
                        className="w-6 h-6 rounded-full border-2 border-muted"
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-1">Use Cases</p>
                  <div className="flex flex-wrap gap-1">
                    {product.useCases?.slice(0, 3).map((useCase) => (
                      <Badge key={useCase} variant="outline" className="text-xs">
                        {useCase}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button asChild className="w-full">
                  <Link to={`/product/${product.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Compare;