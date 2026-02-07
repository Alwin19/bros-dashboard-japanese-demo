import { cleanDifferenceData } from "./dataCleaner";
import { fetchWithAuth } from "@/app/lib/api";


export const getDifferenceData = async (
  hospitalId: string,
  startDate: string,
  endDate: string
) => {
    try {
      const params = `hospital_id=${hospitalId}&start_date=${startDate}&end_date=${endDate}`;
      const trendParams = `hospital_id=${hospitalId}&start_date=${startDate}&end_date=${endDate}&unit=all`;

      const [tertinggi, terendah, trend] = await Promise.all([
        fetchWithAuth(
          `/dashboard/keuangan/selisihJKN/top?${params}`,
          { next: { revalidate: 86400 } }
        ),
        fetchWithAuth(
          `/dashboard/keuangan/selisihJKN/bottom?${params}`,
          { next: { revalidate: 86400 } }
        ),
        fetchWithAuth(
          `/dashboard/keuangan/selisihJKN/trend?${trendParams}`,
          { next: { revalidate: 86400 } }
        ),
      ]);

      

      const rawData = {
        tertinggi: tertinggi.data || [],
        terendah: terendah.data || [],
        trend: trend.data || [],
      };

      return cleanDifferenceData(rawData);
      
    } catch (error) {
      console.error("Difference data error:", error);
      return { tertinggi: [], terendah: [], trend: [] };
    }

};