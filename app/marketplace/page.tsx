"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MarketOverview } from "@/components/market-overview";
import { PricesTab } from "@/components/tabs/PricesTab";
import { SellersTab } from "@/components/tabs/SellersTab";
import { SellTab } from "@/components/tabs/SellTab";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import trendsData from "@/constants/trends.json";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarketTrends } from "@/components/market-trends";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";

export default function MarketPlace() {
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
          <h1 className="text-3xl font-bold mb-2">Market Place For Trading</h1>
          <p className="text-muted-foreground">
            Farmers can list there produce and sell directly to vendors. Our job
            is to connect the farmers with the vendors.
          </p>
        </div>

        <Tabs defaultValue="sellers" className="mb-8">
          <TabsList className="grid w-full grid-cols-1">
            {session?.user.role === "vendor" ? (
              <TabsTrigger value="sellers">Sellers</TabsTrigger>
            ) : (
              <TabsTrigger value="sell">Sell Your Produce</TabsTrigger>
            )}
          </TabsList>

          {session?.user.role === "vendor" ? (
            <TabsContent value="sellers">
              <SellersTab />
            </TabsContent>
          ) : (
            <TabsContent value="sell">
              <SellTab commodities={commodities} />
            </TabsContent>
          )}
        </Tabs>
      </div>
      <Footer />
    </main>
  );
}
