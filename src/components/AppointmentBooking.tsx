import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  scheduledDate: string;
  scheduledTime: string;
  message: string;
}

const AppointmentBooking = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    scheduledDate: '',
    scheduledTime: '',
    message: ''
  });

  const services = [
    'Residential Construction',
    'Commercial Construction', 
    'Renovations & Remodeling',
    'Foundation Work',
    'Roofing Services',
    'Electrical Installation',
    'Plumbing Services',
    'Consultation'
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): string | null => {
    if (!formData.fullName.trim()) return 'Full name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!formData.service) return 'Please select a service';
    if (!formData.scheduledDate) return 'Please select a date';
    if (!formData.scheduledTime) return 'Please select a time';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return 'Please enter a valid email';
    
    const selectedDate = new Date(`${formData.scheduledDate}T${formData.scheduledTime}`);
    if (selectedDate <= new Date()) return 'Appointment must be scheduled for a future date and time';
    
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
      const scheduledAt = new Date(`${formData.scheduledDate}T${formData.scheduledTime}`).toISOString();
      
      const { error } = await supabase
        .from('appointments')
        .insert({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone || null,
          service: formData.service,
          scheduled_at: scheduledAt,
          message: formData.message || null
        });

      if (error) {
        throw error;
      }

      setIsSuccess(true);
      toast({
        title: "Appointment Booked!",
        description: "We'll contact you shortly to confirm your appointment.",
      });
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        service: '',
        scheduledDate: '',
        scheduledTime: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast({
        variant: "destructive",
        title: "Booking Failed",
        description: "There was an error booking your appointment. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetSuccess = () => {
    setIsSuccess(false);
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-foreground mb-2">Appointment Booked!</h3>
        <p className="text-muted-foreground mb-6">
          Thank you for booking with BuildPro Construction. We'll contact you within 24 hours to confirm your appointment.
        </p>
        <Button onClick={resetSuccess} variant="outline">
          Book Another Appointment
        </Button>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Calendar className="w-6 h-6" />
          Book Your Appointment
        </CardTitle>
        <CardDescription>
          Schedule a consultation with our construction experts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service">Service *</Label>
              <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="scheduledDate">Preferred Date *</Label>
              <Input
                id="scheduledDate"
                type="date"
                value={formData.scheduledDate}
                onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scheduledTime">Preferred Time *</Label>
              <Select value={formData.scheduledTime} onValueChange={(value) => handleInputChange('scheduledTime', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {time}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Details</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Tell us about your project, specific requirements, or any questions you have..."
              rows={4}
            />
          </div>

          <div className="flex items-start gap-2 p-4 bg-secondary/50 rounded-lg">
            <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-1">Please note:</p>
              <ul className="space-y-1">
                <li>• All appointments are subject to availability</li>
                <li>• We'll confirm your booking within 24 hours</li>
                <li>• Consultations are free of charge</li>
              </ul>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Booking Appointment...
              </>
            ) : (
              <>
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AppointmentBooking;