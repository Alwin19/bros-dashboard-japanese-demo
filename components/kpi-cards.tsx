import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

// helper: IDR formatter
const toIDR = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

// Helper: delay function
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fetching data directly from backend
export default async function KPICardsComponent() {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  const params = "hospital_id=1&start_date=2025-01-01&end_date=2025-01-31";

  // Fetch endpoints sequentially with delays to avoid rate limiting
  const pendapatanRes = await fetch(`${baseUrl}/dashboard/keuangan/totalPendapatanJKN?${params}`, {
    next: { revalidate: 86400 }
  });
  await delay(500); // Wait 500ms between requests

  const selisihRes = await fetch(`${baseUrl}/dashboard/keuangan/totalSelisihJKN?${params}`, {
    next: { revalidate: 86400 }
  });
  await delay(500); // Wait 500ms between requests

  const penerimaanRes = await fetch(`${baseUrl}/dashboard/keuangan/totalPenerimaan?${params}`, {
    next: { revalidate: 86400 }
  });


  const pendapatanData = (await pendapatanRes.json()).data;
  const selisihData = (await selisihRes.json()).data;
  const penerimaanData = (await penerimaanRes.json()).data;

  const kpiData = [
    {
      title: "Total Pendapatan JKN",
      value: toIDR(pendapatanData.pendapatan),
      change: `${pendapatanData.persentase_perubahan}%`,
      trend: pendapatanData.persentase_perubahan >= 0 ? "up" : "down",
      subtitle: "Bulan Ini",
    },
    {
      title: "Total Selisih JKN",
      value: toIDR(selisihData.selisih),
      change: `${selisihData.persentase_perubahan}%`,
      trend: selisihData.persentase_perubahan >= 0 ? "up" : "down",
      subtitle: "Bulan Ini",
    },
    {
      title: "Total Penerimaan JKN",
      value: toIDR(penerimaanData.penerimaan),
      change: `${penerimaanData.persentase_perubahan}%`,
      trend: penerimaanData.persentase_perubahan >= 0 ? "up" : "down",
      subtitle: "Bulan Ini",
    },
  ];

  return <KPICards kpiData={kpiData} />;
}

function KPICards({ kpiData }: { kpiData: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {kpiData.map((kpi, index) => (
        <Card key={index} className="bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{kpi.title}</p>
                <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                <p className="text-xs text-muted-foreground">{kpi.subtitle}</p>
              </div>
              <div className="flex items-center space-x-1">
                {kpi.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-success" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-destructive" />
                )}
                <span
                  className={`text-sm font-medium ${
                    kpi.trend === "up" ? "text-success" : "text-destructive"
                  }`}
                >
                  {kpi.change}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}