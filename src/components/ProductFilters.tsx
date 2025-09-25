import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  gender: string[];
}

// Category-specific size mappings
const CATEGORY_SIZES = {
  'Athletic': ['7', '8', '9', '10', '11', '12', '13'],
  'Casual': ['5', '6', '7', '8', '9', '10', '11', '12'],
  'Basketball': ['8', '9', '10', '11', '12', '13', '14'],
  'Running': ['5', '6', '7', '8', '9', '10', '11'],
  'Fashion': ['5', '6', '7', '8', '9', '10', '11'],
  'Accessories': ['One Size', 'S', 'M', 'L', 'XL', '250ml', '6-7', '8-9', '10-11', '12-13']
};

// Color name to hex mapping
const COLOR_MAP: { [key: string]: string } = {
  'White': '#FFFFFF',
  'Black': '#000000',
  'Gray': '#6B7280',
  'Red': '#DC2626',
  'Pink': '#EC4899',
  'Navy': '#1E3A8A',
  'Blue': '#2563EB',
  'Beige': '#D2B48C',
  'Cream': '#F5F5DC',
  'Lavender': '#E6E6FA',
  'Purple': '#9333EA',
  'Gold': '#F59E0B',
  'Clear': '#F3F4F6',
  'Natural': '#8B4513',
  'Mixed': '#6B7280'
};

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableCategories: string[];
  availableSizes: string[];
  availableColors: string[];
  priceRange: [number, number];
  className?: string;
}

