import { cleanRevenueData } from "../transformers";
import { fetchWithAuth, isRedirectError } from "@/app/lib/api";

export const getRevenueData = async (
  hospitalId: string,
  startDate: string,
  endDate: string
) => {

    try {
      const params = `hospital_id=${hospitalId}&start_date=${startDate}&end_date=${endDate}`;
      const trendParams = `hospital_id=${hospitalId}&start_date=${startDate}&end_date=${endDate}&unit=all`;

      // Fetch top, bottom, and trend in parallel
      const [tertinggi, terendah, trend] = await Promise.all([
        fetchWithAuth(`/dashboard/keuangan/pendapatanJKN/top?${params}`, {
          next: { revalidate: 86400 },
        }),
        fetchWithAuth(`/dashboard/keuangan/pendapatanJKN/bottom?${params}`, {
          next: { revalidate: 86400 },
        }),
        fetchWithAuth(`/dashboard/keuangan/pendapatanJKN/trend?${trendParams}`, {
          next: { revalidate: 86400 },
        }),
      ]);

      const rawData = {
        tertinggi: tertinggi.data || [],
        terendah: terendah.data || [],
        trend: trend.data || [],
      };

      return cleanRevenueData(rawData);
      
    } catch (error) {
      if (isRedirectError(error)) {
              throw error;
            }
      console.error("Revenue data error:", error);
      return { tertinggi: [], terendah: [], trend: [] };
    }

};
