import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useStore } from '@/lib/store';
const Cart = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    cartTotal
  } = useStore();
  if (cart.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/">
            <Button size="lg" className="bg-brand-black text-white hover:bg-brand-gray-dark">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>;
  }
  return <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
            
            <div className="space-y-6">
              {cart.map(item => <Card key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Product Image */}
                      <div className="w-full md:w-32 h-32 bg-brand-gray-light rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.selectedColorImage} alt={`${item.name} - ${item.selectedColor.name}`} className="w-full h-full object-cover" />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <p className="text-muted-foreground">{item.category}</p>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Size: </span>
                            <span className="font-medium">{item.selectedSize}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Color: </span>
                            <span className="font-medium">{item.selectedColor.name}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-3">
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}>
                              <Minus className="h-4 w-4" />
                            </Button>
                            
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Price and Remove */}
                          <div className="flex items-center space-x-4">
                            <p className="text-lg font-bold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-card sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium">${cartTotal().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-medium">
                      {cartTotal() > 200 ? 'Free' : '$15.00'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span className="font-medium">${(cartTotal() * 0.08).toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>
                      ${(cartTotal() + (cartTotal() > 200 ? 0 : 15) + cartTotal() * 0.08).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Button asChild className="w-full" size="lg">
                    <Link to="/checkout">
                      Proceed to Checkout
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/">
                      Continue Shopping
                    </Link>
                  </Button>
                </div>

                {/* Shipping Notice */}
                {cartTotal() < 200}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>;
};
export default Cart;