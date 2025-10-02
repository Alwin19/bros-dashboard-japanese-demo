import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const hospitalId = url.searchParams.get("hospital_id");
  const startDate = url.searchParams.get("start_date");
  const endDate = url.searchParams.get("end_date");

  // Fetch backend with caching
  const res = await fetch(
    `${process.env.BACKEND_BASE_URL}/dashboard/keuangan/pendapatan/totalPendapatanJKN/?hospital_id=${hospitalId}&start_date=${startDate}&end_date=${endDate}`,
    {
      // Cache the response for 1 day (86400s)
      next: { revalidate: 86400 }
    }
  );

  if (!res.ok) {
    return new Response("Failed to fetch from backend", { status: res.status });
  }

  const data = await res.json();
  return Response.json(data);
}
