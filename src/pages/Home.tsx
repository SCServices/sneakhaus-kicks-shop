import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import { useStore } from '@/lib/store';
import heroImage from '@/assets/hero-sneaker.jpg';
import collectionImage from '@/assets/collection-banner.jpg';

const Home = () => {
  const { products, addToCart } = useStore();
  const featuredProducts = products.filter(product => product.featured);

  const handleQuickAdd = (product: any) => {
    // Add to cart with default selections for quick add
    addToCart(product, product.sizes[0], product.colors[0]);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            STEP INTO
            <span className="block gradient-gold bg-clip-text text-transparent">
              EXCELLENCE
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Discover our premium collection of sneakers designed for the modern lifestyle. 
            Where comfort meets luxury.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-brand-gold text-brand-black hover:bg-brand-gold-light text-lg px-8">
              Shop Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-black text-lg px-8">
              New Arrivals
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-brand-gray-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center shadow-card">
              <CardContent className="p-6">
                <Truck className="h-12 w-12 mx-auto mb-4 text-accent" />
                <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
                <p className="text-muted-foreground">Free shipping on orders over $200</p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-card">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 mx-auto mb-4 text-accent" />
                <h3 className="text-lg font-semibold mb-2">Authentic Guarantee</h3>
                <p className="text-muted-foreground">100% authentic products guaranteed</p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-card">
              <CardContent className="p-6">
                <Headphones className="h-12 w-12 mx-auto mb-4 text-accent" />
                <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
                <p className="text-muted-foreground">Customer support whenever you need it</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Collection</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked favorites from our premium sneaker collection. Each pair crafted for performance and style.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleQuickAdd}
              />
            ))}
          </div>

          <div className="text-center">
            <Link to="/products">
              <Button size="lg" variant="outline" className="text-lg px-8">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Collection Showcase */}
      <section className="py-20 bg-brand-gray-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Curated for
                <span className="block text-accent">Every Step</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                From street style to athletic performance, our collection features the finest materials 
                and cutting-edge design. Each sneaker tells a story of craftsmanship and innovation.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-accent" />
                  <span>Premium materials and construction</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-accent" />
                  <span>Limited edition collaborations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-accent" />
                  <span>Sustainable and ethical production</span>
                </div>
              </div>
              <Button size="lg" className="bg-brand-black text-white hover:bg-brand-gray-dark">
                Explore Collections
              </Button>
            </div>
            
            <div className="relative">
              <img 
                src={collectionImage} 
                alt="Sneaker Collection" 
                className="w-full rounded-lg shadow-product"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Be the first to know about new drops, exclusive releases, and special offers.
          </p>
          <div className="max-w-md mx-auto flex space-x-4">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold"
            />
            <Button className="bg-brand-gold text-brand-black hover:bg-brand-gold-light px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;