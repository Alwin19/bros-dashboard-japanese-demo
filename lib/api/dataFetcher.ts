import { getKPIData } from "./keuangan/getKPIData";
import { getRevenueData } from "./keuangan/getRevenueData";
import { getRevenueDistribution } from "./keuangan/getRevenueDistribution";
import { getDifferenceData } from "./keuangan/getDifferenceData";
import { getRevenueReceipts } from "./keuangan/getRevenueReceipts";

export async function getDashboardData(
  hospitalId: string,
  startDate: string,
  endDate: string,
  preset?: string
) {
  try {
    // Fetch all data in parallel
    const [kpi, revenueBreakdown, revenueDistribution, differenceBreakdown, receipts] = await Promise.all([
      getKPIData(hospitalId, startDate, endDate, preset),
      getRevenueData(hospitalId, startDate, endDate),
      getRevenueDistribution(hospitalId, startDate, endDate),
      getDifferenceData(hospitalId, startDate, endDate),
      getRevenueReceipts(hospitalId, startDate, endDate),
    ]);

    return {
      kpi,
      revenueBreakdown,
      revenueDistribution,
      differenceBreakdown,
      receipts,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
}