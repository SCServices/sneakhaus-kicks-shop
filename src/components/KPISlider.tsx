import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { Star, Users, ShoppingBag, Award, Globe, Clock } from 'lucide-react';

const KPISlider = () => {
  const kpiItems = [
    {
      icon: <Star className="h-8 w-8 text-brand-gold" />,
      value: "50K+",
      label: "Happy Customers"
    },
    {
      icon: <Users className="h-8 w-8 text-accent" />,
      value: "4.9/5",
      label: "Customer Rating"
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-primary" />,
      value: "100K+",
      label: "Orders Delivered"
    },
    {
      icon: <Award className="h-8 w-8 text-brand-gold" />,
      value: "25+",
      label: "Premium Brands"
    },
    {
      icon: <Globe className="h-8 w-8 text-accent" />,
      value: "50+",
      label: "Countries Served"
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      value: "24/7",
      label: "Customer Support"
    }
  ];

  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Trusted by Sneaker Enthusiasts Worldwide
          </h2>
          <p className="text-muted-foreground">
            Join thousands of satisfied customers who trust us for their sneaker needs
          </p>
        </div>

        <InfiniteSlider
          gap={32}
          duration={20}
          durationOnHover={40}
          className="py-8"
        >
          {kpiItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-card rounded-lg p-8 min-w-[200px] shadow-card border border-border/50 hover:shadow-elevated transition-shadow duration-300"
            >
              <div className="mb-4">
                {item.icon}
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-1">
                  {item.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
};

export default KPISlider;