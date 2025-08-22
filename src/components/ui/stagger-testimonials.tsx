import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marcus",
    role: "Sneaker Collector",
    company: "SneakerHead Community",
    quote: "The quality of these sneakers is unmatched. I've been collecting for 10 years and these are my favorites.",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    name: "Sarah",
    role: "Professional Runner",
    company: "Elite Athletics",
    quote: "These running shoes improved my performance significantly. The comfort and support are incredible.",
    avatar: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: 3,
    name: "Jake",
    role: "Fashion Blogger",
    company: "Style Forward",
    quote: "I've been searching for the perfect sneakers for YEARS. I finally found them here! The style is unbeatable.",
    avatar: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: 4,
    name: "Emma",
    role: "Fitness Instructor",
    company: "FitLife Studio",
    quote: "My clients always ask where I got these sneakers. The comfort during long training sessions is amazing.",
    avatar: "https://i.pravatar.cc/150?img=4"
  },
  {
    id: 5,
    name: "Tyler",
    role: "Streetwear Enthusiast",
    company: "Urban Culture",
    quote: "If I could give 11 stars, I'd give 12. These sneakers complete every outfit perfectly.",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 6,
    name: "Olivia",
    role: "Customer Success Manager",
    company: "Tech Startup",
    quote: "SO SO SO HAPPY I FOUND THESE!!!! I've saved so much time not having to search for quality sneakers.",
    avatar: "https://i.pravatar.cc/150?img=6"
  },
  {
    id: 7,
    name: "David",
    role: "Basketball Player",
    company: "City League",
    quote: "Took some convincing from my teammates, but now I'm never switching brands. Performance is top-tier.",
    avatar: "https://i.pravatar.cc/150?img=7"
  },
  {
    id: 8,
    name: "Luna",
    role: "Dance Instructor",
    company: "Rhythm Studios",
    quote: "I would be lost without these sneakers for my classes. The grip and flexibility are EASILY 100% better.",
    avatar: "https://i.pravatar.cc/150?img=8"
  },
  {
    id: 9,
    name: "Carlos",
    role: "Skateboarder",
    company: "Street Dreams",
    quote: "It's just the best. Period. Perfect for skating and everyday wear.",
    avatar: "https://i.pravatar.cc/150?img=9"
  },
  {
    id: 10,
    name: "Amy",
    role: "Marketing Director",
    company: "Creative Agency",
    quote: "I switched to these sneakers 2 years ago and never looked back. Style and comfort combined.",
    avatar: "https://i.pravatar.cc/150?img=10"
  },
  {
    id: 11,
    name: "Jordan",
    role: "Photographer",
    company: "Visual Arts Co",
    quote: "Perfect for long photo shoots on my feet. These sneakers are a game-changer for comfort.",
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    id: 12,
    name: "Maya",
    role: "Student",
    company: "University",
    quote: "Best investment for college life. Comfortable for walking campus and stylish enough for parties.",
    avatar: "https://i.pravatar.cc/150?img=12"
  }
];

export function StaggerTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + testimonials.length) % testimonials.length;
      visible.push({
        ...testimonials[index],
        position: i,
      });
    }
    return visible;
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          What Our Customers Say
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Don't just take our word for it. Here's what sneaker enthusiasts around the world think about our collection.
        </p>
      </div>

      <div className="relative h-96 overflow-hidden">
        <div className="flex items-center justify-center h-full relative">
          {visibleTestimonials.map((testimonial, index) => {
            const { position } = testimonial;
            const isCenter = position === 0;
            
            return (
              <div
                key={`${testimonial.id}-${currentIndex}`}
                className={`absolute transition-all duration-700 ease-in-out ${
                  isCenter
                    ? 'z-10 scale-100 opacity-100'
                    : position === -1 || position === 1
                    ? 'z-5 scale-90 opacity-75'
                    : 'z-0 scale-75 opacity-40'
                }`}
                style={{
                  transform: `translateX(${position * 300}px) scale(${
                    isCenter ? 1 : position === -1 || position === 1 ? 0.9 : 0.75
                  })`,
                }}
              >
                <div
                  className={`bg-card border rounded-2xl p-8 shadow-lg max-w-sm mx-auto transition-all duration-700 ${
                    isCenter
                      ? 'bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-xl'
                      : 'hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <blockquote className="text-foreground/90 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center mt-8 gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPrevious}
          className="rounded-full"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary w-8'
                  : 'bg-muted hover:bg-muted-foreground/50'
              }`}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(index);
              }}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={goToNext}
          className="rounded-full"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}