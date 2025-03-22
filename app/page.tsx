import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { HeroSection } from "@/components/hero-section";
import { FeatureSection } from "@/components/feature-section";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <section className="py-16 px-4 md:px-8 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explore Our Services
          </h2>
          <Tabs defaultValue="market" className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-9 mb-8">
              <TabsTrigger value="market">Market Prices</TabsTrigger>
              <TabsTrigger value="weather">Weather</TabsTrigger>
              <TabsTrigger value="schemes">Schemes</TabsTrigger>
              <TabsTrigger value="finance">Finance</TabsTrigger>
              <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
              <TabsTrigger value="Insights">Insights</TabsTrigger>
              <TabsTrigger value="storage">Storage</TabsTrigger>
              <TabsTrigger value="supply">Supply Chain</TabsTrigger>
            </TabsList>
            <TabsContent value="market" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Real-Time Market Prices & Direct Selling
                  </h3>
                  <p className="mb-4">
                    Get live updates on commodity prices from mandis and e-NAM.
                    Connect directly with buyers to reduce dependency on
                    middlemen.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-card p-4 rounded-lg shadow">
                      <h4 className="font-medium mb-2">Today's Prices</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Wheat (Mandi Avg.)</span>
                          <span className="font-semibold">₹2,150/quintal</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rice (Basmati)</span>
                          <span className="font-semibold">₹3,450/quintal</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Soybean</span>
                          <span className="font-semibold">₹4,200/quintal</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-card p-4 rounded-lg shadow">
                      <h4 className="font-medium mb-2">Price Trends</h4>
                      <div className="h-40 flex items-center justify-center">
                        <p className="text-muted-foreground">
                          Price trend chart will appear here
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button asChild className="mt-6">
                    <Link href="/market">View All Market Data</Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="weather" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Weather & Crop Advisory
                  </h3>
                  <p className="mb-4">
                    AI-driven weather forecasts with local language support.
                    Receive crop recommendations based on soil health and
                    climate patterns.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-card p-4 rounded-lg shadow">
                      <h4 className="font-medium mb-2">Today's Weather</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-3xl font-bold">32°C</p>
                          <p className="text-muted-foreground">Partly Cloudy</p>
                        </div>
                        <div>
                          <p>
                            <span className="font-medium">Humidity:</span> 65%
                          </p>
                          <p>
                            <span className="font-medium">Wind:</span> 12 km/h
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-card p-4 rounded-lg shadow">
                      <h4 className="font-medium mb-2">Crop Advisory</h4>
                      <p className="text-sm">
                        Based on current weather patterns, consider delaying
                        irrigation for wheat crops. Ideal time for sowing
                        mustard in northern regions.
                      </p>
                    </div>
                  </div>
                  <Button asChild className="mt-6">
                    <Link href="/weather">View Detailed Forecast</Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            {/* Other tab contents would follow the same pattern */}
            <TabsContent value="schemes" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Government Schemes & Subsidy Assistance
                  </h3>
                  <p>
                    Access a centralized portal to check eligibility and apply
                    for government schemes. Use our AI chatbot for easy
                    navigation and document verification.
                  </p>
                  <Button asChild className="mt-6">
                    <Link href="/schemes">Explore Schemes</Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            {/* Additional tab contents would be implemented similarly */}
          </Tabs>
        </div>
      </section>
      <Footer />
    </main>
  );
}
