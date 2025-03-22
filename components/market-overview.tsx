import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MarketOverview() {
  const overviewData = [
    { name: "Wheat", price: "₹2,150", change: "+1.2%", changeType: "positive" },
    { name: "Rice (Basmati)", price: "₹3,450", change: "+0.8%", changeType: "positive" },
    { name: "Soybean", price: "₹4,200", change: "-0.5%", changeType: "negative" },
    { name: "Cotton", price: "₹6,300", change: "+2.1%", changeType: "positive" },
    { name: "Sugarcane", price: "₹290", change: "-0.3%", changeType: "negative" },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Market Overview</CardTitle>
        <p className="text-muted-foreground">Today's summary of major commodities</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {overviewData.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span>{item.name}</span>
              <div className="flex items-center">
                <span className="font-medium">{item.price}</span>
                <span
                  className={`text-sm ml-2 ${
                    item.changeType === "positive" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
