import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';
import ProductFilters, { FilterState } from '@/components/ProductFilters';
import { useState, useMemo } from 'react';

const Women = () => {
  const { 
    getProductsByGender,
    filters,
    setFilters,
    getFilteredProducts,
    getAvailableCategories,
    getAvailableSizes, 
    getAvailableColors,
    getPriceRange
  } = useStore();
  
  const womenProducts = useMemo(() => 
    getProductsByGender('women'), 
    [getProductsByGender]
  );

  const filteredProducts = useMemo(() => 
    getFilteredProducts(womenProducts), 
    [getFilteredProducts, womenProducts, filters]
  );

  const availableCategories = useMemo(() => 
    getAvailableCategories(womenProducts), 
    [getAvailableCategories, womenProducts]
  );
  
  const availableSizes = useMemo(() => 
    getAvailableSizes(womenProducts), 
    [getAvailableSizes, womenProducts]
  );
  
  const availableColors = useMemo(() => 
    getAvailableColors(womenProducts), 
    [getAvailableColors, womenProducts]
  );
  
  const priceRange = useMemo(() => 
    getPriceRange(womenProducts), 
    [getPriceRange, womenProducts]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Women's Collection</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Elevate your style with our curated women's footwear collection, blending fashion and comfort.
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
                Showing {filteredProducts.length} of {womenProducts.length} women's products
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
                <p className="text-muted-foreground text-lg mb-4">No women's products match your current filters.</p>
                <p className="text-sm text-muted-foreground">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Women;