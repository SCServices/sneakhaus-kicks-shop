import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-8xl md:text-9xl font-black text-accent mb-4">404</div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="space-y-4">
            <Link 
              to="/" 
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Return to Home
            </Link>
            <div className="text-sm text-muted-foreground">
              Error Code: {location.pathname}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
