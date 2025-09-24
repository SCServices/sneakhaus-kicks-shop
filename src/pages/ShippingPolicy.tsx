const ShippingPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-foreground">Shipping Policy</h1>
        <p className="text-muted-foreground text-center mb-8">Last updated: January 15, 2025</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Shipping Options</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">Standard Shipping (5-7 Business Days)</h3>
                <p className="text-muted-foreground">Free on orders over $75. $5.99 for orders under $75.</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">Express Shipping (2-3 Business Days)</h3>
                <p className="text-muted-foreground">$12.99 for all orders.</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">Overnight Shipping (1 Business Day)</h3>
                <p className="text-muted-foreground">$24.99 for all orders. Orders must be placed by 2 PM EST.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Processing Time</h2>
            <p className="text-muted-foreground mb-4">
              All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.
            </p>
            <p className="text-muted-foreground">
              If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Shipping Destinations</h2>
            <p className="text-muted-foreground mb-4">
              We currently ship to all 50 US states, Puerto Rico, and select international destinations.
            </p>
            <div className="space-y-2">
              <h3 className="font-semibold">International Shipping</h3>
              <p className="text-muted-foreground">Available to Canada, UK, Australia, and EU countries. International shipping rates start at $15.99 and may take 7-14 business days.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Order Tracking</h2>
            <p className="text-muted-foreground mb-4">
              Once your order has shipped, you will receive a shipping confirmation email with your tracking number.
            </p>
            <p className="text-muted-foreground">
              You can track your order status anytime by visiting our <a href="/order-tracking" className="text-primary hover:underline">Order Tracking</a> page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Shipping Issues</h2>
            <p className="text-muted-foreground mb-4">
              SNEAKHAUS is not responsible for lost, stolen, or damaged packages confirmed to be delivered to the address entered for an order.
            </p>
            <p className="text-muted-foreground">
              If you have questions about your shipment, please contact our customer service team at support@sneakhaus.com or visit our <a href="/support" className="text-primary hover:underline">Support</a> page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;