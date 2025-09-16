import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronUp, User, Calendar, Phone, Mail, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface Appointment {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  service: string | null;
  created_at: string;
  scheduled_at: string;
  status: string;
}

const Dashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { profile, signOut } = useAuth();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch appointments",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Appointments Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage and view all appointment bookings - Welcome, {profile?.username}!
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={signOut}
          >
            Logout
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="grid gap-4">
              {appointments.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Appointments</h3>
                    <p className="text-muted-foreground">
                      No appointments have been booked yet.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                appointments.map((appointment) => {
                  const isExpanded = expandedCards.has(appointment.id);
                  return (
                    <Card
                      key={appointment.id}
                      className="transition-all duration-300 hover:shadow-construction cursor-pointer"
                      onClick={() => toggleExpanded(appointment.id)}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{appointment.full_name}</CardTitle>
                              <p className="text-sm text-muted-foreground">
                                Booked on {formatDate(appointment.created_at)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              appointment.status === 'confirmed' 
                                ? 'bg-green-100 text-green-800' 
                                : appointment.status === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {appointment.status}
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      
                      {isExpanded && (
                        <CardContent className="pt-0 animate-fade-in">
                          <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/20 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Mail className="w-4 h-4 text-primary" />
                              <div>
                                <p className="text-sm font-medium">Email</p>
                                <p className="text-sm text-muted-foreground">{appointment.email}</p>
                              </div>
                            </div>
                            
                            {appointment.phone && (
                              <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-primary" />
                                <div>
                                  <p className="text-sm font-medium">Phone</p>
                                  <p className="text-sm text-muted-foreground">{appointment.phone}</p>
                                </div>
                              </div>
                            )}
                            
                            {appointment.service && (
                              <div className="flex items-center gap-3 md:col-span-2">
                                <Settings className="w-4 h-4 text-primary" />
                                <div>
                                  <p className="text-sm font-medium">Service</p>
                                  <p className="text-sm text-muted-foreground">{appointment.service}</p>
                                </div>
                              </div>
                            )}
                            
                            <div className="flex items-center gap-3 md:col-span-2">
                              <Calendar className="w-4 h-4 text-primary" />
                              <div>
                                <p className="text-sm font-medium">Scheduled Date</p>
                                <p className="text-sm text-muted-foreground">
                                  {formatDate(appointment.scheduled_at)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  );
                })
              )}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default Dashboard;