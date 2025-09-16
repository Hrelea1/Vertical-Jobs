import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, ArrowRight, Send, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AppointmentBooking from "@/components/AppointmentBooking";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Quote Request Submitted!",
      description: "We'll review your project details and contact you within 24 hours.",
    });
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      projectType: "",
      budget: "",
      timeline: "",
      message: ""
    });
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-accent" />,
      title: "Phone",
      details: "(555) 123-4567",
      subtitle: "Mon-Fri 8AM-6PM"
    },
    {
      icon: <Mail className="w-6 h-6 text-accent" />,
      title: "Email", 
      details: "info@buildpro.com",
      subtitle: "24/7 Response"
    },
    {
      icon: <MapPin className="w-6 h-6 text-accent" />,
      title: "Office",
      details: "123 Construction Ave",
      subtitle: "Suite 200, City, State 12345"
    },
    {
      icon: <Clock className="w-6 h-6 text-accent" />,
      title: "Hours",
      details: "Mon-Fri: 8AM-6PM",
      subtitle: "Sat: 9AM-3PM"
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section - Book Appointment */}
      <section className="relative py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Schedule Your Free Consultation
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-8">
              Take the first step towards your dream construction project. Book an appointment with our experts and get a detailed quote.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-lg">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>24hr Response</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="w-5 h-5" />
                <span>Expert Advice</span>
              </div>
            </div>
          </div>
          
          {/* Appointment Booking Form */}
          <div className="max-w-4xl mx-auto">
            <AppointmentBooking />
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Alternative Contact Methods
            </h2>
            <p className="text-xl text-muted-foreground">
              Prefer a different way to reach us? We're here to help.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="construction-card">
                <CardHeader>
                  <CardTitle className="text-2xl">Request a Detailed Quote</CardTitle>
                  <p className="text-muted-foreground">
                    Need a comprehensive project quote? Fill out this detailed form and we'll provide you with a thorough estimate.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(555) 123-4567"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="projectType">Project Type *</Label>
                        <Select onValueChange={(value) => handleSelectChange("projectType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="commercial">Commercial Construction</SelectItem>
                            <SelectItem value="residential">Residential Building</SelectItem>
                            <SelectItem value="infrastructure">Infrastructure Development</SelectItem>
                            <SelectItem value="renovation">Renovation & Remodeling</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="budget">Budget Range</Label>
                        <Select onValueChange={(value) => handleSelectChange("budget", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-100k">Under $100,000</SelectItem>
                            <SelectItem value="100k-500k">$100,000 - $500,000</SelectItem>
                            <SelectItem value="500k-1m">$500,000 - $1,000,000</SelectItem>
                            <SelectItem value="1m-5m">$1,000,000 - $5,000,000</SelectItem>
                            <SelectItem value="over-5m">Over $5,000,000</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeline">Project Timeline</Label>
                        <Select onValueChange={(value) => handleSelectChange("timeline", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asap">ASAP</SelectItem>
                            <SelectItem value="1-3months">1-3 Months</SelectItem>
                            <SelectItem value="3-6months">3-6 Months</SelectItem>
                            <SelectItem value="6-12months">6-12 Months</SelectItem>
                            <SelectItem value="over-year">Over 1 Year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Project Details *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your project, including size, location, special requirements, etc."
                        rows={4}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full cta-button">
                      <Send className="w-5 h-5 mr-2" />
                      Send Quote Request
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="construction-card">
                <CardHeader>
                  <CardTitle className="text-xl">Get In Touch</CardTitle>
                  <p className="text-muted-foreground">
                    Multiple ways to reach our team
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{info.title}</h3>
                        <p className="text-foreground">{info.details}</p>
                        <p className="text-sm text-muted-foreground">{info.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="construction-card">
                <CardHeader>
                  <CardTitle className="text-xl">Emergency Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Need emergency construction repairs? We offer 24/7 emergency services for urgent situations.
                  </p>
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Emergency: (555) 911-HELP
                  </Button>
                </CardContent>
              </Card>

              <Card className="construction-card">
                <CardHeader>
                  <CardTitle className="text-xl">Service Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    We provide construction services throughout the metropolitan area and surrounding regions.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Downtown Metro Area</li>
                    <li>• Suburban Communities</li>
                    <li>• Industrial Districts</li>
                    <li>• Rural & Remote Locations</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Visit Our Office
            </h2>
            <p className="text-xl text-muted-foreground">
              Stop by for an in-person consultation
            </p>
          </div>
          <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                BuildPro Headquarters
              </h3>
              <p className="text-muted-foreground">
                123 Construction Ave, Suite 200<br />
                City, State 12345
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions about our services
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "How long does it take to get a quote?",
                answer: "We provide detailed quotes within 24-48 hours of receiving your project information. For complex projects, we may schedule an on-site consultation."
              },
              {
                question: "Are you licensed and insured?",
                answer: "Yes, BuildPro is fully licensed, bonded, and insured. We carry comprehensive liability insurance and workers' compensation coverage."
              },
              {
                question: "Do you handle permits and inspections?",
                answer: "Absolutely. We handle all necessary permits, inspections, and regulatory compliance as part of our comprehensive project management service."
              },
              {
                question: "What's your payment schedule?",
                answer: "We typically work with a deposit to begin work, progress payments tied to project milestones, and final payment upon completion and your satisfaction."
              }
            ].map((faq, index) => (
              <Card key={index} className="construction-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 hero-section">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let's Build Something Great Together
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Your construction project deserves expert attention and professional results
          </p>
          <Button size="lg" className="cta-button text-white px-8 py-6 text-lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Book Appointment Now
            <Calendar className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Contact;