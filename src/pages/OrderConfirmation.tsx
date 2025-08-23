import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../lib/store';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';
import { 
  CheckCircle, 
  Package, 
  Truck, 
  MapPin, 
  Calendar,
  Mail,
  User,
  ArrowRight,
  Copy,
  Check
} from 'lucide-react';

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getOrderById, createUser, currentUser, loginUser } = useStore();
  
  const [order, setOrder] = useState(null);
  const [showAccountCreation, setShowAccountCreation] = useState(false);
  const [accountInfo, setAccountInfo] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (orderId) {
      const foundOrder = getOrderById(orderId);
      if (foundOrder) {
        setOrder(foundOrder);
        setAccountInfo({
          firstName: foundOrder.shippingInfo.firstName,
          lastName: foundOrder.shippingInfo.lastName,
          email: foundOrder.shippingInfo.email
        });
      } else {
        navigate('/');
      }
    }
  }, [orderId, getOrderById, navigate]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied!",
      description: "Order ID copied to clipboard",
    });
  };

  const handleCreateAccount = () => {
    if (accountInfo.firstName && accountInfo.lastName && accountInfo.email) {
      const user = createUser(accountInfo.email, accountInfo.firstName, accountInfo.lastName);
      loginUser(user);
      toast({
        title: "Account Created!",
        description: "You can now track your orders and view your history.",
      });
      setShowAccountCreation(false);
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to create your account.",
        variant: "destructive"
      });
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Order Not Found</h2>
          <p className="text-muted-foreground mb-6">The order you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="w-full">
            <Link to="/">Return Home</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <Card className="p-8 text-center mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-green-800 mb-2">Order Confirmed!</h1>
            <p className="text-green-700 mb-4">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
            
            <div className="flex items-center justify-center space-x-2 bg-white p-3 rounded-lg inline-flex">
              <span className="text-sm font-medium">Order ID:</span>
              <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{order.id}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(order.id)}
                className="h-6 w-6 p-0"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              </Button>
            </div>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Details */}
            <div className="space-y-6">
              {/* Order Items */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Package className="mr-2 h-5 w-5" />
                  Order Items
                </h2>
                
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}-${item.selectedColor.name}`} className="flex items-center space-x-4">
                      <img
                        src={item.selectedColorImage}
                        alt={`${item.name} - ${item.selectedColor.name}`}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Size: {item.selectedSize} • {item.selectedColor.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </Card>

              {/* Shipping Information */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  Shipping Address
                </h2>
                
                <div className="text-sm space-y-1">
                  <p className="font-medium">
                    {order.shippingInfo.firstName} {order.shippingInfo.lastName}
                  </p>
                  <p>{order.shippingInfo.address}</p>
                  <p>
                    {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}
                  </p>
                  <p>{order.shippingInfo.country}</p>
                  <p className="pt-2">{order.shippingInfo.email}</p>
                  {order.shippingInfo.phone && <p>{order.shippingInfo.phone}</p>}
                </div>
              </Card>
            </div>

            {/* Order Status & Account Creation */}
            <div className="space-y-6">
              {/* Order Status */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Truck className="mr-2 h-5 w-5" />
                  Order Status
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Status</span>
                    <Badge variant="secondary" className="capitalize">
                      {order.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>Tracking Number</span>
                    <span className="font-mono text-sm">{order.trackingNumber}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      Order Date
                    </span>
                    <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      Estimated Delivery
                    </span>
                    <span>{new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                  </div>
                </div>
              </Card>

              {/* Account Creation */}
              {!currentUser && (
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Create Account
                  </h2>
                  
                  {!showAccountCreation ? (
                    <div>
                      <p className="text-muted-foreground mb-4">
                        Create an account to easily track your orders and view your purchase history.
                      </p>
                      <Button 
                        onClick={() => setShowAccountCreation(true)}
                        className="w-full"
                      >
                        Create Account
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={accountInfo.firstName}
                          onChange={(e) => setAccountInfo(prev => ({...prev, firstName: e.target.value}))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={accountInfo.lastName}
                          onChange={(e) => setAccountInfo(prev => ({...prev, lastName: e.target.value}))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={accountInfo.email}
                          onChange={(e) => setAccountInfo(prev => ({...prev, email: e.target.value}))}
                        />
                      </div>
                      <div className="flex space-x-3">
                        <Button 
                          variant="outline" 
                          onClick={() => setShowAccountCreation(false)}
                          className="flex-1"
                        >
                          Skip
                        </Button>
                        <Button onClick={handleCreateAccount} className="flex-1">
                          Create Account
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              )}

              {/* Next Steps */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">What's Next?</h2>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Confirmation email sent to {order.shippingInfo.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">We'll process your order within 1-2 business days</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Tracking information will be provided once shipped</span>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/order-tracking">Track Order</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link to="/">Continue Shopping</Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}