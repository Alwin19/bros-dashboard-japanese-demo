import { unstable_cache } from "next/cache";
import { cleanRevenueDistribution } from "./dataCleaner";
import { fetchWithAuth } from "@/app/lib/api";

export const getRevenueDistribution = async (
  hospitalId: string,
  startDate: string,
  endDate: string
) => {
    try {
      const params = `hospital_id=${hospitalId}&start_date=${startDate}&end_date=${endDate}&unit=all`;

      const data = await fetchWithAuth(
        `/dashboard/keuangan/pendapatanJKN/distribusi?${params}`,
        {
          next: { revalidate: 86400 },
        }
      );
      
      return cleanRevenueDistribution(data.data || []);
      
    } catch (error) {
      console.error("Revenue distribution error:", error);
      return { distribution: [], chartConfig: {} };
    }
};