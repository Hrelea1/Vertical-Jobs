import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Home, Building2, Wrench, Layers, Triangle, Zap, Droplet, MessageSquare, Plus, ArrowRight, Sparkles, ChevronLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import CongratsNotification from './CongratsNotification';

interface QuizFormData {
  fullName: string;
  email: string;
  phone: string;
  service: string;
}

const AppointmentBooking = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);
  const [formData, setFormData] = useState<QuizFormData>({
    fullName: '',
    email: '',
    phone: '',
    service: ''
  });

  const allServices = [
    { name: 'Residential Construction', icon: Home, gradient: 'from-blue-500 to-cyan-500' },
    { name: 'Commercial Construction', icon: Building2, gradient: 'from-purple-500 to-pink-500' },
    { name: 'Renovations & Remodeling', icon: Wrench, gradient: 'from-green-500 to-teal-500' },
    { name: 'Foundation Work', icon: Layers, gradient: 'from-orange-500 to-red-500' },
    { name: 'Roofing Services', icon: Triangle, gradient: 'from-indigo-500 to-blue-500' },
    { name: 'Electrical Installation', icon: Zap, gradient: 'from-yellow-500 to-orange-500' },
    { name: 'Plumbing Services', icon: Droplet, gradient: 'from-cyan-500 to-blue-500' },
    { name: 'Consultation', icon: MessageSquare, gradient: 'from-pink-500 to-rose-500' },
    { name: 'HVAC Systems', icon: Wrench, gradient: 'from-slate-500 to-gray-500' },
    { name: 'Landscaping', icon: Home, gradient: 'from-emerald-500 to-green-500' }
  ];

  const displayedServices = showAllServices ? allServices : allServices.slice(0, 4);

  const handleInputChange = (field: keyof QuizFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceSelect = (serviceName: string) => {
    setFormData(prev => ({ ...prev, service: serviceName }));
  };

  const handleBackToServices = () => {
    setFormData(prev => ({ ...prev, service: '' }));
  };

  const validateForm = (): string | null => {
    if (!formData.fullName.trim()) return 'Full name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!formData.phone.trim()) return 'Phone number is required';
    if (!formData.service) return 'Please select a service';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return 'Please enter a valid email';
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: validationError,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('appointments')
        .insert({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          scheduled_at: new Date().toISOString() // Default to current time for quiz format
        });

      if (error) {
        throw error;
      }

      // Show congratulations notification
      setShowCongrats(true);
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        service: ''
      });
      setShowAllServices(false);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto">
        <Card className="border-0 bg-gradient-to-br from-background/80 to-secondary/20 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="flex items-center justify-center gap-3 text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              <Sparkles className="w-8 h-8 text-primary" />
              {!formData.service ? "What Can We Build For You?" : "Let's Get Started"}
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              {!formData.service 
                ? "Choose your service and let's start your project journey"
                : `Great choice! Now we need your contact information for ${formData.service}`
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {!formData.service ? (
              // Service Selection Step
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Select Your Service</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {displayedServices.map((service) => {
                    const Icon = service.icon;
                    return (
                      <button
                        key={service.name}
                        type="button"
                        onClick={() => handleServiceSelect(service.name)}
                        className="relative overflow-hidden rounded-2xl p-6 transition-all duration-300 group hover:scale-105 hover:shadow-xl"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                        <div className="relative z-10 flex flex-col items-center space-y-3">
                          <div className={`p-3 rounded-full bg-gradient-to-br ${service.gradient} shadow-lg`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="font-medium text-sm text-center leading-tight text-foreground">
                            {service.name}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
                
                {!showAllServices && allServices.length > 4 && (
                  <div className="text-center">
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={() => setShowAllServices(true)}
                      className="group border-dashed border-2 hover:border-primary transition-all duration-300"
                    >
                      <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                      See More Services
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              // Contact Form Step
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleBackToServices}
                    className="group"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform duration-300" />
                    Back
                  </Button>
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${allServices.find(s => s.name === formData.service)?.gradient} shadow-lg`}>
                      {(() => {
                        const Icon = allServices.find(s => s.name === formData.service)?.icon || Sparkles;
                        return <Icon className="w-5 h-5 text-white" />;
                      })()}
                    </div>
                    <span className="font-medium text-foreground">{formData.service}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">Your Contact Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-base font-medium">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          placeholder="Enter your full name"
                          className="h-12 rounded-xl border-2 focus:border-primary transition-all duration-300"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-base font-medium">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="(555) 123-4567"
                          className="h-12 rounded-xl border-2 focus:border-primary transition-all duration-300"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base font-medium">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                        className="h-12 rounded-xl border-2 focus:border-primary transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 shadow-lg hover:shadow-xl group" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                        Submitting Request...
                      </>
                    ) : (
                      <>
                        Get Your Free Quote
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <CongratsNotification 
        name={formData.fullName}
        show={showCongrats}
        onClose={() => setShowCongrats(false)}
      />
    </>
  );
};

export default AppointmentBooking;