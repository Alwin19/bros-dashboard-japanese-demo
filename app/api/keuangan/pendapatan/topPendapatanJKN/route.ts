import { NextRequest } from "next/server";
import { proxyGet } from "@/lib/backend";

export function GET(req: NextRequest) {
  return proxyGet(
    req,
    "/dashboard/keuangan/pendapatanJKN/top",
    ["hospital_id", "start_date", "end_date", "limit"]
  );
}