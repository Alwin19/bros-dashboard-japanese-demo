import { unstable_cache } from "next/cache";
import { cleanRevenueDistribution } from "./dataCleaner";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const getRevenueDistribution = async (
  hospitalId: string,
  startDate: string,
  endDate: string
) => {
  return unstable_cache(
    async () => {
      try {
        const params = `hospital_id=${hospitalId}&start_date=${startDate}&end_date=${endDate}&unit=all`;

        const res = await fetch(
          `${BASE_URL}/dashboard/keuangan/pendapatanJKN/distribusi?${params}`,
          {
            next: { revalidate: 86400 },
          }
        );

        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const data = await res.json();
        
        return cleanRevenueDistribution(data.data || []);
        
      } catch (error) {
        console.error("Revenue distribution error:", error);
        return { distribution: [], chartConfig: {} };
      }
    },
    ["revenue-distribution", hospitalId, startDate, endDate],
    {
      revalidate: 86400,
      tags: ["revenue-distribution"],
    }
  )();
};