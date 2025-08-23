import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../lib/store';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { Checkbox } from '../components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Progress } from '../components/ui/progress';
import { useToast } from '../hooks/use-toast';
import { ArrowLeft, CreditCard, Truck, Shield, Check, Minus, Plus } from 'lucide-react';

const steps = [
  { id: 1, title: 'Cart Review', completed: true },
  { id: 2, title: 'Shipping Info', completed: false },
  { id: 3, title: 'Payment', completed: false },
  { id: 4, title: 'Confirmation', completed: false }
];

export default function Checkout() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cart, cartTotal, checkoutStep, setCheckoutStep, createOrder, getUpsellProducts, addToCart } = useStore();
  const [currentStep, setCurrentStep] = useState(checkoutStep || 2);
  const [selectedUpsells, setSelectedUpsells] = useState<{[key: string]: {selected: boolean, quantity: number, size: string}}>({});
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [showUpsell, setShowUpsell] = useState(false);
  const [showFinalConfirmation, setShowFinalConfirmation] = useState(false);

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    billingZip: '',
    sameAsShipping: true
  });

  const [billingAddress, setBillingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const subtotal = cartTotal();
  const shipping = subtotal >= 200 ? 0 : 15;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = subtotal + shipping + tax;

  const progress = (currentStep / 4) * 100;

  const handleInputChange = (field: string, value: string) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field: string, value: string | boolean) => {
    setPaymentInfo(prev => ({ ...prev, [field]: value }));
    
    // Auto-fill billing address when sameAsShipping is toggled
    if (field === 'sameAsShipping' && value === true) {
      setBillingAddress({
        firstName: shippingInfo.firstName,
        lastName: shippingInfo.lastName,
        address: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        zipCode: shippingInfo.zipCode,
        country: shippingInfo.country
      });
    }
  };

  const handleBillingChange = (field: string, value: string) => {
    setBillingAddress(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-numeric characters and limit to 16 digits
    const numericValue = value.replace(/\D/g, '').slice(0, 16);
    // Add spaces every 4 digits
    return numericValue.replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatCvv = (value: string) => {
    // Remove all non-numeric characters and limit to 4 digits
    return value.replace(/\D/g, '').slice(0, 4);
  };

  const validateShippingForm = () => {
    const required = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode'];
    return required.every(field => shippingInfo[field as keyof typeof shippingInfo].trim() !== '');
  };

  const handleNextStep = () => {
    // Validate shipping info for step 2
    if (currentStep === 2 && !validateShippingForm()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required shipping fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate payment info for step 3
    if (currentStep === 3 && paymentMethod === 'credit-card') {
      if (!paymentInfo.cardholderName || !paymentInfo.cardNumber || 
          !paymentInfo.expiryMonth || !paymentInfo.expiryYear || !paymentInfo.cvv) {
        toast({
          title: "Missing Payment Information",
          description: "Please fill in all required payment fields.",
          variant: "destructive"
        });
        return;
      }
      
      // Validate card number (remove spaces and check length)
      const cleanCardNumber = paymentInfo.cardNumber.replace(/\s/g, '');
      if (cleanCardNumber.length < 13 || cleanCardNumber.length > 16) {
        toast({
          title: "Invalid Card Number",
          description: "Please enter a valid card number.",
          variant: "destructive"
        });
        return;
      }
      
      // Validate CVV
      if (paymentInfo.cvv.length < 3) {
        toast({
          title: "Invalid CVV",
          description: "Please enter a valid CVV code.",
          variant: "destructive"
        });
        return;
      }
      
      // Validate billing address if different from shipping
      if (!paymentInfo.sameAsShipping) {
        if (!billingAddress.firstName || !billingAddress.lastName || 
            !billingAddress.address || !billingAddress.city || 
            !billingAddress.state || !billingAddress.zipCode) {
          toast({
            title: "Missing Billing Information",
            description: "Please fill in all required billing address fields.",
            variant: "destructive"
          });
          return;
        }
      }
    }
    
    if (currentStep === 3) {
      // Show upsell modal before completing order
      setShowUpsell(true);
      return;
    }
    
    setCurrentStep(prev => prev + 1);
    setCheckoutStep(currentStep + 1);
  };

  const completeOrder = () => {
    try {
      const orderId = createOrder(shippingInfo, paymentMethod);
      toast({
        title: "Order Placed Successfully!",
        description: `Your order ${orderId} has been confirmed.`,
      });
      navigate(`/order-confirmation/${orderId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  const upsellProducts = getUpsellProducts();

  const toggleUpsellSelection = (productId: string, defaultSize: string) => {
    setSelectedUpsells(prev => ({
      ...prev,
      [productId]: prev[productId] 
        ? { ...prev[productId], selected: !prev[productId].selected }
        : { selected: true, quantity: 1, size: defaultSize }
    }));
  };

  const updateUpsellQuantity = (productId: string, quantity: number) => {
    setSelectedUpsells(prev => ({
      ...prev,
      [productId]: prev[productId] 
        ? { ...prev[productId], quantity: Math.max(1, quantity) }
        : { selected: true, quantity: Math.max(1, quantity), size: 'One Size' }
    }));
  };

  const getUpsellTotal = () => {
    return Object.entries(selectedUpsells).reduce((total, [productId, selection]) => {
      if (selection.selected) {
        const product = upsellProducts.find(p => p.id === productId);
        return total + (product?.price || 0) * selection.quantity;
      }
      return total;
    }, 0);
  };

  const handleUpsellComplete = () => {
    // Add selected upsells to cart
    Object.entries(selectedUpsells).forEach(([productId, selection]) => {
      if (selection.selected) {
        const product = upsellProducts.find(p => p.id === productId);
        if (product) {
          for (let i = 0; i < selection.quantity; i++) {
            addToCart(product, selection.size, product.colors[0]);
          }
        }
      }
    });

    // Close upsell modal and show final confirmation
    setShowUpsell(false);
    setShowFinalConfirmation(true);
  };

  const handleFinalOrderComplete = () => {
    // Create order with updated cart (including upsells)
    try {
      const orderId = createOrder(shippingInfo, paymentMethod);
      toast({
        title: "Order Placed Successfully!",
        description: `Your order ${orderId} has been confirmed.`,
      });
      navigate(`/order-confirmation/${orderId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add some products to your cart to proceed with checkout.</p>
            <Button asChild className="w-full">
              <Link to="/">Continue Shopping</Link>
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center ${
                  step.id <= currentStep ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    step.id < currentStep
                      ? 'bg-primary border-primary text-primary-foreground'
                      : step.id === currentStep
                      ? 'border-primary text-primary'
                      : 'border-muted text-muted-foreground'
                  }`}
                >
                  {step.id < currentStep ? <Check className="h-4 w-4" /> : step.id}
                </div>
                <span className="ml-2 text-sm font-medium hidden sm:block">{step.title}</span>
              </div>
            ))}
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Main Content */}
          <div className="space-y-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/cart')}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Button>

            {currentStep === 2 && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={shippingInfo.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={shippingInfo.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Doe"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={shippingInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={shippingInfo.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="New York"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={shippingInfo.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      placeholder="NY"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      placeholder="10001"
                    />
                  </div>
                </div>
              </Card>
            )}

            {currentStep === 3 && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center cursor-pointer flex-1">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Credit Card
                    </Label>
                    <Badge variant="outline">Demo</Badge>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex items-center cursor-pointer flex-1">
                      PayPal
                    </Label>
                    <Badge variant="outline">Demo</Badge>
                  </div>
                </RadioGroup>
                
                {/* Credit Card Form */}
                {paymentMethod === 'credit-card' && (
                  <div className="mt-6 space-y-4">
                    <Separator />
                    <h3 className="text-lg font-medium">Card Information</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <Label htmlFor="cardholderName">Cardholder Name *</Label>
                        <Input
                          id="cardholderName"
                          value={paymentInfo.cardholderName}
                          onChange={(e) => handlePaymentChange('cardholderName', e.target.value)}
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div className="sm:col-span-2">
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          value={paymentInfo.cardNumber}
                          onChange={(e) => handlePaymentChange('cardNumber', formatCardNumber(e.target.value))}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19} // 16 digits + 3 spaces
                        />
                      </div>
                      
                      <div className="sm:col-span-1">
                        <Label>Expiry Date *</Label>
                        <div className="flex space-x-2">
                          <Select value={paymentInfo.expiryMonth} onValueChange={(value) => handlePaymentChange('expiryMonth', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="MM" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 12 }, (_, i) => {
                                const month = (i + 1).toString().padStart(2, '0');
                                return (
                                  <SelectItem key={month} value={month}>
                                    {month}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          <Select value={paymentInfo.expiryYear} onValueChange={(value) => handlePaymentChange('expiryYear', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="YYYY" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 10 }, (_, i) => {
                                const year = (new Date().getFullYear() + i).toString();
                                return (
                                  <SelectItem key={year} value={year}>
                                    {year}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="sm:col-span-1">
                        <Label htmlFor="cvv">CVV *</Label>
                        <Input
                          id="cvv"
                          className="max-w-[100px]"
                          value={paymentInfo.cvv}
                          onChange={(e) => handlePaymentChange('cvv', formatCvv(e.target.value))}
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    <h3 className="text-lg font-medium">Billing Address</h3>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sameAsShipping"
                        checked={paymentInfo.sameAsShipping}
                        onCheckedChange={(checked) => handlePaymentChange('sameAsShipping', checked)}
                      />
                      <Label htmlFor="sameAsShipping" className="text-sm cursor-pointer">
                        Same as shipping address
                      </Label>
                    </div>
                    
                      {!paymentInfo.sameAsShipping && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="billingFirstName">First Name *</Label>
                          <Input
                            id="billingFirstName"
                            value={billingAddress.firstName}
                            onChange={(e) => handleBillingChange('firstName', e.target.value)}
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <Label htmlFor="billingLastName">Last Name *</Label>
                          <Input
                            id="billingLastName"
                            value={billingAddress.lastName}
                            onChange={(e) => handleBillingChange('lastName', e.target.value)}
                            placeholder="Doe"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <Label htmlFor="billingAddress">Address *</Label>
                          <Input
                            id="billingAddress"
                            value={billingAddress.address}
                            onChange={(e) => handleBillingChange('address', e.target.value)}
                            placeholder="123 Main Street"
                          />
                        </div>
                        <div>
                          <Label htmlFor="billingCity">City *</Label>
                          <Input
                            id="billingCity"
                            value={billingAddress.city}
                            onChange={(e) => handleBillingChange('city', e.target.value)}
                            placeholder="New York"
                          />
                        </div>
                        <div>
                          <Label htmlFor="billingState">State *</Label>
                          <Input
                            id="billingState"
                            value={billingAddress.state}
                            onChange={(e) => handleBillingChange('state', e.target.value)}
                            placeholder="NY"
                          />
                        </div>
                        <div>
                          <Label htmlFor="billingZip">ZIP Code *</Label>
                          <Input
                            id="billingZip"
                            value={billingAddress.zipCode}
                            onChange={(e) => handleBillingChange('zipCode', e.target.value)}
                            placeholder="10001"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Shield className="mr-2 h-4 w-4" />
                    This is a demo checkout. No real payment will be processed.
                  </div>
                </div>
              </Card>
            )}

            <div className="flex justify-between">
              {currentStep > 2 && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                >
                  Back
                </Button>
              )}
              <Button
                onClick={handleNextStep}
                className={currentStep === 2 ? 'w-full' : 'ml-auto'}
              >
                {currentStep === 3 ? 'Complete Order' : 'Continue'}
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor.name}`} className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={item.selectedColorImage}
                        alt={`${item.name} - ${item.selectedColor.name}`}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Size: {item.selectedSize} • {item.selectedColor.name}
                      </p>
                    </div>
                    <p className="text-sm font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center">
                    <Truck className="mr-1 h-3 w-3" />
                    Shipping
                  </span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {subtotal < 200 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Add ${(200 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Upsell Modal */}
      {showUpsell && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <h3 className="text-xl font-semibold mb-2">Complete Your Look</h3>
            <p className="text-muted-foreground mb-6">
              Add these popular accessories to your order and save!
            </p>
            
            <div className="space-y-4 mb-6">
              {upsellProducts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No accessories available at the moment.</p>
                </div>
              ) : (
                upsellProducts.map((product) => {
                  const isSelected = selectedUpsells[product.id]?.selected || false;
                  const quantity = selectedUpsells[product.id]?.quantity || 1;
                  const defaultSize = product.sizes[0];
                  
                  console.log('Rendering product:', product.name, 'Image:', product.image);
                  
                   return (
                     <div 
                       key={product.id} 
                       className={`border rounded-lg p-4 transition-all ${
                         isSelected ? 'border-primary bg-primary/5' : 'border-muted'
                       }`}
                     >
                       <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                         <div className="flex items-center space-x-3 w-full sm:w-auto">
                           {/* Checkbox */}
                           <div className="pt-1">
                             <Checkbox
                               id={`upsell-${product.id}`}
                               checked={isSelected}
                               onCheckedChange={() => toggleUpsellSelection(product.id, defaultSize)}
                             />
                           </div>
                           
                           {/* Product Image */}
                           <div className="w-20 h-20 bg-brand-gray-light rounded-lg overflow-hidden flex-shrink-0">
                             <img
                               src={product.image}
                               alt={product.name}
                               className="w-full h-full object-cover"
                               onError={(e) => {
                                 console.error('Failed to load image:', product.image);
                                 e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMyIgeT0iMyIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiByeD0iMiIgZmlsbD0iI2Y1ZjVmNSIvPgo8L3N2Zz4K';
                               }}
                             />
                           </div>
                           
                           {/* Product Info - Mobile/Tablet */}
                           <div className="sm:hidden flex-1">
                             <h4 className="font-semibold text-base">{product.name}</h4>
                             <div className="flex items-center justify-between mt-1">
                               <div>
                                 {product.originalPrice && (
                                   <p className="text-xs text-muted-foreground line-through">
                                     ${product.originalPrice.toFixed(2)}
                                   </p>
                                 )}
                                 <p className="font-semibold">${product.price.toFixed(2)}</p>
                               </div>
                               {product.isOnSale && (
                                 <Badge variant="destructive" className="text-xs">
                                   Sale
                                 </Badge>
                               )}
                             </div>
                           </div>
                         </div>
                       
                         {/* Product Details - Desktop */}
                         <div className="hidden sm:block flex-1 space-y-2">
                           <div>
                             <h4 className="font-semibold text-lg">{product.name}</h4>
                             <p className="text-sm text-muted-foreground">{product.description}</p>
                           </div>
                           
                           <div className="flex items-center space-x-4">
                             <div className="text-right">
                               {product.originalPrice && (
                                 <p className="text-xs text-muted-foreground line-through">
                                   ${product.originalPrice.toFixed(2)}
                                 </p>
                               )}
                               <p className="font-semibold text-lg">${product.price.toFixed(2)}</p>
                             </div>
                             
                             {product.isOnSale && (
                               <Badge variant="destructive" className="text-xs">
                                 Sale
                               </Badge>
                             )}
                           </div>
                         </div>
                       </div>
                       
                       {/* Description - Mobile Only */}
                       <div className="sm:hidden mt-2">
                         <p className="text-sm text-muted-foreground">{product.description}</p>
                       </div>
                         
                       {/* Quantity Controls */}
                       {isSelected && (
                         <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mt-3">
                           <span className="text-sm text-muted-foreground">Qty:</span>
                           <div className="flex items-center justify-between">
                             <div className="flex items-center border rounded">
                               <Button
                                 variant="ghost"
                                 size="icon"
                                 className="h-8 w-8"
                                 onClick={() => updateUpsellQuantity(product.id, quantity - 1)}
                                 disabled={quantity <= 1}
                               >
                                 <Minus className="h-3 w-3" />
                               </Button>
                               <span className="px-3 text-sm font-medium">{quantity}</span>
                               <Button
                                 variant="ghost"
                                 size="icon"
                                 className="h-8 w-8"
                                 onClick={() => updateUpsellQuantity(product.id, quantity + 1)}
                               >
                                 <Plus className="h-3 w-3" />
                               </Button>
                             </div>
                             <span className="text-sm text-muted-foreground sm:ml-auto">
                               Subtotal: ${(product.price * quantity).toFixed(2)}
                             </span>
                           </div>
                         </div>
                       )}
                     </div>
                   );
              })
              )}
            </div>
            
            {/* Summary and Actions */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Accessories Total:</span>
                <span className="text-xl font-bold">${getUpsellTotal().toFixed(2)}</span>
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  onClick={completeOrder} 
                  className="flex-1"
                >
                  No Thanks
                </Button>
                 <Button 
                   onClick={handleUpsellComplete} 
                   className="flex-1"
                   disabled={Object.values(selectedUpsells).every(selection => !selection.selected)}
                 >
                   Add to Order ({Object.values(selectedUpsells).filter(s => s.selected).length} items)
                 </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Final Order Confirmation Modal */}
      {showFinalConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-lg w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Confirm Your Order</h3>
            <p className="text-muted-foreground mb-6">
              Please review your updated order total and confirm your purchase.
            </p>
            
            {/* Updated Order Summary */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span>Subtotal ({cart.length} items)</span>
                <span>${cartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="flex items-center">
                  <Truck className="mr-1 h-3 w-3" />
                  Shipping
                </span>
                <span>{cartTotal() >= 200 ? 'FREE' : '$15.00'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${(cartTotal() * 0.08).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${(cartTotal() + (cartTotal() >= 200 ? 0 : 15) + cartTotal() * 0.08).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setShowFinalConfirmation(false)}
                className="flex-1"
              >
                Back to Cart
              </Button>
              <Button 
                onClick={handleFinalOrderComplete} 
                className="flex-1"
              >
                Confirm & Pay Now
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}