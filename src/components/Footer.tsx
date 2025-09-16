import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-brand-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-brand-gold">SNEAKHAUS</h3>
            <p className="text-gray-300 text-sm">
              Premium sneakers for the modern lifestyle. Step into excellence with our curated collection.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-white hover:text-brand-gold">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-brand-gold">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-brand-gold">
                <Facebook className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-brand-gold">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/men" className="block text-gray-300 hover:text-white transition-smooth">
                Men's Collection
              </Link>
              <Link to="/women" className="block text-gray-300 hover:text-white transition-smooth">
                Women's Collection
              </Link>
              <Link to="/new-arrivals" className="block text-gray-300 hover:text-white transition-smooth">
                New Arrivals
              </Link>
              <Link to="/sale" className="block text-gray-300 hover:text-white transition-smooth">
                Sale
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-brand-gold">Customer Service</h4>
            <div className="space-y-2">
              <Link to="/support" className="block text-gray-300 hover:text-white transition-smooth">
                Customer Support
              </Link>
              <Link to="/order-tracking" className="block text-gray-300 hover:text-white transition-smooth">
                Track Your Order
              </Link>
              <Link to="/support" className="block text-gray-300 hover:text-white transition-smooth">
                Returns & Exchanges
              </Link>
              <Link to="/support" className="block text-gray-300 hover:text-white transition-smooth">
                Shipping Info
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-brand-gold">Stay Connected</h4>
            <p className="text-gray-300 text-sm">
              Get the latest drops and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Input 
                placeholder="Enter your email" 
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 flex-1"
              />
              <Button className="bg-brand-gold text-brand-black hover:bg-brand-gold-light whitespace-nowrap">
                <Mail className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Subscribe</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 Sneakhaus. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-smooth">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-smooth">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;