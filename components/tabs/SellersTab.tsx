"use client";

import { SellersList } from "@/components/sellers-list";
import { useEffect, useState } from "react";

export function SellersTab() {
  const [sellers, setSellers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchSellers() {
      try {
        const response = await fetch("/api/produce");
        const data = await response.json();
        console.log(data);
        setSellers(data);
      } catch (error) {
        console.error("Error fetching sellers:", error);
      }
    }
    fetchSellers();
  }, []);

  return (
    <div className="p-4 border rounded-md mt-2">
      <SellersList sellers={sellers} />
    </div>
  );
}
