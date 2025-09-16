import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Docs = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Documentation</h1>
        
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This documentation page is currently under construction. 
              More information about our Shopify integration and store setup will be available here soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Docs;