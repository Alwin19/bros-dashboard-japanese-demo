import { cleanKPIData } from "../transformers";
import { fetchWithAuth, isRedirectError } from "@/app/lib/api";

// Fetch KPI Data with 24h cache
export const getKPIData = async (
  hospitalId: string,
  startDate: string,
  endDate: string,
  preset?: string
) => {

    try {
      const params = `hospital_id=${hospitalId}&start_date=${startDate}&end_date=${endDate}`;

      const [pendapatan, selisih, penerimaan] = await Promise.all([
        fetchWithAuth(`/dashboard/keuangan/totalPendapatanJKN?${params}`, {
          next: { revalidate: 86400 },
        }),
        fetchWithAuth(`/dashboard/keuangan/totalSelisihJKN?${params}`, {
          next: { revalidate: 86400 },
        }),
        fetchWithAuth(`/dashboard/keuangan/totalPenerimaan?${params}`, {
          next: { revalidate: 86400 },
        }),
      ]);

      const rawData = {
        pendapatan: pendapatan.data || {},
        selisih: selisih.data || {},
        penerimaan: penerimaan.data || {},
      };

      return cleanKPIData(rawData, startDate, endDate, preset);
      
    } catch (error) {
      if (isRedirectError(error)) {
              throw error;
            }
            
      console.error("KPI data error:", error);
      return [];
    }

};
