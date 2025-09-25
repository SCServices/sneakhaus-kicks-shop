import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';
import ProductFilters, { FilterState } from '@/components/ProductFilters';
import { Badge } from '@/components/ui/badge';
import { useState, useMemo } from 'react';

const Sale = () => {
  const { 
    getSaleProducts,
    filters,
    setFilters,
    getFilteredProducts,
    getAvailableCategories,
    getAvailableSizes, 
    getAvailableColors,
    getPriceRange
  } = useStore();
  
  const saleProducts = useMemo(() => 
    getSaleProducts(), 
    [getSaleProducts]
  );

  const filteredProducts = useMemo(() => 
    getFilteredProducts(saleProducts), 
    [getFilteredProducts, saleProducts, filters]
  );

  const availableCategories = useMemo(() => 
    getAvailableCategories(saleProducts), 
    [getAvailableCategories, saleProducts]
  );
  
  const availableSizes = useMemo(() => 
    getAvailableSizes(saleProducts), 
    [getAvailableSizes, saleProducts]
  );
  
  const availableColors = useMemo(() => 
    getAvailableColors(saleProducts), 
    [getAvailableColors, saleProducts]
  );
  
  const priceRange = useMemo(() => 
    getPriceRange(saleProducts), 
    [getPriceRange, saleProducts]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl font-bold text-foreground">Sale & Clearance</h1>
            <Badge variant="destructive" className="animate-pulse">
              Up to 50% Off
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't miss out on amazing deals! Limited time offers on premium footwear.
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
                Showing {filteredProducts.length} of {saleProducts.length} sale items
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
                <p className="text-muted-foreground text-lg mb-4">No sale items match your current filters.</p>
                <p className="text-sm text-muted-foreground">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sale;