import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';
import ProductFilters, { FilterState } from '@/components/ProductFilters';
import { Badge } from '@/components/ui/badge';
import { useState, useMemo } from 'react';

const NewArrivals = () => {
  const { 
    getNewArrivals,
    filters,
    setFilters,
    getFilteredProducts,
    getAvailableCategories,
    getAvailableSizes, 
    getAvailableColors,
    getPriceRange
  } = useStore();
  
  const newProducts = useMemo(() => 
    getNewArrivals(), 
    [getNewArrivals]
  );

  const filteredProducts = useMemo(() => 
    getFilteredProducts(newProducts), 
    [getFilteredProducts, newProducts, filters]
  );

  const availableCategories = useMemo(() => 
    getAvailableCategories(newProducts), 
    [getAvailableCategories, newProducts]
  );
  
  const availableSizes = useMemo(() => 
    getAvailableSizes(newProducts), 
    [getAvailableSizes, newProducts]
  );
  
  const availableColors = useMemo(() => 
    getAvailableColors(newProducts), 
    [getAvailableColors, newProducts]
  );
  
  const priceRange = useMemo(() => 
    getPriceRange(newProducts), 
    [getPriceRange, newProducts]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl font-bold text-foreground">New Arrivals</h1>
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              Fresh
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Be the first to experience our latest innovations in footwear technology and design.
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
                Showing {filteredProducts.length} of {newProducts.length} new arrivals
              </p>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">No new arrivals match your current filters.</p>
                <p className="text-sm text-muted-foreground">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;