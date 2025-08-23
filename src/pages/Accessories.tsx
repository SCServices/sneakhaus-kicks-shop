import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
export default function Accessories() {
  const {
    getAccessories,
    resetStore
  } = useStore();
  const accessories = getAccessories();

  // Debug logging
  console.log('Accessories found:', accessories.length);
  console.log('Accessories data:', accessories);

  // Temporary debug button to reset store if needed
  const handleResetStore = () => {
    resetStore();
    window.location.reload();
  };
  return <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        

        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          
        </Button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Accessories</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Complete your look with premium shoe care products and performance accessories
          </p>
        </div>

        {/* Products Grid */}
        {accessories.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {accessories.map(product => <ProductCard key={product.id} product={product} />)}
          </div> : <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No accessories available at the moment.</p>
            <Button asChild className="mt-4">
              <Link to="/">Browse All Products</Link>
            </Button>
            {/* Temporary debug button */}
            <Button onClick={handleResetStore} variant="outline" className="ml-4">
              Reset Store (Debug)
            </Button>
          </div>}
      </div>
    </div>;
}