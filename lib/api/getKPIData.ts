import { unstable_cache } from "next/cache";
import { cleanKPIData } from "./dataCleaner";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

// Fetch KPI Data with 24h cache
export const getKPIData = async (
  hospitalId: string,
  startDate: string,
  endDate: string
) => {
  return unstable_cache(
    async () => {
      try {
        const params = `hospital_id=${hospitalId}&start_date=${startDate}&end_date=${endDate}`;

        const [pendapatanRes, selisihRes, penerimaanRes] = await Promise.all([
          fetch(`${BASE_URL}/dashboard/keuangan/totalPendapatanJKN?${params}`, {
            next: { revalidate: 86400 },
          }),
          fetch(`${BASE_URL}/dashboard/keuangan/totalSelisihJKN?${params}`, {
            next: { revalidate: 86400 },
          }),
          fetch(`${BASE_URL}/dashboard/keuangan/totalPenerimaan?${params}`, {
            next: { revalidate: 86400 },
          }),
        ]);

        if (!pendapatanRes.ok || !selisihRes.ok || !penerimaanRes.ok) {
          throw new Error(`API error: ${pendapatanRes.status}`);
        }

        const [pendapatan, selisih, penerimaan] = await Promise.all([
          pendapatanRes.json(),
          selisihRes.json(),
          penerimaanRes.json(),
        ]);

        const rawData = {
          pendapatan: pendapatan.data || {},
          selisih: selisih.data || {},
          penerimaan: penerimaan.data || {},
        };

        return cleanKPIData(rawData);
        
      } catch (error) {
        console.error("KPI data error:", error);
        return [];
      }
    },
    ["kpi-data", hospitalId, startDate, endDate],
    {
      revalidate: 86400,
      tags: ["kpi-data"],
    }
  )();
};