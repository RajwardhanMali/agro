import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, MapPin, Calendar, Package } from "lucide-react";
import { format } from "date-fns";

interface Seller {
  commodity: string;
  quantity: number;
  price: number;
  location: string;
  availableUntil: string;
  farmer: {
    name: string;
    phone: string;
    district: string;
    state: string;
    _id: string;
  };
}

export function SellersList({ sellers }: { sellers: Seller[] }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Sellers' Production</h3>
        <p className="text-muted-foreground">
          View all the produce listed by farmers for sale.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sellers.map((seller, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">{seller.farmer.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {seller.farmer.district}, {seller.farmer.state}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">
                    <span className="font-medium">Commodity:</span>{" "}
                    {seller.commodity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">
                    <span className="font-medium">Quantity:</span>{" "}
                    {seller.quantity} Quintals
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">
                    <span className="font-medium">Price:</span> ₹{seller.price}{" "}
                    per Quintal
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">
                    <span className="font-medium">Mandi:</span>{" "}
                    {seller.location}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">
                    <span className="font-medium">Available Until:</span>{" "}
                    {format(new Date(seller.availableUntil), "dd MMM yyyy")}
                  </p>
                </div>
              </div>
              <Button size="sm" className="w-full mt-4">
                Contact Seller
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
