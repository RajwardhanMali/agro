import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WeatherDashboard } from "@/components/weather-dashboard";

export default function WeatherPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Weather & Crop Advisory</h1>
          <p className="text-muted-foreground">
            Get AI-driven weather forecasts and personalized crop
            recommendations
          </p>
        </div>
        <WeatherDashboard />
      </div>
      <Footer />
    </main>
  );
}
