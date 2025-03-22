"use client";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { EquipmentModal } from "@/components/equipment-modal";
import { Card, CardContent } from "@/components/ui/card";
import { User, Package, Tag } from "lucide-react";
import { useSession } from "next-auth/react";

interface Equipment {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  vendor: {
    name: string;
    district: string;
    state: string;
    phone: string;
  };
}

export default function EquipmentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const { data: session } = useSession();
  useEffect(() => {
    async function fetchEquipment() {
      try {
        const response = await fetch("/api/equipment");
        if (!response.ok) {
          throw new Error("Failed to fetch equipment");
        }
        const data = await response.json();
        setEquipmentList(data);
      } catch (error) {
        console.error("Error fetching equipment:", error);
      }
    }

    fetchEquipment();
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Equipment for Rent</h1>
          {session?.user.role === "vendor" && (
            <Button onClick={() => setIsModalOpen(true)}>
              + Add Equipment
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {equipmentList.map((equipment) => (
            <Card key={equipment.id}>
              <CardContent className="pt-6">
                <img
                  src={equipment.image}
                  alt={equipment.title}
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{equipment.vendor.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {equipment.vendor.district}, {equipment.vendor.state}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">
                      <span className="font-medium">Title:</span>{" "}
                      {equipment.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">
                      <span className="font-medium">Description:</span>{" "}
                      {equipment.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">
                      <span className="font-medium">Price:</span> ₹
                      {equipment.price} per day
                    </p>
                  </div>
                </div>
                <Button size="sm" className="w-full mt-4" asChild>
                  <a href={`tel:${equipment.vendor.phone}`}>Contact Vendor</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
      {isModalOpen && <EquipmentModal onClose={() => setIsModalOpen(false)} />}
    </main>
  );
}
