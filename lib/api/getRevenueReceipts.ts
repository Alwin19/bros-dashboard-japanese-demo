import { unstable_cache } from "next/cache";
import { cleanRevenueReceipts } from "./dataCleaner";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const getRevenueReceipts = async (
  hospitalId: string,
  startDate: string,
  endDate: string
) => {
  return unstable_cache(
    async () => {
      try {
        const params = `hospital_id=${hospitalId}&start_date=${startDate}&end_date=${endDate}`;

        const res = await fetch(
          `${BASE_URL}/dashboard/keuangan/penerimaanJKN?${params}`,
          {
            next: { revalidate: 86400 },
          }
        );

        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const data = await res.json();

        return cleanRevenueReceipts(data.data || []);
        
      } catch (error) {
        console.error("Revenue receipts error:", error);
        return [];
      }
    },
    ["revenue-receipts", hospitalId, startDate, endDate],
    {
      revalidate: 86400,
      tags: ["revenue-receipts"],
    }
  )();
};