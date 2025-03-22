"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MarketPriceTable } from "@/components/market-price-table";
import { useState } from "react";

interface PricesTabProps {
  states: string[];
  commodities: string[];
}

export function PricesTab({ states, commodities }: PricesTabProps) {
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedCommodity, setSelectedCommodity] = useState("");
  const [district, setDistrict] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({
    state: "All States",
    commodity: "",
    district: "",
  });

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
    <div className="p-4 border rounded-md mt-2">
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
          <Button onClick={clearFilters} variant="outline" className="ml-2">
            Clear Filters
          </Button>
        </div>
      </div>
      <MarketPriceTable
        state={appliedFilters.state}
        commodity={appliedFilters.commodity}
        district={appliedFilters.district}
      />
    </div>
  );
}
