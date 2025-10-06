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
      const params = `hospital_id=${hospitalId}&start_date=${startDate}&end_date=${endDate}`;

      const res = await fetch(
        `${BASE_URL}/dashboard/keuangan/penerimaanJKN?${params}`,
        {
          next: { revalidate: 86400 },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch revenue receipts data");
      }

      const data = await res.json();

      // Clean and return ready-to-use data
      return cleanRevenueReceipts(data.data);
    },
    // ✅ Cache key includes all parameters
    ["revenue-receipts", hospitalId, startDate, endDate],
    {
      revalidate: 86400,
      tags: ["revenue-receipts"],
    }
  )();
};