import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingBag, Star, Truck, Shield, RotateCcw, ZoomIn, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore, ProductColor } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isZoomed, setIsZoomed] = useState(false);

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

  // Add defensive checks for product data
  if (!product.colors || product.colors.length === 0) {
    console.error('Product missing colors array:', product);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Data Incomplete</h1>
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
          <div className="relative aspect-square bg-background rounded-lg overflow-hidden group cursor-zoom-in"
               onClick={() => setIsZoomed(true)}>
            <motion.img
              key={`${selectedColor.name}-${selectedImageIndex}`}
              src={selectedColor.images[selectedImageIndex]}
              alt={`${product.name} in ${selectedColor.name}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute top-4 right-4 bg-background/80 rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="h-4 w-4" />
            </div>
          </div>
          
          {/* Image thumbnails */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {selectedColor.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImageIndex === index ? 'border-primary' : 'border-border hover:border-primary/50'
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

        {/* Zoom Modal */}
        <AnimatePresence>
          {isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setIsZoomed(false)}
            >
              <motion.img
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                src={selectedColor.images[selectedImageIndex]}
                alt={`${product.name} in ${selectedColor.name}`}
                className="max-w-full max-h-full object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>

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
              {product.sizes && product.sizes.length > 0 ? (
                product.sizes.map((size) => (
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
                ))
              ) : (
                <div className="col-span-4 text-center text-muted-foreground">
                  No sizes available
                </div>
              )}
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

      {/* Customer Reviews Section */}
      <div className="mt-16">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Customer Reviews</span>
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">5.0 (127 reviews)</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Review Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">5.0</div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Based on 127 reviews</p>
              </div>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center space-x-2">
                    <span className="text-sm w-3">{stars}</span>
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: stars === 5 ? '85%' : stars === 4 ? '10%' : '5%' }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-8">
                      {stars === 5 ? '108' : stars === 4 ? '12' : '7'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Button variant="outline" className="w-full">
                  Write a Review
                </Button>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              {[
                {
                  name: "Sarah M.",
                  rating: 5,
                  date: "2 weeks ago",
                  title: "Perfect fit and great quality!",
                  content: "I absolutely love these shoes! The quality is outstanding and they're incredibly comfortable. Perfect for both casual and semi-formal occasions.",
                  verified: true
                },
                {
                  name: "Mike R.",
                  rating: 5,
                  date: "1 month ago", 
                  title: "Exceeded expectations",
                  content: "These shoes are even better in person. The craftsmanship is excellent and they've held up beautifully after several months of regular wear.",
                  verified: true
                },
                {
                  name: "Emma K.",
                  rating: 4,
                  date: "1 month ago",
                  title: "Great style, runs slightly large",
                  content: "Love the design and color options. Only minor issue is they run a bit large, so I'd recommend ordering a half size down.",
                  verified: true
                }
              ].map((review, index) => (
                <div key={index} className="border-b pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{review.name}</h4>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">Verified Purchase</Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h5 className="font-medium mb-2">{review.title}</h5>
                  <p className="text-muted-foreground text-sm leading-relaxed">{review.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Frequently Purchased Together */}
      <div className="mt-16">
        <Card>
          <CardHeader>
            <CardTitle>Frequently Purchased Together</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.slice(0, 4).filter(p => p.id !== product.id).map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                >
                  <div className="aspect-square bg-background rounded-lg overflow-hidden mb-3">
                    <img
                      src={relatedProduct.colors[0]?.images[0]}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">
                    {relatedProduct.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">{relatedProduct.category}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">${relatedProduct.price}</span>
                    {relatedProduct.isOnSale && (
                      <Badge className="bg-red-500 text-white text-xs">Sale</Badge>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline" onClick={() => navigate('/')}>
                View All Products
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;