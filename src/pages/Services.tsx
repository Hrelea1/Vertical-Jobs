import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building, Home, Construction, Wrench, Truck, Hammer, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const mainServices = [
    {
      icon: <Building className="w-12 h-12 text-accent" />,
      title: "Fachadas",
      description: "Rehabilitación y mantenimiento de fachadas con técnicas modernas y materiales de alta calidad para garantizar durabilidad y estética.",
      features: [
        "Limpieza y Restauración de Fachadas",
        "Reparación de Grietas y Fisuras",
        "Aplicación de Monocapa",
        "Impermeabilización de Fachadas"
      ],
      price: "Desde $50/m²"
    },
    {
      icon: <Home className="w-12 h-12 text-accent" />,
      title: "Fontanería",
      description: "Servicios completos de plomería para instalaciones nuevas, reparaciones y mantenimiento de sistemas hidráulicos.",
      features: [
        "Instalación de Tuberías y Sistemas",
        "Reparación de Fugas y Averías",
        "Mantenimiento Preventivo",
        "Instalación de Bajantes"
      ],
      price: "Desde $40/hora"
    },
    {
      icon: <Construction className="w-12 h-12 text-accent" />,
      title: "Cubiertas y Tejados",
      description: "Construcción, reparación y mantenimiento de cubiertas y tejados con materiales impermeables y duraderos.",
      features: [
        "Construcción de Tejados Nuevos",
        "Reparación de Tejados Existentes",
        "Impermeabilización de Cubiertas",
        "Instalación de Canalones"
      ],
      price: "Desde $60/m²"
    },
    {
      icon: <Wrench className="w-12 h-12 text-accent" />,
      title: "Pinturas",
      description: "Servicios profesionales de pintura interior y exterior con acabados perfectos y materiales de primera calidad.",
      features: [
        "Pintura Interior y Exterior",
        "Preparación y Tratamiento de Superficies",
        "Aplicación de Esmaltes y Barnices",
        "Acabados Decorativos Especiales"
      ],
      price: "Desde $15/m²"
    }
  ];

  const additionalServices = [
    {
      icon: <Truck className="w-8 h-8 text-primary" />,
      title: "Patios",
      description: "Construcción y renovación de patios con materiales duraderos y diseños funcionales."
    },
    {
      icon: <Hammer className="w-8 h-8 text-primary" />,
      title: "Bajantes",
      description: "Instalación y reparación de sistemas de bajantes para evacuación de aguas pluviales."
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Monocapa",
      description: "Aplicación profesional de revestimientos monocapa para protección y estética de fachadas."
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Urgencias 24h",
      description: "Servicios de emergencia disponibles las 24 horas para reparaciones urgentes."
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 hero-section">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Nuestros Servicios
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in">
            Soluciones integrales de construcción vertical para todo tipo de proyectos. Del concepto a la finalización, te tenemos cubierto.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Servicios Principales de Construcción
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Servicios profesionales de construcción adaptados a tus necesidades específicas y presupuesto
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
                        Obtener Cotización
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
              Servicios Adicionales
            </h2>
            <p className="text-xl text-muted-foreground">
              Servicios de apoyo para garantizar el éxito del proyecto de principio a fin
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
              Nuestro Proceso
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Un enfoque sistemático que asegura resultados de calidad y ejecución fluida del proyecto
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: "01", title: "Consulta", description: "Discusión inicial del proyecto y evaluación de necesidades" },
              { step: "02", title: "Planificación", description: "Planificación detallada del proyecto y desarrollo del diseño" },
              { step: "03", title: "Permisos", description: "Obtención de todos los permisos y aprobaciones necesarios" },
              { step: "04", title: "Construcción", description: "Construcción profesional con actualizaciones regulares" },
              { step: "05", title: "Finalización", description: "Inspección final y entrega del proyecto" }
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
              Nuestras Garantías
            </h2>
            <p className="text-xl text-muted-foreground">
              Tu tranquilidad es nuestra prioridad
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="construction-card text-center">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Garantía de Calidad
                </h3>
                <p className="text-muted-foreground">
                  Garantía de 2 años en todos los trabajos de construcción con cobertura integral
                </p>
              </CardContent>
            </Card>
            <Card className="construction-card text-center">
              <CardContent className="p-6">
                <Clock className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Finalización a Tiempo
                </h3>
                <p className="text-muted-foreground">
                  Proyectos completados según cronograma o cubrimos los costos de retraso
                </p>
              </CardContent>
            </Card>
            <Card className="construction-card text-center">
              <CardContent className="p-6">
                <Building className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Protección de Presupuesto
                </h3>
                <p className="text-muted-foreground">
                  Contratos a precio fijo sin tarifas ocultas o cargos sorpresa
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
            ¿Listo Para Comenzar Tu Proyecto?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Obtén una cotización detallada para tu proyecto de construcción hoy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="cta-button text-white px-8 py-6 text-lg">
                Cotización Gratis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-white text-white hover:bg-white hover:text-primary">
                Conoce Sobre Nosotros
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;