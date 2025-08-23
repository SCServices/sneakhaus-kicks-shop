import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { 
  Search, 
  Package, 
  Truck, 
  MapPin, 
  Calendar,
  CheckCircle,
  Clock,
  Home
} from 'lucide-react';

export default function OrderTracking() {
  const { getOrdersByEmail, getOrderById, currentUser } = useStore();
  const [searchType, setSearchType] = useState<'email' | 'order'>('email');
  const [emailSearch, setEmailSearch] = useState('');
  const [orderIdSearch, setOrderIdSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleEmailSearch = () => {
    if (emailSearch.trim()) {
      const orders = getOrdersByEmail(emailSearch);
      setSearchResults(orders);
      setSearched(true);
    }
  };

  const handleOrderIdSearch = () => {
    if (orderIdSearch.trim()) {
      const order = getOrderById(orderIdSearch);
      setSearchResults(order ? [order] : []);
      setSearched(true);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'processing':
        return <Package className="h-4 w-4 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-4 w-4 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // If user is logged in, show their orders directly
  if (currentUser && currentUser.orders.length > 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold mb-2">Order History</h1>
                <p className="text-muted-foreground">
                  Welcome back, {currentUser.firstName}! Here are your recent orders.
                </p>
              </div>
              <Button asChild variant="outline">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
            </div>

            <div className="space-y-6">
              {currentUser.orders.map((order) => (
                <Card key={order.id} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">Order {order.id}</h3>
                      <p className="text-sm text-muted-foreground">
                        Placed on {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      <span className="flex items-center space-x-1">
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </span>
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Items</h4>
                      <div className="space-y-2">
                        {order.items.slice(0, 2).map((item) => (
                          <div key={`${item.id}-${item.selectedSize}`} className="flex items-center space-x-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 object-cover rounded"
                              />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm truncate">{item.name}</p>
                              <p className="text-xs text-muted-foreground">
                                Qty: {item.quantity}
                              </p>
                            </div>
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <p className="text-xs text-muted-foreground">
                            +{order.items.length - 2} more items
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Total</span>
                          <span className="font-medium">${order.total.toFixed(2)}</span>
                        </div>
                        {order.trackingNumber && (
                          <div className="flex justify-between text-sm">
                            <span>Tracking</span>
                            <span className="font-mono text-xs">{order.trackingNumber}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm">
                          <span>Estimated Delivery</span>
                          <span>{new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <Button asChild variant="outline" className="w-full mt-4">
                        <Link to={`/order-confirmation/${order.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Track Your Order</h1>
            <p className="text-muted-foreground">
              Enter your email address or order ID to track your package
            </p>
          </div>

          {/* Search Options */}
          <Card className="p-6 mb-6">
            <div className="flex space-x-4 mb-6">
              <Button
                variant={searchType === 'email' ? 'default' : 'outline'}
                onClick={() => setSearchType('email')}
                className="flex-1"
              >
                Search by Email
              </Button>
              <Button
                variant={searchType === 'order' ? 'default' : 'outline'}
                onClick={() => setSearchType('order')}
                className="flex-1"
              >
                Search by Order ID
              </Button>
            </div>

            {searchType === 'email' ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={emailSearch}
                    onChange={(e) => setEmailSearch(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleEmailSearch()}
                  />
                </div>
                <Button onClick={handleEmailSearch} className="w-full">
                  <Search className="mr-2 h-4 w-4" />
                  Find Orders
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="orderId">Order ID</Label>
                  <Input
                    id="orderId"
                    placeholder="Enter your order ID (e.g., ORD-12345)"
                    value={orderIdSearch}
                    onChange={(e) => setOrderIdSearch(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleOrderIdSearch()}
                  />
                </div>
                <Button onClick={handleOrderIdSearch} className="w-full">
                  <Search className="mr-2 h-4 w-4" />
                  Track Order
                </Button>
              </div>
            )}
          </Card>

          {/* Search Results */}
          {searched && (
            <div>
              {searchResults.length > 0 ? (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">
                    {searchResults.length === 1 ? 'Order Found' : `${searchResults.length} Orders Found`}
                  </h2>
                  
                  {searchResults.map((order) => (
                    <Card key={order.id} className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold">Order {order.id}</h3>
                          <p className="text-sm text-muted-foreground">
                            Placed on {new Date(order.orderDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          <span className="flex items-center space-x-1">
                            {getStatusIcon(order.status)}
                            <span className="capitalize">{order.status}</span>
                          </span>
                        </Badge>
                      </div>

                      {/* Order Progress */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className={`flex items-center space-x-2 ${
                            ['pending', 'processing', 'shipped', 'delivered'].includes(order.status) 
                              ? 'text-primary' : 'text-muted-foreground'
                          }`}>
                            <CheckCircle className="h-4 w-4" />
                            <span>Order Confirmed</span>
                          </span>
                          <span className={`flex items-center space-x-2 ${
                            ['processing', 'shipped', 'delivered'].includes(order.status) 
                              ? 'text-primary' : 'text-muted-foreground'
                          }`}>
                            <Package className="h-4 w-4" />
                            <span>Processing</span>
                          </span>
                          <span className={`flex items-center space-x-2 ${
                            ['shipped', 'delivered'].includes(order.status) 
                              ? 'text-primary' : 'text-muted-foreground'
                          }`}>
                            <Truck className="h-4 w-4" />
                            <span>Shipped</span>
                          </span>
                          <span className={`flex items-center space-x-2 ${
                            order.status === 'delivered' 
                              ? 'text-primary' : 'text-muted-foreground'
                          }`}>
                            <MapPin className="h-4 w-4" />
                            <span>Delivered</span>
                          </span>
                        </div>
                      </div>

                      <Separator className="mb-4" />

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-2">Order Items</h4>
                          <div className="space-y-2">
                            {order.items.map((item) => (
                              <div key={`${item.id}-${item.selectedSize}`} className="flex items-center space-x-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 object-cover rounded"
                            />
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{item.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    Size: {item.selectedSize} • Qty: {item.quantity}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Tracking Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Total</span>
                              <span className="font-medium">${order.total.toFixed(2)}</span>
                            </div>
                            {order.trackingNumber && (
                              <div className="flex justify-between">
                                <span>Tracking Number</span>
                                <span className="font-mono text-xs">{order.trackingNumber}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="flex items-center">
                                <Calendar className="mr-1 h-3 w-3" />
                                Estimated Delivery
                              </span>
                              <span>{new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <Button asChild variant="outline" className="w-full mt-4">
                            <Link to={`/order-confirmation/${order.id}`}>
                              View Full Details
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Orders Found</h3>
                  <p className="text-muted-foreground mb-4">
                    We couldn't find any orders with that {searchType === 'email' ? 'email address' : 'order ID'}.
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Please check your spelling and try again, or contact customer support if you need assistance.
                  </p>
                  <Button asChild>
                    <Link to="/">Continue Shopping</Link>
                  </Button>
                </Card>
              )}
            </div>
          )}

          {!searched && (
            <Card className="p-8 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Track Your Package</h3>
              <p className="text-muted-foreground">
                Enter your information above to find your order and see real-time tracking updates.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}