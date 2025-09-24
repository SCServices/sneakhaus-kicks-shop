const ReturnsExchanges = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-foreground">Returns & Exchanges</h1>
        <p className="text-muted-foreground text-center mb-8">Last updated: January 15, 2025</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Return Policy</h2>
            <p className="text-muted-foreground mb-4">
              We want you to love your SNEAKHAUS purchase. If you're not completely satisfied, you can return most items within 30 days of purchase for a full refund.
            </p>
            <div className="p-4 rounded-lg bg-muted/50 border">
              <h3 className="font-semibold mb-2 text-green-600">What Can Be Returned:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Unworn shoes in original packaging</li>
                <li>Items with original tags attached</li>
                <li>Accessories in original condition</li>
                <li>Defective or damaged items (no time limit)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Exchange Policy</h2>
            <p className="text-muted-foreground mb-4">
              Need a different size or color? We offer free exchanges within 30 days of purchase.
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">Size Exchanges</h3>
                <p className="text-muted-foreground">Free exchanges for different sizes of the same product, subject to availability.</p>
              </div>
              <div className="p-4 rounded-lg border">
                <h3 className="font-semibold mb-2">Color/Style Exchanges</h3>
                <p className="text-muted-foreground">Exchange for different colors or styles of equal or lesser value. Price difference applies for higher-value items.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">How to Return or Exchange</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">1</span>
                <div>
                  <h3 className="font-semibold mb-1">Contact Us</h3>
                  <p className="text-muted-foreground">Email support@sneakhaus.com or visit our <a href="/support" className="text-primary hover:underline">Support</a> page to initiate your return or exchange.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">2</span>
                <div>
                  <h3 className="font-semibold mb-1">Receive Return Label</h3>
                  <p className="text-muted-foreground">We'll provide you with a prepaid return shipping label and instructions.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">3</span>
                <div>
                  <h3 className="font-semibold mb-1">Package & Ship</h3>
                  <p className="text-muted-foreground">Carefully package your items with all original materials and drop off at any authorized shipping location.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">4</span>
                <div>
                  <h3 className="font-semibold mb-1">Processing</h3>
                  <p className="text-muted-foreground">Once we receive your return, we'll process your refund or exchange within 3-5 business days.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Refund Information</h2>
            <p className="text-muted-foreground mb-4">
              Refunds will be issued to the original payment method within 5-10 business days after processing.
            </p>
            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
              <p className="text-yellow-800 font-semibold mb-2">Important Notes:</p>
              <ul className="list-disc list-inside space-y-1 text-yellow-700">
                <li>Original shipping costs are non-refundable</li>
                <li>Return shipping is free for defective items</li>
                <li>Sale items marked "Final Sale" cannot be returned</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Damaged or Defective Items</h2>
            <p className="text-muted-foreground mb-4">
              If you receive a damaged or defective item, please contact us immediately. We'll provide a prepaid return label and expedite your replacement or refund.
            </p>
            <p className="text-muted-foreground">
              For damaged items, please take photos of the damage and include them when contacting our support team.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Contact Information</h2>
            <p className="text-muted-foreground mb-2">
              Questions about returns or exchanges? We're here to help:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>Email: support@sneakhaus.com</li>
              <li>Phone: 1-800-SNEAKHAUS (1-800-763-2544)</li>
              <li>Live Chat: Available on our <a href="/support" className="text-primary hover:underline">Support</a> page</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReturnsExchanges;