import { useEffect } from 'react';
import { CheckCircle, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CongratsNotificationProps {
  name: string;
  onClose: () => void;
  show: boolean;
}

const CongratsNotification = ({ name, onClose, show }: CongratsNotificationProps) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto close after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <Card className="max-w-md w-full bg-gradient-to-br from-primary/10 to-secondary/20 border-2 border-primary/20 shadow-2xl animate-scale-in">
        <div className="p-8 text-center">
          <div className="relative mb-6">
            <CheckCircle className="w-16 h-16 text-primary mx-auto" />
            <Sparkles className="w-6 h-6 text-primary absolute -top-2 -right-2 animate-pulse" />
            <Sparkles className="w-4 h-4 text-secondary absolute -bottom-1 -left-2 animate-pulse delay-300" />
          </div>
          
          <h2 className="text-3xl font-bold text-foreground mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Congratulations, {name}! 🎉
          </h2>
          
          <p className="text-muted-foreground mb-6 text-lg">
            Your request has been submitted successfully! We'll be in touch within 24 hours to discuss your project.
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Free consultation included</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Expert advice guaranteed</span>
            </div>
          </div>
          
          <Button 
            onClick={onClose} 
            className="mt-6 w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
            size="lg"
          >
            Awesome!
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CongratsNotification;