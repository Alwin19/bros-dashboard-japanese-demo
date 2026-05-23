import { getDummyOperationalData } from "../dummy-data";

export const getOperationalData = async (
  hospitalId: string,
  startDate: string,
  endDate: string,
  preset?: string
) => {
  return getDummyOperationalData(preset);
};
