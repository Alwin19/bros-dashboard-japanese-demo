import { getKPIData } from "./getKPIData";
import { getRevenueData } from "./getRevenueData";
import { getRevenueDistribution } from "./getRevenueDistribution";
import { getDifferenceData } from "./getDifferenceData";
import { getRevenueReceipts } from "./getRevenueReceipts";

export async function getDashboardData(
  hospitalId: string,
  startDate: string,
  endDate: string
) {
  try {
    // Fetch all data in parallel
    const [kpi, revenueBreakdown, revenueDistribution, differenceBreakdown, receipts] = await Promise.all([
      getKPIData(hospitalId, startDate, endDate),
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