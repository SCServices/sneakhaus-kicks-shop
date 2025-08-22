import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingBag, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useStore, ProductColor } from '@/lib/store';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useStore();
  
  const product = products.find(p => p.id === id);
  
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const selectedColor = product.colors[selectedColorIndex];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    addToCart(product, selectedSize, selectedColor);
    toast.success('Added to cart!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <button onClick={() => navigate('/')} className="hover:text-foreground">
          Home
        </button>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-background rounded-lg overflow-hidden">
            <motion.img
              key={`${selectedColor.name}-${selectedImageIndex}`}
              src={selectedColor.images[selectedImageIndex]}
              alt={`${product.name} in ${selectedColor.name}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          {/* Image thumbnails */}
          <div className="flex space-x-2">
            {selectedColor.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImageIndex === index ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              {product.isOnSale && (
                <Badge className="bg-red-500 text-white">Sale</Badge>
              )}
              {product.isNewArrival && (
                <Badge className="bg-accent text-accent-foreground">New Arrival</Badge>
              )}
              <Badge variant="outline">{product.gender === 'men' ? "Men's" : "Women's"}</Badge>
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
            <p className="text-lg text-muted-foreground mb-4">{product.category}</p>
            
            <div className="flex items-center space-x-4 mb-6">
              {product.isOnSale && product.originalPrice ? (
                <>
                  <span className="text-3xl font-bold text-foreground">${product.price}</span>
                  <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
                  <Badge className="bg-red-500 text-white">
                    Save ${product.originalPrice - product.price}
                  </Badge>
                </>
              ) : (
                <span className="text-3xl font-bold text-foreground">${product.price}</span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(127 reviews)</span>
            </div>
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">
              Color: <span className="font-normal">{selectedColor.name}</span>
            </label>
            <div className="flex space-x-3">
              {product.colors.map((color, index) => (
                <button
                  key={color.name}
                  onClick={() => {
                    setSelectedColorIndex(index);
                    setSelectedImageIndex(0);
                  }}
                  className="relative w-10 h-10 rounded-full border-2 border-gray-300 transition-all hover:scale-110"
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  {index === selectedColorIndex && (
                    <motion.div
                      layoutId="color-selector"
                      className="absolute -inset-1 rounded-full border-2 border-primary"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Size</label>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 px-4 border rounded-lg text-center transition-all ${
                    selectedSize === size
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-foreground border-border hover:border-primary'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <Button 
              onClick={handleAddToCart}
              className="flex-1 h-12"
              size="lg"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsLiked(!isLiked)}
              className="h-12 px-6"
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>

          {/* Features */}
          <div className="space-y-4 pt-6 border-t">
            <div className="flex items-center space-x-3">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Free shipping on orders over $100</span>
            </div>
            <div className="flex items-center space-x-3">
              <RotateCcw className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">30-day return policy</span>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">2-year warranty included</span>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            
            {product.useCases && (
              <div>
                <h4 className="font-medium mb-2">Perfect for:</h4>
                <div className="flex flex-wrap gap-2">
                  {product.useCases.map((useCase, index) => (
                    <Badge key={index} variant="outline">{useCase}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;