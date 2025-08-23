import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function Accessories() {
  const { getAccessories } = useStore();
  const accessories = getAccessories();

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <span className="text-foreground">Accessories</span>
        </div>

        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Accessories</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Complete your look with premium shoe care products and performance accessories
          </p>
        </div>

        {/* Products Grid */}
        {accessories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {accessories.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No accessories available at the moment.</p>
            <Button asChild className="mt-4">
              <Link to="/">Browse All Products</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}