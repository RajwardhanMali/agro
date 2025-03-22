import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface SellTabProps {
  commodities: string[];
}

export function SellTab({ commodities }: SellTabProps) {
  const [formData, setFormData] = useState({
    commodity: "",
    quantity: "",
    price: "",
    grade: "Grade A",
    availableUntil: "",
  });
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      alert("You must be logged in to list your produce.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/produce", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Produce listed successfully!");
        setFormData({
          commodity: "",
          quantity: "",
          price: "",
          grade: "Grade A",
          availableUntil: "",
        });
      } else {
        const error = await response.json();
        alert(error.message || "Failed to list produce.");
      }
    } catch (error) {
      console.error("Error listing produce:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-md mt-2">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Sell Your Produce</h3>
          <p className="text-muted-foreground">
            List your agricultural produce for sale and receive offers from
            verified buyers.
          </p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onSubmit={handleSubmit}
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Commodity Type</label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("commodity", value)
                    }
                  >
                    <SelectTrigger className="w-full">
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
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Quantity (Quintals)
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter quantity"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Expected Price (₹ per Quintal)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter price"
                    required
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quality Grade</label>
                  <Select
                    defaultValue="Grade A"
                    onValueChange={(value) =>
                      handleSelectChange("grade", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grade A">Grade A</SelectItem>
                      <SelectItem value="Grade B">Grade B</SelectItem>
                      <SelectItem value="Grade C">Grade C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Available Until</label>
                  <input
                    type="date"
                    name="availableUntil"
                    value={formData.availableUntil}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full mt-6" disabled={loading}>
                {loading ? "Listing..." : "List Your Produce"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