export default function ProductFilters({
  filters,
  onFiltersChange,
  availableCategories,
  availableSizes,
  availableColors,
  priceRange,
  className = ""
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSizeCategory, setSelectedSizeCategory] = useState<string>('');
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    size: true,
    color: true,
    gender: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateFilters = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: 'categories' | 'sizes' | 'colors' | 'gender', value: string) => {
    const currentArray = filters[key];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilters(key, newArray);
  };

  // Get available sizes based on selected category
  const getAvailableSizesForCategory = (category: string): string[] => {
    return CATEGORY_SIZES[category as keyof typeof CATEGORY_SIZES] || [];
  };

  const getCurrentSizes = (): string[] => {
    if (selectedSizeCategory) {
      return getAvailableSizesForCategory(selectedSizeCategory);
    }
    return availableSizes;
  };

  const getColorHex = (colorName: string): string => {
    // Extract the main color from compound names like "White/Gray" or "Black/Gold"
    const mainColor = colorName.split('/')[0].split(' ')[0];
    return COLOR_MAP[mainColor] || COLOR_MAP['Gray'];
  };

  const clearAllFilters = () => {
    setSelectedSizeCategory('');
    onFiltersChange({
      categories: [],
      priceRange: priceRange,
      sizes: [],
      colors: [],
      gender: []
    });
  };

  const hasActiveFilters = 
    filters.categories.length > 0 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.gender.length > 0 ||
    filters.priceRange[0] !== priceRange[0] ||
    filters.priceRange[1] !== priceRange[1];

  const activeFiltersCount = 
    filters.categories.length +
    filters.sizes.length + 
    filters.colors.length +
    filters.gender.length +
    (filters.priceRange[0] !== priceRange[0] || filters.priceRange[1] !== priceRange[1] ? 1 : 0);

  return (
    <div className={`bg-card rounded-lg border shadow-sm ${className}`}>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4"
        >
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="h-5">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        
        {isOpen && (
          <div className="p-4 border-t">
            <FilterContent />
          </div>
        )}
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <h3 className="font-semibold text-lg">Filters</h3>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
          )}
        </div>
        <FilterContent />
      </div>
    </div>
  );

  function FilterContent() {
    return (
      <div className="space-y-6">
        {/* Category Filter */}
        <Collapsible open={openSections.category} onOpenChange={() => toggleSection('category')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <Label className="font-medium cursor-pointer">Category</Label>
            {openSections.category ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3">
            {availableCategories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={() => toggleArrayFilter('categories', category)}
                />
                <Label htmlFor={`category-${category}`} className="cursor-pointer flex-1">
                  {category}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Gender Filter */}
        <Collapsible open={openSections.gender} onOpenChange={() => toggleSection('gender')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <Label className="font-medium cursor-pointer">Gender</Label>
            {openSections.gender ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3">
            {['men', 'women', 'unisex'].map((gender) => (
              <div key={gender} className="flex items-center space-x-2">
                <Checkbox
                  id={`gender-${gender}`}
                  checked={filters.gender.includes(gender)}
                  onCheckedChange={() => toggleArrayFilter('gender', gender)}
                />
                <Label htmlFor={`gender-${gender}`} className="cursor-pointer flex-1 capitalize">
                  {gender}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Price Range Filter */}
        <Collapsible open={openSections.price} onOpenChange={() => toggleSection('price')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <Label className="font-medium cursor-pointer">Price Range</Label>
            {openSections.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-3">
            <div className="px-2">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => updateFilters('priceRange', value as [number, number])}
                max={priceRange[1]}
                min={priceRange[0]}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Size Filter */}
        <Collapsible open={openSections.size} onOpenChange={() => toggleSection('size')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <Label className="font-medium cursor-pointer">Size</Label>
            {openSections.size ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3 space-y-4">
            {/* Category Selection for Sizes */}
            <div>
              <Label className="text-sm text-muted-foreground mb-2 block">Product Type</Label>
              <Select value={selectedSizeCategory} onValueChange={setSelectedSizeCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select product type for sizes..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Products</SelectItem>
                  {Object.keys(CATEGORY_SIZES).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Size Buttons */}
            <div className="grid grid-cols-4 gap-2">
              {getCurrentSizes().map((size) => (
                <Button
                  key={size}
                  variant={filters.sizes.includes(size) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleArrayFilter('sizes', size)}
                  className="h-10 text-xs"
                >
                  {size}
                </Button>
              ))}
            </div>
            
            {selectedSizeCategory && (
              <p className="text-xs text-muted-foreground">
                Showing sizes for {selectedSizeCategory} products
              </p>
            )}
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Color Filter */}
        <Collapsible open={openSections.color} onOpenChange={() => toggleSection('color')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <Label className="font-medium cursor-pointer">Color</Label>
            {openSections.color ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <div className="space-y-2">
              {availableColors.map((color) => (
                <div
                  key={color}
                  className={`flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-muted/50 transition-colors ${
                    filters.colors.includes(color) ? 'bg-muted border border-primary' : 'border border-transparent'
                  }`}
                  onClick={() => toggleArrayFilter('colors', color)}
                >
                  {/* Color Circle */}
                  <div
                    className="w-6 h-6 rounded-full border-2 border-muted-foreground/20 flex-shrink-0"
                    style={{ backgroundColor: getColorHex(color) }}
                  />
                  
                  {/* Color Name */}
                  <span className="text-sm flex-1">{color}</span>
                  
                  {/* Checkbox */}
                  <Checkbox
                    checked={filters.colors.includes(color)}
                    onChange={() => toggleArrayFilter('colors', color)}
                    className="pointer-events-none"
                  />
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between mb-3">
              <Label className="font-medium text-sm">Active Filters</Label>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.categories.map((category) => (
                <Badge key={category} variant="secondary" className="flex items-center gap-1">
                  {category}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => toggleArrayFilter('categories', category)}
                  />
                </Badge>
              ))}
              {filters.gender.map((gender) => (
                <Badge key={gender} variant="secondary" className="flex items-center gap-1 capitalize">
                  {gender}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => toggleArrayFilter('gender', gender)}
                  />
                </Badge>
              ))}
              {filters.sizes.map((size) => (
                <Badge key={size} variant="secondary" className="flex items-center gap-1">
                  Size {size}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => toggleArrayFilter('sizes', size)}
                  />
                </Badge>
              ))}
              {filters.colors.map((color) => (
                <Badge key={color} variant="secondary" className="flex items-center gap-1">
                  {color}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => toggleArrayFilter('colors', color)}
                  />
                </Badge>
              ))}
              {(filters.priceRange[0] !== priceRange[0] || filters.priceRange[1] !== priceRange[1]) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => updateFilters('priceRange', priceRange)}
                  />
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}