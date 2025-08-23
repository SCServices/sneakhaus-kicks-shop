import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import { Badge } from '@/components/ui/badge';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState(useStore.getState().searchProducts(query));
  const searchProducts = useStore(state => state.searchProducts);
  const setSearchQuery = useStore(state => state.setSearchQuery);

  useEffect(() => {
    setSearchQuery(query);
    setResults(searchProducts(query));
  }, [query, searchProducts, setSearchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="max-w-2xl mx-auto mb-6">
            <SearchBar autoFocus />
          </div>
          
          {query && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-foreground">Search Results</h1>
                <Badge variant="secondary">
                  {results.length} found
                </Badge>
              </div>
              <p className="text-muted-foreground">
                Showing results for "{query}"
              </p>
            </div>
          )}
        </div>

        {/* Results */}
        {query ? (
          <div>
            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">
                  No products found for "{query}"
                </p>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search terms or browse our categories
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              Enter a search term to find your perfect shoes
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;