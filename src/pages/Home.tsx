import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import { useStore, ProductColor } from '@/lib/store';
import { TextRotate } from '@/components/ui/text-rotate';
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';
import { StaggerTestimonials } from '@/components/ui/stagger-testimonials';
import { motion } from 'framer-motion';
import RecentlyViewed from '@/components/RecentlyViewed';
import Footer from '@/components/Footer';
import heroImage from '@/assets/hero-sneaker.jpg';
// Video will be added when available
import collectionImage from '@/assets/collection-banner.jpg';
import SocialMediaFeed from '@/components/SocialMediaFeed';
import KPISlider from '@/components/KPISlider';

const Home = () => {
  const { products, addToCart } = useStore();
  const featuredProducts = products.filter(product => product.featured);

  const handleQuickAdd = (product: any, size?: string, color?: ProductColor) => {
    console.log('handleQuickAdd called with:', { product, size, color });
    
    // Comprehensive validation
    if (!product) {
      console.error('handleQuickAdd: No product provided');
      return;
    }
    
    if (!product.sizes || !Array.isArray(product.sizes) || product.sizes.length === 0) {
      console.error('handleQuickAdd: Invalid sizes array:', product);
      return;
    }
    
    if (!product.colors || !Array.isArray(product.colors) || product.colors.length === 0) {
      console.error('handleQuickAdd: Invalid colors array:', product);
      return;
    }
    
    const selectedSize = size || product.sizes[0];
    const selectedColor = color || product.colors[0];
    
    if (!selectedSize || !selectedColor) {
      console.error('handleQuickAdd: Could not determine size or color', { selectedSize, selectedColor });
      return;
    }
    
    addToCart(product, selectedSize, selectedColor);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster={heroImage}
        >
          <source src="https://cdn.midjourney.com/video/bf15390a-b9ef-41ff-b8ba-b55ea176ae31/0.mp4" type="video/mp4" />
          {/* Fallback image if video fails to load */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
        </video>
        
        {/* Gray overlay for text readability */}
        <div className="absolute inset-0 bg-gray-900/50" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="block">STEP INTO</span>
            <TextRotate
              texts={[
                "EXCELLENCE",
                "GREATNESS", 
                "LUXURY",
                "STYLE",
                "COMFORT",
                "PERFECTION"
              ]}
              mainClassName="inline-flex bg-brand-gold text-brand-black px-4 py-2 rounded-lg overflow-hidden justify-center items-center text-center min-w-fit"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={3000}
            />
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
            <Button variant="outline" size="lg" className="border-white text-brand-black hover:bg-white hover:text-brand-black text-lg px-8">
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

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto">
          <StaggerTestimonials />
        </div>
      </section>

      {/* Social Media Feed */}
      <SocialMediaFeed />

      {/* Newsletter */}
      <section className="py-20 gradient-hero text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-brand-gold rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mb-8">
            <TypewriterEffectSmooth 
              words={[
                { text: "Stay" },
                { text: "in" },
                { text: "the" },
                { text: "Loop", className: "text-brand-gold" }
              ]}
              className="justify-center mb-6"
              cursorClassName="bg-brand-gold"
            />
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.5 }}
            className="text-lg md:text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Be the first to know about new drops, exclusive releases, and special offers. 
            Join our community of sneaker enthusiasts.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3 }}
            className="max-w-xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 w-full sm:w-auto px-6 py-4 bg-transparent text-white placeholder:text-gray-300 focus:outline-none text-lg border-none"
              />
              <Button className="bg-brand-gold text-brand-black hover:bg-brand-gold-light px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-brand-gold/25 whitespace-nowrap">
                Subscribe
              </Button>
            </div>
            
            <p className="text-sm text-gray-400 mt-4 text-center">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* KPI Slider */}
      <KPISlider />
    </div>
  );
};

export default Home;