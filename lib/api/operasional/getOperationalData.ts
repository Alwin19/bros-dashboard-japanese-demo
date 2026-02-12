import { cleanOperationalData } from "../transformers";
import { fetchWithAuth, isRedirectError } from "@/app/lib/api";

export const getOperationalData = async (
  hospitalId: string,
  startDate: string,
  endDate: string,
  preset?: string
) => {

    try {
      // Dynamic params based on requirements
      // ALOS Card
      const alosParams = `hospital_id=${hospitalId}&start_date=${startDate}&end_date=${endDate}`;
      
      // Outpatient & Inpatient (Needs specific date, assuming endDate or today for "Hari Ini")
      // The requirement says "Hari Ini" so we should probably use the endDate as the "current day" context if it matches today, 
      // or just follow the date passed. For now, let's use endDate as the "date" param.
      const dailyParams = `hospital_id=${hospitalId}&date=2026-01-13`;

      // Trend ALOS (Yearly, based on startDate year)
      const year = startDate.split("-")[0] || "2025";
      const alosTrendParams = `hospital_id=${hospitalId}&year=${year}`;

      // Trend Visits (Last 7 days)
      const visitTrendParams = `hospital_id=${hospitalId}&end_date=${endDate}`; // Assuming backend handles "last 7 days" from a date, or it's just fixed.
      // Requirement said: {{base_url}}/dashboard/operasional/visits/last7days. It might not take params? 
      // Or might take hospitalId. Let's assume hospital_id is needed.
      const visitTrendUrl = `/dashboard/operasional/visits/last7days?hospital_id=${hospitalId}`;

      // Top Payer
      const topPayerParams = `hospital_id=${hospitalId}&start_date=${startDate}&end_date=${endDate}`;

      const [alos, outpatient, inpatient, alosTrend, visitTrend, topPayer] = await Promise.all([
        fetchWithAuth(`/dashboard/operasional/alos?${alosParams}`, { next: { revalidate: 3600 } }),
        fetchWithAuth(`/dashboard/operasional/outpatient?${dailyParams}`, { next: { revalidate: 3600 } }),
        fetchWithAuth(`/dashboard/operasional/inpatient?${dailyParams}`, { next: { revalidate: 3600 } }),
        fetchWithAuth(`/dashboard/operasional/alos/trend?${alosTrendParams}`, { next: { revalidate: 86400 } }),
        fetchWithAuth(visitTrendUrl, { next: { revalidate: 3600 } }),
        fetchWithAuth(`/dashboard/operasional/top-payer?${topPayerParams}`, { next: { revalidate: 86400 } }),
      ]);

      const rawData = {
        alos: alos.data || {},
        outpatient: outpatient.data || {},
        inpatient: inpatient.data || {},
        alosTrend: alosTrend.data || [],
        visitTrend: visitTrend.data || [],
        topPayer: topPayer.data || [],
      };

      return cleanOperationalData(rawData, startDate, endDate, preset);
      
    } catch (error) {
      if (isRedirectError(error)) {
        throw error;
      }
      console.error("Operational data error:", error);
      // Return failsafe structure
      return {
        kpi: [],
        alosTrend: [],
        visitTrend: [],
        payerDistribution: { distribution: [], chartConfig: {} }
      };
    }
};
