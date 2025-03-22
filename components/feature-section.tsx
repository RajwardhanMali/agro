import {
  BarChart3,
  Cloud,
  CreditCard,
  FileText,
  ShoppingCart,
  Tractor,
  Video,
  Warehouse,
  Truck,
} from "lucide-react";

export function FeatureSection() {
  const features = [
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: "Market Prices & Direct Selling",
      description:
        "Live updates on commodity prices from mandis and e-NAM. Direct connection to buyers.",
    },
    {
      icon: <Truck className="h-10 w-10 text-primary" />,
      title: "Supply Chain & Logistics",
      description:
        "Crop demand forecasting and optimized supply chain management. Book transport services.",
    },
    {
      icon: <Cloud className="h-10 w-10 text-primary" />,
      title: "Weather & Crop Advisory",
      description:
        "AI-driven weather forecasts with local language support. Crop recommendations.",
    },
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: "Government Schemes",
      description:
        "Centralized portal for scheme eligibility and applications. AI chatbot assistance.",
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: "Microfinance & Credit",
      description:
        "Connect with banks & NBFCs for low-interest loans. Instant KCC application processing.",
    },
    {
      icon: <ShoppingCart className="h-10 w-10 text-primary" />,
      title: "Agricultural Inputs",
      description:
        "Verified sellers for seeds, fertilizers, and pesticides. Product authentication.",
    },
    {
      icon: <Tractor className="h-10 w-10 text-primary" />,
      title: "Equipment Rental",
      description:
        "P2P rental system for tractors, harvesters, and drones. Farmer collaboration.",
    },
    {
      icon: <Video className="h-10 w-10 text-primary" />,
      title: "Insights & Digital Literacy",
      description:
        "Video tutorials and live webinars in regional languages. Voice assistant for non-literate farmers.",
    },
    {
      icon: <Warehouse className="h-10 w-10 text-primary" />,
      title: "Post-Harvest Storage",
      description:
        "Cold storage and warehouse booking system. Guidance on reducing post-harvest losses.",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Comprehensive Agricultural Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform integrates multiple services to provide a complete
            solution for Indian farmers, enhancing productivity and income.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
