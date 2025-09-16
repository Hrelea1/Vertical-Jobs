import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Phone, Mail, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-construction.jpg";
import servicesImage from "@/assets/services-construction.jpg";

const Index = () => {
  const services = [
    {
      title: "Fachadas",
      description: "Rehabilitación y mantenimiento de fachadas con técnicas modernas y materiales de calidad.",
      icon: "🏢"
    },
    {
      title: "Fontanería",
      description: "Instalación y reparación de sistemas de plomería profesional para todo tipo de edificios.",
      icon: "🔧"
    },
    {
      title: "Cubiertas y Tejados",
      description: "Construcción y reparación de cubiertas impermeables y sistemas de tejados duraderos.",
      icon: "🏠"
    },
    {
      title: "Pinturas",
      description: "Servicios de pintura interior y exterior con acabados perfectos y materiales premium.",
      icon: "🎨"
    }
  ];

  const testimonials = [
    {
      name: "María González",
      company: "Edificio Residencial Sol",
      text: "Vertical Jobs realizó un trabajo excepcional en la fachada de nuestro edificio. Profesionales, puntuales y dentro del presupuesto.",
      rating: 5
    },
    {
      name: "Carlos Ruiz",
      company: "Cliente Residencial",
      text: "La reparación de nuestro tejado fue perfecta gracias a la experiencia y atención al detalle del equipo.",
      rating: 5
    },
    {
      name: "Ana Martínez",
      company: "Martínez Propiedades",
      text: "Servicios de fontanería excepcionales. Superaron nuestras expectativas en todos los aspectos.",
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
            Construyendo Tu 
            <span className="bg-gradient-orange bg-clip-text text-transparent"> Visión</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in">
            Servicios profesionales de construcción vertical para proyectos comerciales, residenciales y de mantenimiento
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/contact">
              <Button size="lg" className="cta-button text-white px-8 py-6 text-lg">
                Cotización Gratis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-white text-white hover:bg-white hover:text-primary">
                Nuestros Servicios
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
              Nuestra Experiencia
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Del concepto a la ejecución, ofrecemos soluciones excepcionales de construcción vertical
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
                Ver Todos los Servicios
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
                25+ Años de Excelencia
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Vertical Jobs ha sido el socio de confianza en construcción para empresas y propietarios en toda la región. 
                Nuestro compromiso con la calidad, seguridad y satisfacción del cliente impulsa todo lo que hacemos.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-primary mr-3" />
                  <span className="text-foreground">Licenciados y Asegurados</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-primary mr-3" />
                  <span className="text-foreground">Equipo Certificado OSHA</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-primary mr-3" />
                  <span className="text-foreground">Soporte 24/7 de Proyecto</span>
                </div>
              </div>
              <Link to="/about">
                <Button size="lg" variant="outline">
                  Conoce Más Sobre Nosotros
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img 
                src={servicesImage} 
                alt="Servicios de Construcción" 
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
              Lo Que Dicen Nuestros Clientes
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              No nos creas solo a nosotros - escucha a nuestros clientes satisfechos
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
            ¿Listo Para Comenzar Tu Proyecto?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Ponte en contacto hoy para una consulta y cotización gratuita
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="cta-button text-white px-8 py-6 text-lg">
                Cotización Gratis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-white text-white hover:bg-white hover:text-primary">
              <Phone className="mr-2 w-5 h-5" />
              Llamar (555) 123-4567
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Vertical Jobs</h3>
              <p className="text-background/70">
                Servicios profesionales de construcción en los que puedes confiar.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-background/70">
                <li>Fachadas</li>
                <li>Fontanería</li>
                <li>Cubiertas y Tejados</li>
                <li>Pinturas</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <div className="space-y-2 text-background/70">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  (555) 123-4567
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  info@verticaljobs.com
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  123 Construcción Ave
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-background/70">
                <li><Link to="/about" className="hover:text-background transition-colors">Nosotros</Link></li>
                <li><Link to="/services" className="hover:text-background transition-colors">Servicios</Link></li>
                <li><Link to="/contact" className="hover:text-background transition-colors">Contacto</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/70">
            <p>&copy; 2024 Vertical Jobs. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;