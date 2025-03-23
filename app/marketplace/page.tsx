"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SellersTab } from "@/components/tabs/SellersTab";
import { SellTab } from "@/components/tabs/SellTab";

import { useState } from "react";
import trendsData from "@/constants/trends.json";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useSession } from "next-auth/react";

export default function MarketPlace() {
  const { data: session } = useSession();

  const commodities = trendsData.data.map((d) => d[1]);

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

        {session?.user.role === "vendor" ? (
          <Tabs defaultValue="sellers" className="mb-8">
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="sellers">Sellers</TabsTrigger>
            </TabsList>

            <TabsContent value="sellers">
              <SellersTab />
            </TabsContent>
          </Tabs>
        ) : (
          <Tabs defaultValue="sell" className="mb-8">
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="sell">Sell Your Produce</TabsTrigger>
            </TabsList>

            <TabsContent value="sell">
              <SellTab commodities={commodities} />
            </TabsContent>
          </Tabs>
        )}
      </div>
      <Footer />
    </main>
  );
}
