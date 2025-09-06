import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronUp, User, Calendar, Phone, Mail, Settings } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple hardcoded authentication - in production this would be proper auth
    if (loginId === "admin" && password === "dashboard123") {
      setIsLoggedIn(true);
      fetchAppointments();
      toast({
        title: "Login Successful",
        description: "Welcome to the dashboard!",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Try admin/dashboard123",
        variant: "destructive",
      });
    }
  };

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

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
              <Settings className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl">Dashboard Login</CardTitle>
            <p className="text-muted-foreground">Access the appointments dashboard</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="loginId">Login ID</Label>
                <Input
                  id="loginId"
                  type="text"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="Enter your login ID"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login to Dashboard
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Demo credentials: admin / dashboard123
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Appointments Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage and view all appointment bookings
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setIsLoggedIn(false)}
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