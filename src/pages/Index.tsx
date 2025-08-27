import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Phone, Mail, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-construction.jpg";
import servicesImage from "@/assets/services-construction.jpg";

const Index = () => {
  const services = [
    {
      title: "Commercial Construction",
      description: "Large-scale building projects for businesses and commercial properties.",
      icon: "🏢"
    },
    {
      title: "Residential Building",
      description: "Custom homes and residential developments built to perfection.",
      icon: "🏠"
    },
    {
      title: "Infrastructure Development",
      description: "Roads, bridges, and essential infrastructure projects.",
      icon: "🌉"
    },
    {
      title: "Renovation & Remodeling",
      description: "Transform existing spaces with our expert renovation services.",
      icon: "🔨"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "Metro Development",
      text: "BuildPro delivered our commercial project on time and within budget. Outstanding quality!",
      rating: 5
    },
    {
      name: "Michael Chen",
      company: "Residential Client",
      text: "They built our dream home. The attention to detail and professionalism was exceptional.",
      rating: 5
    },
    {
      name: "David Rodriguez",
      company: "City Planning Dept.",
      text: "Reliable partner for municipal infrastructure projects. Highly recommended.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center hero-section">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Building Your 
            <span className="bg-gradient-orange bg-clip-text text-transparent"> Vision</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in">
            Professional construction services for commercial, residential, and infrastructure projects
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/contact">
              <Button size="lg" className="cta-button text-white px-8 py-6 text-lg">
                Get Free Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-white text-white hover:bg-white hover:text-primary">
                Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From concept to completion, we deliver exceptional construction solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="construction-card text-center group cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button size="lg" className="cta-button">
                View All Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                25+ Years of Excellence
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                BuildPro has been the trusted construction partner for businesses and homeowners across the region. 
                Our commitment to quality, safety, and customer satisfaction drives everything we do.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-primary mr-3" />
                  <span className="text-foreground">Licensed and Insured</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-primary mr-3" />
                  <span className="text-foreground">OSHA Certified Team</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-primary mr-3" />
                  <span className="text-foreground">24/7 Project Support</span>
                </div>
              </div>
              <Link to="/about">
                <Button size="lg" variant="outline">
                  Learn More About Us
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img 
                src={servicesImage} 
                alt="Construction Services" 
                className="rounded-lg shadow-construction"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't take our word for it - hear from satisfied customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="construction-card">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-section">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get in touch today for a free consultation and quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="cta-button text-white px-8 py-6 text-lg">
                Get Free Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-white text-white hover:bg-white hover:text-primary">
              <Phone className="mr-2 w-5 h-5" />
              Call (555) 123-4567
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">BuildPro</h3>
              <p className="text-background/70">
                Professional construction services you can trust.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-background/70">
                <li>Commercial Construction</li>
                <li>Residential Building</li>
                <li>Infrastructure</li>
                <li>Renovation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-background/70">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  (555) 123-4567
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  info@buildpro.com
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  123 Construction Ave
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-background/70">
                <li><Link to="/about" className="hover:text-background transition-colors">About</Link></li>
                <li><Link to="/services" className="hover:text-background transition-colors">Services</Link></li>
                <li><Link to="/contact" className="hover:text-background transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/70">
            <p>&copy; 2024 BuildPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;