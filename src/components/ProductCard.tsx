import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/store';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, size?: string, color?: string) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  // Mock multiple images per color for demo - in real app this would come from product data
  const productImages = product.colors.map((color, index) => ({
    id: `${product.id}-${color}`,
    color,
    images: [
      product.image, // First image - same for demo
      product.image  // Hover image - same for demo, would be different in real app
    ]
  }));

  const getColorValue = (colorName: string) => {
    const colorMap: { [key: string]: string } = {
      'Black': '#000000',
      'White': '#FFFFFF', 
      'Gold': '#D4AF37',
      'Navy': '#000080',
      'Gray': '#808080',
      'Red': '#FF0000',
      'Brown': '#8B4513',
      'Blue': '#0000FF',
      'Green': '#008000',
      'Beige': '#F5F5DC'
    };
    return colorMap[colorName] || '#CCCCCC';
  };

  const handleColorChange = (index: number) => {
    setActiveColorIndex(index);
    setActiveImageIndex(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setActiveImageIndex(1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setActiveImageIndex(0);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const selectedColor = product.colors[activeColorIndex];
    onAddToCart?.(product, selectedSize, selectedColor);
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
            {productImages.map((imageSet, index) => (
              <motion.div
                key={imageSet.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: index === activeColorIndex ? 1 : 0 
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={imageSet.images[activeImageIndex]}
                  alt={`${product.name} in ${imageSet.color}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: isHovered ? 1.05 : 1 
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
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

          {/* Featured Badge */}
          {product.featured && (
            <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
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
        
        <p className="text-sm text-muted-foreground">{product.category}</p>
        
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-brand-black">${product.price}</p>
        </div>

        {/* Color Selection */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground">Colors:</span>
          <div className="flex space-x-2">
            {product.colors.map((color, index) => (
              <button
                key={color}
                className="relative w-6 h-6 rounded-full border-2 border-gray-300 transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: getColorValue(color) }}
                onClick={() => handleColorChange(index)}
                title={color}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;