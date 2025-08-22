import { Instagram, MessageCircle, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const SocialMediaFeed = () => {
  const socialPosts = [
    {
      id: 1,
      username: '@sneakerhead_mike',
      avatar: '/placeholder.svg',
      image: '/placeholder.svg',
      caption: 'Just copped these fire sneakers from @sneakhaus! The quality is unmatched 🔥',
      likes: 234,
      comments: 18,
      timeAgo: '2h'
    },
    {
      id: 2,
      username: '@urban_style_sarah',
      avatar: '/placeholder.svg',
      image: '/placeholder.svg',
      caption: 'My new favorite daily drivers. Comfort and style in perfect harmony ✨',
      likes: 187,
      comments: 12,
      timeAgo: '4h'
    },
    {
      id: 3,
      username: '@athlete_jones',
      avatar: '/placeholder.svg',
      image: '/placeholder.svg',
      caption: 'Performance meets style. These sneakers are a game changer! 💪',
      likes: 312,
      comments: 25,
      timeAgo: '6h'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            #SneakhausStyle
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how our community rocks their favorite kicks. Tag us for a chance to be featured!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {socialPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-300">
              <CardContent className="p-0">
                {/* Post Image */}
                <div className="aspect-square bg-muted relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={`Post by ${post.username}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <Instagram className="h-6 w-6 text-white drop-shadow-lg" />
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <img 
                      src={post.avatar} 
                      alt={`${post.username} avatar`}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{post.username}</p>
                      <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
                    </div>
                  </div>

                  <p className="text-sm text-foreground mb-3 line-clamp-2">
                    {post.caption}
                  </p>

                  <div className="flex items-center justify-between text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span className="text-xs">{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-xs">{post.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-muted-foreground mb-4">Follow us for more inspiration</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-accent hover:text-accent-dark transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaFeed;