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
import { Progress } from '../components/ui/progress';
import { useToast } from '../hooks/use-toast';
import { ArrowLeft, CreditCard, Truck, Shield, Check } from 'lucide-react';

const steps = [
  { id: 1, title: 'Cart Review', completed: true },
  { id: 2, title: 'Shipping Info', completed: false },
  { id: 3, title: 'Payment', completed: false },
  { id: 4, title: 'Confirmation', completed: false }
];

export default function Checkout() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cart, cartTotal, checkoutStep, setCheckoutStep, createOrder } = useStore();
  const [currentStep, setCurrentStep] = useState(checkoutStep || 2);
  
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

  const subtotal = cartTotal();
  const shipping = subtotal >= 200 ? 0 : 15;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = subtotal + shipping + tax;

  const progress = (currentStep / 4) * 100;

  const handleInputChange = (field: string, value: string) => {
    setShippingInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateShippingForm = () => {
    const required = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode'];
    return required.every(field => shippingInfo[field].trim() !== '');
  };

  const handleNextStep = () => {
    if (currentStep === 2 && !validateShippingForm()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required shipping fields.",
        variant: "destructive"
      });
      return;
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
                <div className="grid grid-cols-2 gap-4">
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
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={shippingInfo.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      placeholder="NY"
                    />
                  </div>
                  <div>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md mx-4 p-6">
            <h3 className="text-lg font-semibold mb-4">Complete Your Look</h3>
            <p className="text-muted-foreground mb-4">
              Don't forget these popular accessories to go with your order!
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Premium Shoe Care Kit</p>
                  <p className="text-sm text-muted-foreground">Keep your sneakers fresh</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$24.99</p>
                  <p className="text-xs text-muted-foreground line-through">$34.99</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Athletic Socks (3-Pack)</p>
                  <p className="text-sm text-muted-foreground">Moisture-wicking comfort</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$19.99</p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button variant="outline" onClick={completeOrder} className="flex-1">
                No Thanks
              </Button>
              <Button onClick={completeOrder} className="flex-1">
                Add & Complete
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}