import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Truck, MapPin, CheckCircle } from 'lucide-react';

const OrderTracking = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [orderEmail, setOrderEmail] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);

  const handleTrackOrder = () => {
    // Mock tracking data for demonstration
    if (trackingNumber && orderEmail) {
      setTrackingResult({
        orderNumber: trackingNumber,
        status: 'In Transit',
        estimatedDelivery: 'January 20, 2025',
        trackingSteps: [
          { status: 'Order Placed', date: 'Jan 15, 2025 - 2:30 PM', completed: true },
          { status: 'Order Processed', date: 'Jan 16, 2025 - 9:15 AM', completed: true },
          { status: 'Shipped', date: 'Jan 17, 2025 - 11:45 AM', completed: true },
          { status: 'In Transit', date: 'Jan 18, 2025 - 3:20 PM', completed: true },
          { status: 'Out for Delivery', date: 'Pending', completed: false },
          { status: 'Delivered', date: 'Pending', completed: false }
        ]
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-foreground">Order Tracking</h1>
        <p className="text-muted-foreground text-center mb-8">
          Enter your order details below to track your SNEAKHAUS package
        </p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Track Your Order
            </CardTitle>
            <CardDescription>
              Enter your order number and email address to get real-time tracking information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tracking">Order Number / Tracking Number</Label>
                <Input
                  id="tracking"
                  placeholder="e.g., SH123456789 or 1Z999AA1234567890"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={orderEmail}
                  onChange={(e) => setOrderEmail(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={handleTrackOrder} className="w-full" disabled={!trackingNumber || !orderEmail}>
              <Package className="h-4 w-4 mr-2" />
              Track Order
            </Button>
          </CardContent>
        </Card>

        {trackingResult && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Order #{trackingResult.orderNumber}</span>
                <span className="text-primary">{trackingResult.status}</span>
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Estimated Delivery: {trackingResult.estimatedDelivery}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trackingResult.trackingSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {step.completed ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {step.status}
                      </h3>
                      <p className="text-sm text-muted-foreground">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Most orders are processed within 1-2 business days and shipped via our trusted carriers.
              </p>
              <div className="space-y-2">
                <h3 className="font-semibold">Shipping Options:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Standard (5-7 days): Free on orders $75+</li>
                  <li>• Express (2-3 days): $12.99</li>
                  <li>• Overnight (1 day): $24.99</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Can't find your order or having tracking issues? Our support team is here to help.
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full" asChild>
                  <a href="/support">Contact Support</a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/returns-exchanges">Returns & Exchanges</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-muted/50 rounded-lg">
          <h3 className="font-semibold mb-2">Tracking Tips:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Order numbers start with "SH" followed by 9 digits</li>
            <li>• Tracking numbers are provided in your shipping confirmation email</li>
            <li>• Allow 24-48 hours for tracking information to update after shipment</li>
            <li>• International orders may take longer to show tracking updates</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;