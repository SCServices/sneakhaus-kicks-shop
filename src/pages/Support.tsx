import { useState } from 'react';
import { MessageCircle, Phone, Mail, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const Support = () => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const faqs = [
    {
      id: '1',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all unworn items in original condition. Returns are free for orders over $100.'
    },
    {
      id: '2', 
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-5 business days. Express shipping (1-2 business days) is available for an additional fee.'
    },
    {
      id: '3',
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by location.'
    },
    {
      id: '4',
      question: 'How do I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order in the Order Tracking section.'
    },
    {
      id: '5',
      question: 'What sizes do you have available?',
      answer: 'We carry sizes 5-14 for most styles. Size availability varies by product and is shown on each product page.'
    },
    {
      id: '6',
      question: 'Are your products authentic?',
      answer: 'Yes, all our products are 100% authentic and sourced directly from authorized retailers and brand partners.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Customer Support</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're here to help! Find answers to common questions or get in touch with our support team.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
              <p className="text-muted-foreground mb-4">Chat with our support team</p>
              <Button className="w-full">Start Chat</Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Phone className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
              <p className="text-muted-foreground mb-4">1-800-SNEAKER (1-800-763-2537)</p>
              <Button variant="outline" className="w-full">Call Now</Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2">Email Support</h3>
              <p className="text-muted-foreground mb-4">support@sneakhaus.com</p>
              <Button variant="outline" className="w-full">Send Email</Button>
            </CardContent>
          </Card>
        </div>

        {/* Support Hours */}
        <div className="bg-muted/50 rounded-lg p-6 mb-16">
          <div className="flex items-center justify-center mb-4">
            <Clock className="h-6 w-6 text-primary mr-2" />
            <h3 className="text-xl font-semibold">Support Hours</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div>
              <p className="font-medium">Monday - Friday</p>
              <p className="text-muted-foreground">8:00 AM - 8:00 PM EST</p>
            </div>
            <div>
              <p className="font-medium">Saturday - Sunday</p>
              <p className="text-muted-foreground">10:00 AM - 6:00 PM EST</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <Collapsible 
                key={faq.id}
                open={openFAQ === faq.id}
                onOpenChange={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
              >
                <Card>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                      <CardTitle className="flex items-center justify-between text-left">
                        <span className="text-lg">{faq.question}</span>
                        {openFAQ === faq.id ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </CardTitle>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <Input placeholder="Enter your first name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <Input placeholder="Enter your last name" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input type="email" placeholder="Enter your email address" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input placeholder="What can we help you with?" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea 
                    placeholder="Please describe your question or issue in detail..."
                    rows={6}
                  />
                </div>
                
                <Button className="w-full" size="lg">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Support;