import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building, Home, Construction, Wrench, Truck, Hammer, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const mainServices = [
    {
      icon: <Building className="w-12 h-12 text-accent" />,
      title: "Commercial Construction",
      description: "From office buildings to retail spaces, we deliver commercial projects that meet the highest standards of quality and functionality.",
      features: [
        "Office Buildings & Corporate Headquarters",
        "Retail Stores & Shopping Centers",
        "Warehouses & Industrial Facilities", 
        "Healthcare & Educational Facilities"
      ],
      price: "Starting at $200/sq ft"
    },
    {
      icon: <Home className="w-12 h-12 text-accent" />,
      title: "Residential Building",
      description: "Custom homes and residential developments built with attention to detail and personalized to your lifestyle needs.",
      features: [
        "Custom Home Design & Build",
        "Multi-Family Residential Complexes",
        "Luxury Home Construction",
        "Sustainable & Energy-Efficient Homes"
      ],
      price: "Starting at $150/sq ft"
    },
    {
      icon: <Construction className="w-12 h-12 text-accent" />,
      title: "Infrastructure Development", 
      description: "Essential infrastructure projects including roads, bridges, and utilities that connect and serve communities.",
      features: [
        "Road Construction & Paving",
        "Bridge & Overpass Construction",
        "Water & Sewer Systems",
        "Municipal Infrastructure Projects"
      ],
      price: "Contact for Quote"
    },
    {
      icon: <Wrench className="w-12 h-12 text-accent" />,
      title: "Renovation & Remodeling",
      description: "Transform existing spaces with comprehensive renovation services that breathe new life into buildings.",
      features: [
        "Complete Building Renovations",
        "Kitchen & Bathroom Remodeling",
        "Office Space Modernization",
        "Historic Building Restoration"
      ],
      price: "Starting at $75/sq ft"
    }
  ];

  const additionalServices = [
    {
      icon: <Truck className="w-8 h-8 text-primary" />,
      title: "Site Preparation",
      description: "Land clearing, excavation, and site preparation for all project types."
    },
    {
      icon: <Hammer className="w-8 h-8 text-primary" />,
      title: "Concrete & Foundation",
      description: "Professional concrete work and foundation installation services."
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Project Management",
      description: "End-to-end project coordination and management services."
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Emergency Repairs",
      description: "24/7 emergency construction and repair services available."
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 hero-section">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Our Services
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in">
            Comprehensive construction solutions for every project type and scale. From concept to completion, we've got you covered.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Core Construction Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional construction services tailored to meet your specific needs and budget
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {mainServices.map((service, index) => (
              <Card key={index} className="construction-card group">
                <CardHeader>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0">
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </CardTitle>
                      <p className="text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm">
                        <ArrowRight className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-primary">
                      {service.price}
                    </span>
                    <Link to="/contact">
                      <Button className="cta-button">
                        Get Quote
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Additional Services
            </h2>
            <p className="text-xl text-muted-foreground">
              Supporting services to ensure project success from start to finish
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <Card key={index} className="construction-card text-center group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A systematic approach ensuring quality results and smooth project execution
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: "01", title: "Consultation", description: "Initial project discussion and needs assessment" },
              { step: "02", title: "Planning", description: "Detailed project planning and design development" },
              { step: "03", title: "Permitting", description: "Obtaining all necessary permits and approvals" },
              { step: "04", title: "Construction", description: "Professional construction with regular updates" },
              { step: "05", title: "Completion", description: "Final inspection and project handover" }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-primary text-white rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold group-hover:bg-accent transition-colors">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Guarantees
            </h2>
            <p className="text-xl text-muted-foreground">
              Your peace of mind is our priority
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="construction-card text-center">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Quality Guarantee
                </h3>
                <p className="text-muted-foreground">
                  2-year warranty on all construction work with comprehensive coverage
                </p>
              </CardContent>
            </Card>
            <Card className="construction-card text-center">
              <CardContent className="p-6">
                <Clock className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  On-Time Completion
                </h3>
                <p className="text-muted-foreground">
                  Projects completed on schedule or we cover delay costs
                </p>
              </CardContent>
            </Card>
            <Card className="construction-card text-center">
              <CardContent className="p-6">
                <Building className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Budget Protection
                </h3>
                <p className="text-muted-foreground">
                  Fixed-price contracts with no hidden fees or surprise charges
                </p>
              </CardContent>
            </Card>
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
            Get a detailed quote for your construction project today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="cta-button text-white px-8 py-6 text-lg">
                Get Free Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-white text-white hover:bg-white hover:text-primary">
                Learn About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;