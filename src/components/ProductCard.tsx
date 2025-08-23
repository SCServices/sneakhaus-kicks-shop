import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product, ProductColor } from '@/lib/store';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, size?: string, color?: ProductColor) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  // Add comprehensive defensive checks at the top
  console.log('ProductCard rendering with product:', product);
  
  if (!product) {
    console.error('ProductCard: No product provided');
    return <div>Error: No product data</div>;
  }
  
  if (!product.colors || !Array.isArray(product.colors) || product.colors.length === 0) {
    console.error('ProductCard: Invalid colors array:', product);
    return <div>Error: Product colors not available</div>;
  }
  
  if (!product.sizes || !Array.isArray(product.sizes) || product.sizes.length === 0) {
    console.error('ProductCard: Invalid sizes array:', product);
    return <div>Error: Product sizes not available</div>;
  }

  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Safe initialization of selected size
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  // Safe access to active color with bounds checking
  const safeActiveColorIndex = Math.max(0, Math.min(activeColorIndex, product.colors.length - 1));
  const activeColor = product.colors[safeActiveColorIndex];
  
  // Additional safety check for activeColor
  if (!activeColor || !activeColor.images || !Array.isArray(activeColor.images) || activeColor.images.length === 0) {
    console.error('ProductCard: Invalid active color or images:', { activeColor, safeActiveColorIndex });
    return <div>Error: Product images not available</div>;
  }

  const handleColorChange = (index: number) => {
    // Add bounds checking for color index
    if (index >= 0 && index < product.colors.length) {
      setActiveColorIndex(index);
      setActiveImageIndex(0);
    } else {
      console.warn('Invalid color index:', index, 'Max index:', product.colors.length - 1);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Safely check if second image exists before switching
    if (activeColor.images && activeColor.images.length > 1) {
      setActiveImageIndex(1);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setActiveImageIndex(0);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedSize) {
      console.warn('No size selected');
      return;
    }
    onAddToCart?.(product, selectedSize, activeColor);
  };

  return (
    <div className="group relative bg-card rounded-lg overflow-hidden shadow-card transition-smooth hover:shadow-product">
      {/* Product Image */}
      <Link to={`/product/${product.id}`}>
        <div 
          className="aspect-square bg-brand-gray-light relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Image switching based on color selection */}
          <div className="relative w-full h-full">
            <motion.img
              key={`${activeColor.name}-${activeImageIndex}`}
              src={activeColor.images[Math.min(activeImageIndex, activeColor.images.length - 1)]}
              alt={`${product.name} in ${activeColor.name}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ 
                opacity: 1,
                scale: isHovered ? 1.05 : 1 
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          {/* Overlay Actions */}
          <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-smooth ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <Button 
              className="bg-white text-brand-black hover:bg-brand-gold hover:text-white transition-smooth"
              onClick={handleAddToCart}
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

          {/* Sale Badge */}
          {product.isOnSale && (
            <Badge className="absolute top-3 left-3 bg-red-500 text-white">
              Sale
            </Badge>
          )}

          {/* New Arrival Badge */}
          {product.isNewArrival && !product.isOnSale && (
            <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
              New
            </Badge>
          )}

          {/* Featured Badge */}
          {product.featured && !product.isOnSale && !product.isNewArrival && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
              Featured
            </Badge>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-foreground group-hover:text-accent transition-smooth">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-muted-foreground">{product.category} • {product.gender === 'men' ? "Men's" : "Women's"}</p>
        
        <div className="flex items-center justify-between">
          {product.isOnSale && product.originalPrice ? (
            <div className="flex items-center space-x-2">
              <p className="text-lg font-bold text-brand-black">${product.price}</p>
              <p className="text-sm text-muted-foreground line-through">${product.originalPrice}</p>
            </div>
          ) : (
            <p className="text-lg font-bold text-brand-black">${product.price}</p>
          )}
        </div>

        {/* Color Selection */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground">Colors:</span>
          <div className="flex space-x-2">
            {product.colors.map((color, index) => (
              <button
                key={color.name}
                className="relative w-6 h-6 rounded-full border-2 border-gray-300 transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: color.value }}
                onClick={() => handleColorChange(index)}
                title={color.name}
              >
                {index === activeColorIndex && (
                  <motion.div
                    layoutId={`color-indicator-${product.id}`}
                    className="absolute -inset-1 rounded-full border-2 border-primary"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground">Size:</span>
          <div className="flex flex-wrap gap-1">
            {product.sizes && product.sizes.length > 0 ? (
              <>
                {product.sizes.slice(0, 6).map((size) => (
                  <button
                    key={size}
                    className={`px-2 py-1 text-xs border rounded transition-all duration-200 ${
                      selectedSize === size
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background text-foreground border-border hover:border-primary'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
                {product.sizes.length > 6 && (
                  <span className="text-xs text-muted-foreground px-2 py-1">
                    +{product.sizes.length - 6}
                  </span>
                )}
              </>
            ) : (
              <span className="text-xs text-muted-foreground">No sizes available</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;