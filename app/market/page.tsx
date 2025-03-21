"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MarketPriceTable } from "@/components/market-price-table";
import { MarketTrends } from "@/components/market-trends";
import { useState } from "react";
import trendsData from "@/constants/trends.json";

export default function MarketPage() {
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedCommodity, setSelectedCommodity] = useState("");
  const [district, setDistrict] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({
    state: "All States",
    commodity: "",
    district: "",
  });

  const states = [
    "All States",
    "Maharashtra",
    "Punjab",
    "Haryana",
    "Uttar Pradesh",
    "Madhya Pradesh",
  ];
  const commodities = trendsData.data.map((d) => d[1]);

  const applyFilters = () => {
    setAppliedFilters({
      state: selectedState,
      commodity: selectedCommodity,
      district,
    });
  };

  const clearFilters = () => {
    setSelectedState("All States");
    setSelectedCommodity("");
    setDistrict("");
    setAppliedFilters({
      state: "All States",
      commodity: "",
      district: "",
    });
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Market Prices & Trading</h1>
          <p className="text-muted-foreground">
            Get real-time market prices, trends, and connect directly with
            buyers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Market Overview</CardTitle>
              <CardDescription>
                Today's summary of major commodities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Wheat</span>
                  <div className="flex items-center">
                    <span className="font-medium">₹2,150</span>
                    <span className="text-green-500 text-sm ml-2">+1.2%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Rice (Basmati)</span>
                  <div className="flex items-center">
                    <span className="font-medium">₹3,450</span>
                    <span className="text-green-500 text-sm ml-2">+0.8%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Soybean</span>
                  <div className="flex items-center">
                    <span className="font-medium">₹4,200</span>
                    <span className="text-red-500 text-sm ml-2">-0.5%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Cotton</span>
                  <div className="flex items-center">
                    <span className="font-medium">₹6,300</span>
                    <span className="text-green-500 text-sm ml-2">+2.1%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Sugarcane</span>
                  <div className="flex items-center">
                    <span className="font-medium">₹290</span>
                    <span className="text-red-500 text-sm ml-2">-0.3%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Price Trends</CardTitle>
              <CardDescription>
                5-years price movement for selected commodity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <Select onValueChange={(value) => setSelectedCommodity(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select commodity" />
                  </SelectTrigger>
                  <SelectContent>
                    {commodities.map((commodity) => (
                      <SelectItem value={commodity} key={commodity}>
                        {commodity}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="h-[250px]">
                <MarketTrends
                  commodity={
                    selectedCommodity === "" ? "wheat" : selectedCommodity
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="prices" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="prices">Mandi Prices</TabsTrigger>
            <TabsTrigger value="buyers">Connect with Buyers</TabsTrigger>
            <TabsTrigger value="sell">Sell Your Produce</TabsTrigger>
          </TabsList>
          <TabsContent value="prices" className="p-4 border rounded-md mt-2">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Mandi Prices</h3>
                <p className="text-muted-foreground">
                  Current prices at major agricultural markets across India
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Select onValueChange={setSelectedState}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem value={state} key={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={setSelectedCommodity}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {commodities.map((commodity) => (
                      <SelectItem value={commodity} key={commodity}>
                        {commodity}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input
                  type="text"
                  placeholder="Enter district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="flex h-10 w-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <Button onClick={applyFilters} className="ml-2">
                  Apply Filters
                </Button>
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="ml-2"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
            <MarketPriceTable
              state={appliedFilters.state}
              commodity={appliedFilters.commodity}
              district={appliedFilters.district}
            />
          </TabsContent>
          <TabsContent value="buyers" className="p-4 border rounded-md mt-2">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Connect with Buyers
                </h3>
                <p className="text-muted-foreground">
                  Find and connect directly with wholesale buyers, food
                  processors, and retail chains
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i}>
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-1">Buyer Name {i}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {i % 2 === 0 ? "Wholesale Buyer" : "Food Processor"}
                      </p>
                      <p className="text-sm mb-4">
                        Looking for:{" "}
                        {i % 3 === 0
                          ? "Wheat, Rice"
                          : i % 3 === 1
                          ? "Vegetables, Fruits"
                          : "Pulses, Oilseeds"}
                      </p>
                      <Button size="sm" className="w-full">
                        Contact Buyer
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex justify-center">
                <Button variant="outline">View More Buyers</Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="sell" className="p-4 border rounded-md mt-2">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Sell Your Produce
                </h3>
                <p className="text-muted-foreground">
                  List your agricultural produce for sale and receive offers
                  from verified buyers
                </p>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Crop Type</label>
                        <Select defaultValue="wheat">
                          <SelectTrigger>
                            <SelectValue placeholder="Select crop" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wheat">Wheat</SelectItem>
                            <SelectItem value="rice">Rice</SelectItem>
                            <SelectItem value="pulses">Pulses</SelectItem>
                            <SelectItem value="vegetables">
                              Vegetables
                            </SelectItem>
                            <SelectItem value="fruits">Fruits</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Quantity (Quintals)
                        </label>
                        <input
                          type="number"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter quantity"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Expected Price (₹ per Quintal)
                        </label>
                        <input
                          type="number"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter price"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Quality Grade
                        </label>
                        <Select defaultValue="a">
                          <SelectTrigger>
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="a">Grade A</SelectItem>
                            <SelectItem value="b">Grade B</SelectItem>
                            <SelectItem value="c">Grade C</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <input
                          type="text"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter your location"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Available Until
                        </label>
                        <input
                          type="date"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mt-6">List Your Produce</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </main>
  );
}
