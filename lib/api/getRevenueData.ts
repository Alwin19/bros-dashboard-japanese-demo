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
      const params = `hospital_id=${hospitalId}&start_date=${startDate}&end_date=${endDate}&limit=5`;
      const trendParams = `hospital_id=${hospitalId}&start_date=${startDate}&end_date=${endDate}&unit=all`;

      // Fetch top, bottom, and trend in parallel
      const [topRes, bottomRes, trendRes] = await Promise.all([
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

      if (!topRes.ok || !bottomRes.ok || !trendRes.ok) {
        throw new Error("Failed to fetch revenue data");
      }

      const [topData, bottomData, trendData] = await Promise.all([
        topRes.json(),
        bottomRes.json(),
        trendRes.json(),
      ]);

      const rawData = {
        tertinggi: topData.data,
        terendah: bottomData.data,
        trend: trendData.data,
      };

      // Clean and return ready-to-use data
      const cleaned = cleanRevenueData(rawData);
          
      return cleaned;
    },
    // Cache key includes all parameters
    ["revenue-data", hospitalId, startDate, endDate],
    {
      revalidate: 86400,
      tags: ["revenue-data"],
    }
  )();
};