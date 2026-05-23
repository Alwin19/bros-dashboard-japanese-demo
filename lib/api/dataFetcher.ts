import {
  getDummyKPIData,
  getDummyRevenueData,
  getDummyRevenueDistribution,
  getDummyDifferenceData,
  getDummyRevenueReceipts,
} from "./dummy-data";

export async function getDashboardData(
  hospitalId: string,
  startDate: string,
  endDate: string,
  preset?: string
) {
  return {
    kpi: getDummyKPIData(preset),
    revenueBreakdown: getDummyRevenueData(),
    revenueDistribution: getDummyRevenueDistribution(),
    differenceBreakdown: getDummyDifferenceData(),
    receipts: getDummyRevenueReceipts(),
  };
}
