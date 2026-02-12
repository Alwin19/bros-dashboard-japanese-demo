import { unstable_cache } from "next/cache";
import { cleanRevenueReceipts } from "../transformers";
import { fetchWithAuth, isRedirectError } from "@/app/lib/api";

export const getRevenueReceipts = async (
  hospitalId: string,
  startDate: string,
  endDate: string
) => {

    try {
      const params = `hospital_id=${hospitalId}&start_date=${startDate}&end_date=${endDate}`;

      const data = await fetchWithAuth(
        `/dashboard/keuangan/penerimaanJKN?${params}`,
        {
          next: { revalidate: 86400 },
        }
      );

      return cleanRevenueReceipts(data.data || []);
      
    } catch (error) {
      if (isRedirectError(error)) {
              throw error;
            } 
      console.error("Revenue receipts error:", error);
      return [];
    }

};
