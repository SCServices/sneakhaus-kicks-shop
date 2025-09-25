import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import ProductCard from '../components/ProductCard';
import ProductFilters, { FilterState } from '../components/ProductFilters';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function Accessories() {
  const {
    getAccessories,
    resetStore,
    filters,
    setFilters,
    getFilteredProducts,
    getAvailableCategories,
    getAvailableSizes, 
    getAvailableColors,
    getPriceRange
  } = useStore();
  
  const accessories = useMemo(() => 
    getAccessories(), 
    [getAccessories]
  );

  const filteredProducts = useMemo(() => 
    getFilteredProducts(accessories), 
    [getFilteredProducts, accessories, filters]
  );

  const availableCategories = useMemo(() => 
    getAvailableCategories(accessories), 
    [getAvailableCategories, accessories]
  );
  
  const availableSizes = useMemo(() => 
    getAvailableSizes(accessories), 
    [getAvailableSizes, accessories]
  );
  
  const availableColors = useMemo(() => 
    getAvailableColors(accessories), 
    [getAvailableColors, accessories]
  );
  
  const priceRange = useMemo(() => 
    getPriceRange(accessories), 
    [getPriceRange, accessories]
  );

  // Debug logging
  console.log('Accessories found:', accessories.length);
  console.log('Accessories data:', accessories);

  // Temporary debug button to reset store if needed
  const handleResetStore = () => {
    resetStore();
    window.location.reload();
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 py-8">
      <div className="container mx-auto px-4">
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

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <ProductFilters
              filters={filters}
              onFiltersChange={setFilters}
              availableCategories={availableCategories}
              availableSizes={availableSizes}
              availableColors={availableColors}
              priceRange={priceRange}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} of {accessories.length} accessories
              </p>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : accessories.length > 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">No accessories match your current filters.</p>
                <p className="text-sm text-muted-foreground">Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">No accessories available at the moment.</p>
                <Button asChild className="mt-4">
                  <Link to="/">Browse All Products</Link>
                </Button>
                {/* Temporary debug button */}
                <Button onClick={handleResetStore} variant="outline" className="ml-4">
                  Reset Store (Debug)
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}