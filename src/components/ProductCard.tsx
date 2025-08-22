import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/store';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div 
      className="group relative bg-card rounded-lg overflow-hidden shadow-card transition-smooth hover:shadow-product"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square bg-brand-gray-light relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          />
          
          {/* Overlay Actions */}
          <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-smooth ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <Button 
              className="bg-white text-brand-black hover:bg-brand-gold hover:text-white transition-smooth"
              onClick={(e) => {
                e.preventDefault();
                onAddToCart?.(product);
              }}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Quick Add
            </Button>
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-3 right-3 bg-white/80 backdrop-blur-sm transition-smooth ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </Button>

          {/* Featured Badge */}
          {product.featured && (
            <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
              Featured
            </Badge>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-foreground group-hover:text-accent transition-smooth">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-muted-foreground">{product.category}</p>
        
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-brand-black">${product.price}</p>
          
          {/* Color Options */}
          <div className="flex space-x-1">
            {product.colors.slice(0, 3).map((color) => (
              <div
                key={color}
                className={`w-4 h-4 rounded-full border-2 border-gray-300 ${
                  color === 'Black' ? 'bg-black' :
                  color === 'White' ? 'bg-white' :
                  color === 'Gold' ? 'bg-brand-gold' :
                  color === 'Navy' ? 'bg-blue-900' :
                  color === 'Gray' ? 'bg-gray-500' :
                  color === 'Red' ? 'bg-red-500' :
                  'bg-gray-300'
                }`}
                title={color}
              />
            ))}
            {product.colors.length > 3 && (
              <div className="text-xs text-muted-foreground">
                +{product.colors.length - 3}
              </div>
            )}
          </div>
        </div>

        {/* Size Preview */}
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <span>Sizes:</span>
          <span>{product.sizes[0]} - {product.sizes[product.sizes.length - 1]}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;