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
        throw new Error("Failed to fetch KPI data");
      }

      const [pendapatan, selisih, penerimaan] = await Promise.all([
        pendapatanRes.json(),
        selisihRes.json(),
        penerimaanRes.json(),
      ]);

      const rawData = {
        pendapatan: pendapatan.data,
        selisih: selisih.data,
        penerimaan: penerimaan.data,
      };

      // Clean and return ready-to-use data
      return cleanKPIData(rawData);
    },
    // ✅ Cache key includes all parameters
    ["kpi-data", hospitalId, startDate, endDate],
    {
      revalidate: 86400,
      tags: ["kpi-data"],
    }
  )();
};