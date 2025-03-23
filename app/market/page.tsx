"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MarketOverview } from "@/components/market-overview";
import { PricesTab } from "@/components/tabs/PricesTab";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import trendsData from "@/constants/trends.json";
import { MarketTrends } from "@/components/market-trends";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import AnalysisSection from "@/components/analysis-section";

export default function MarketPage() {
  const states = [
    "All States",
    "Maharashtra",
    "Punjab",
    "Haryana",
    "Uttar Pradesh",
    "Madhya Pradesh",
  ];
  const { data: session } = useSession();

  const commodities = trendsData.data.map((d) => d[1]);
  const [selectedCommodity, setSelectedCommodity] = useState("Rice");

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
          <MarketOverview />
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
                    <SelectValue placeholder="Select Commodity" />
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
              <MarketTrends commodity={selectedCommodity} />
            </CardContent>
          </Card>
        </div>
        <PricesTab states={states} commodities={commodities} />
        <AnalysisSection />
      </div>
      <Footer />
    </main>
  );
}
