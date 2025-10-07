import { unstable_cache } from "next/cache";
import { cleanRevenueData } from "./dataCleaner";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const getRevenueData = async (
  hospitalId: string,
  startDate: string,
  endDate: string
) => {
  return unstable_cache(
    async () => {
      try {
        const params = `hospital_id=${hospitalId}&start_date=${startDate}&end_date=${endDate}&limit=5`;
        const trendParams = `hospital_id=${hospitalId}&start_date=${startDate}&end_date=${endDate}&unit=all`;

        // Fetch top, bottom, and trend in parallel
        const [tertinggiRes, terendahRes, trendRes] = await Promise.all([
          fetch(`${BASE_URL}/dashboard/keuangan/pendapatanJKN/top?${params}`, {
            next: { revalidate: 86400 },
          }),
          fetch(`${BASE_URL}/dashboard/keuangan/pendapatanJKN/bottom?${params}`, {
            next: { revalidate: 86400 },
          }),
          fetch(`${BASE_URL}/dashboard/keuangan/pendapatanJKN/trend?${trendParams}`, {
            next: { revalidate: 86400 },
          }),
        ]);

        if (!tertinggiRes.ok || !terendahRes.ok || !trendRes.ok) {
          throw new Error(`API error: ${tertinggiRes.status}`);
        }

        const [tertinggi, terendah, trend] = await Promise.all([
          tertinggiRes.json(),
          terendahRes.json(),
          trendRes.json(),
        ]);

        const rawData = {
          tertinggi: tertinggi.data || [],
          terendah: terendah.data || [],
          trend: trend.data || [],
        };

        return cleanRevenueData(rawData);
        
      } catch (error) {
        console.error("Revenue data error:", error);
        return { tertinggi: [], terendah: [], trend: [] };
      }
    },
    ["revenue-data", hospitalId, startDate, endDate],
    {
      revalidate: 86400,
      tags: ["revenue-data"],
    }
  )();
};