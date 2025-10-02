// lib/backend.ts
import { NextRequest, NextResponse } from "next/server";

const BASE = process.env.BACKEND_BASE_URL!; // e.g. https://mdapi-stg.baliroyalhospital.co.id
const TOKEN = process.env.BACKEND_TOKEN;    // if you need Authorization later

type Allowlist = string[];

/**
 * Generic GET proxy:
 * - backendPath: the exact path after /api on your backend
 * - allow: list of query params you want to forward
 */
export async function proxyGet(req: NextRequest, backendPath: string, allow: Allowlist) {
  try {
    const url = new URL(`/api${backendPath}`, BASE);
    const sp = req.nextUrl.searchParams;

    // pass through only allowed keys
    allow.forEach((k) => {
      const v = sp.get(k);
      if (v !== null) url.searchParams.set(k, v);
    });

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => res.statusText);
      return NextResponse.json({ error: text }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Proxy error" }, { status: 500 });
  }
}
