import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Award, Users, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import teamImage from "@/assets/team-construction.jpg";

const About = () => {
  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "25+", label: "Years Experience" },
    { number: "50+", label: "Team Members" },
    { number: "99%", label: "Client Satisfaction" }
  ];

  const values = [
    {
      icon: <Award className="w-8 h-8 text-accent" />,
      title: "Quality First",
      description: "Every project meets the highest standards of craftsmanship and durability."
    },
    {
      icon: <Users className="w-8 h-8 text-accent" />,
      title: "Expert Team",
      description: "Skilled professionals with decades of combined construction experience."
    },
    {
      icon: <Calendar className="w-8 h-8 text-accent" />,
      title: "On-Time Delivery",
      description: "We pride ourselves on meeting deadlines and staying on schedule."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-accent" />,
      title: "Safety Commitment",
      description: "OSHA-certified processes ensuring the highest safety standards on every job."
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 hero-section">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Sobre Vertical Jobs
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in">
            Construyendo excelencia, un proyecto a la vez. Conoce nuestro compromiso con la construcción de calidad y la satisfacción del cliente.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Nuestra Historia
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Fundada en 1999, Vertical Jobs comenzó como una pequeña empresa familiar de construcción con una misión simple: 
                entregar servicios excepcionales de construcción con integridad, calidad y un enfoque centrado en el cliente.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Durante los últimos 25 años, hemos crecido hasta convertirnos en uno de los socios de construcción más confiables de la región, 
                completando más de 500 proyectos exitosos que van desde hogares personalizados hasta grandes desarrollos comerciales.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Hoy, nuestro equipo de más de 50 profesionales capacitados continúa manteniendo los mismos valores que iniciaron nuestra empresa: 
                artesanía de calidad, comunicación transparente y compromiso inquebrantable con la satisfacción del cliente.
              </p>
            </div>
            <div className="relative">
              <img 
                src={teamImage} 
                alt="BuildPro Team" 
                className="rounded-lg shadow-construction w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              By the Numbers
            </h2>
            <p className="text-xl text-muted-foreground">
              Our track record speaks for itself
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision and every project
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="construction-card text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Leadership */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-muted-foreground">
              Meet the experienced professionals leading BuildPro
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="construction-card text-center">
              <CardContent className="p-6">
                <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  John Mitchell
                </h3>
                <p className="text-accent font-medium mb-3">
                  Founder & CEO
                </p>
                <p className="text-muted-foreground text-sm">
                  25+ years in construction management. Licensed Professional Engineer with expertise in commercial and residential projects.
                </p>
              </CardContent>
            </Card>
            <Card className="construction-card text-center">
              <CardContent className="p-6">
                <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Award className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Sarah Rodriguez
                </h3>
                <p className="text-accent font-medium mb-3">
                  Project Director
                </p>
                <p className="text-muted-foreground text-sm">
                  Oversees all major projects with 20+ years experience. Certified Project Management Professional (PMP).
                </p>
              </CardContent>
            </Card>
            <Card className="construction-card text-center">
              <CardContent className="p-6">
                <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Mike Thompson
                </h3>
                <p className="text-accent font-medium mb-3">
                  Safety Director
                </p>
                <p className="text-muted-foreground text-sm">
                  OSHA 30-hour certified safety expert ensuring compliance and worker safety on all job sites.
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
            Ready to Work Together?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Experience the BuildPro difference on your next construction project
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="cta-button text-white px-8 py-6 text-lg">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-white text-white hover:bg-white hover:text-primary">
                View Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;