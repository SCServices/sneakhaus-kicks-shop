const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="prose prose-gray max-w-none">
            <div className="bg-card rounded-lg p-8 shadow-sm mb-8">
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">Personal Information</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Name and contact information</li>
                <li>Billing and shipping addresses</li>
                <li>Payment information (processed securely)</li>
                <li>Purchase history and preferences</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">Automatically Collected Information</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Device information and IP address</li>
                <li>Browser type and version</li>
                <li>Usage data and site interactions</li>
                <li>Cookies and similar technologies</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 mt-8">How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use the information we collect to provide, maintain, and improve our services.
              </p>

              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Process and fulfill orders</li>
                <li>Provide customer support</li>
                <li>Send order confirmations and updates</li>
                <li>Improve our website and services</li>
                <li>Personalize your experience</li>
                <li>Send marketing communications (with consent)</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 mt-8">Information Sharing</h2>
              <p className="text-muted-foreground mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share information in the following circumstances:
              </p>

              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>With service providers who help us operate our business</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and safety</li>
                <li>With your consent</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 mt-8">Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h2 className="text-2xl font-semibold mb-4 mt-8">Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>

              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Access and update your information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability</li>
                <li>Object to processing</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 mt-8">Cookies</h2>
              <p className="text-muted-foreground mb-4">
                We use cookies and similar technologies to enhance your browsing experience, analyze site usage, and personalize content.
              </p>

              <h2 className="text-2xl font-semibold mb-4 mt-8">Children's Privacy</h2>
              <p className="text-muted-foreground mb-4">
                Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13.
              </p>

              <h2 className="text-2xl font-semibold mb-4 mt-8">Changes to This Policy</h2>
              <p className="text-muted-foreground mb-4">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
              </p>

              <h2 className="text-2xl font-semibold mb-4 mt-8">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-muted rounded-lg p-4 mt-4">
                <p className="font-medium">SNEAKHAUS Privacy Team</p>
                <p className="text-muted-foreground">Email: privacy@sneakhaus.com</p>
                <p className="text-muted-foreground">Phone: 1-800-SNEAKER</p>
                <p className="text-muted-foreground">Address: [Your Business Address]</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;