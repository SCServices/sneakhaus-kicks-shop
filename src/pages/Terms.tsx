const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="prose prose-gray max-w-none">
            <div className="bg-card rounded-lg p-8 shadow-sm mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing and using SNEAKHAUS ("we," "our," or "us"), you accept and agree to be bound by the terms and provision of this agreement.
              </p>

              <h2 className="text-2xl font-semibold mb-4 mt-8">2. Product Information</h2>
              <p className="text-muted-foreground mb-4">
                We strive to display product information accurately. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, or error-free.
              </p>

              <h2 className="text-2xl font-semibold mb-4 mt-8">3. Pricing and Payment</h2>
              <p className="text-muted-foreground mb-4">
                All prices are subject to change without notice. We reserve the right to modify or discontinue products at any time. Payment must be received before shipment.
              </p>

              <h2 className="text-2xl font-semibold mb-4 mt-8">4. Shipping and Delivery</h2>
              <p className="text-muted-foreground mb-4">
                Shipping times are estimates and not guaranteed. We are not responsible for delays caused by shipping carriers or customs processing.
              </p>

              <h2 className="text-2xl font-semibold mb-4 mt-8">5. Returns and Exchanges</h2>
              <p className="text-muted-foreground mb-4">
                Items must be returned within 30 days in original condition. Customer is responsible for return shipping costs unless the item was defective or incorrect.
              </p>

              <h2 className="text-2xl font-semibold mb-4 mt-8">6. Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                All content on this website, including text, graphics, logos, and images, is the property of SNEAKHAUS and protected by copyright laws.
              </p>

              <h2 className="text-2xl font-semibold mb-4 mt-8">7. User Accounts</h2>
              <p className="text-muted-foreground mb-4">
                You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
              </p>

              <h2 className="text-2xl font-semibold mb-4 mt-8">8. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                SNEAKHAUS shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of our services.
              </p>

              <h2 className="text-2xl font-semibold mb-4 mt-8">9. Governing Law</h2>
              <p className="text-muted-foreground mb-4">
                These terms are governed by the laws of [Your Jurisdiction]. Any disputes will be resolved in the courts of [Your Jurisdiction].
              </p>

              <h2 className="text-2xl font-semibold mb-4 mt-8">10. Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-muted rounded-lg p-4 mt-4">
                <p className="font-medium">SNEAKHAUS Customer Service</p>
                <p className="text-muted-foreground">Email: legal@sneakhaus.com</p>
                <p className="text-muted-foreground">Phone: 1-800-SNEAKER</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;