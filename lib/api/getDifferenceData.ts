import { unstable_cache } from "next/cache";
import { cleanDifferenceData } from "./dataCleaner";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const getDifferenceData = async (
  hospitalId: string,
  startDate: string,
  endDate: string
) => {
  return unstable_cache(
    async () => {
      const params = `hospital_id=${hospitalId}&start_date=${startDate}&end_date=${endDate}&limit=5`;
      const trendParams = `hospital_id=${hospitalId}&start_date=${startDate}&end_date=${endDate}&unit=all`;

      const [topRes, bottomRes, trendRes] = await Promise.all([
        fetch(`${BASE_URL}/dashboard/keuangan/selisihJKN/top?${params}`, {
          next: { revalidate: 86400 },
        }),
        fetch(`${BASE_URL}/dashboard/keuangan/selisihJKN/bottom?${params}`, {
          next: { revalidate: 86400 },
        }),
        fetch(`${BASE_URL}/dashboard/keuangan/selisihJKN/trend?${trendParams}`, {
          next: { revalidate: 86400 },
        }),
      ]);

      if (!topRes.ok || !bottomRes.ok || !trendRes.ok) {
        throw new Error("Failed to fetch difference data");
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

      const cleaned = cleanDifferenceData(rawData);
          
      return cleaned;
    },
    // Cache key as array of strings (includes parameters)
    ["difference-data", hospitalId, startDate, endDate],
    {
      revalidate: 86400,
      tags: ["difference-data"],
    }
  )();
};