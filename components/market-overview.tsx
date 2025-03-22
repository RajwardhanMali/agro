import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import trendsData from "@/constants/trends.json";
export function MarketOverview() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Market Overview</CardTitle>
        <p className="text-muted-foreground">
          Today's summary of major commodities
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trendsData.data.map(
            (item, index) =>
              index % 2 == 0 && (
                <div key={index} className="flex justify-between items-center">
                  <span>{item[1]}</span>
                  <div className="flex items-center">
                    <span className="font-medium">₹{item[2]}</span>
                    <span
                      className={`text-sm ml-2 ${
                        Number(item[2]) - Number(item[3]) > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {((Number(item[2]) - Number(item[3])) / 10).toFixed(1)}%
                    </span>
                  </div>
                </div>
              )
          )}
        </div>
      </CardContent>
    </Card>
  );
}
