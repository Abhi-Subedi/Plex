import { NextResponse } from "next/server";
import { convex } from "@/lib/convex-client";
import { api } from "../../../../../convex/_generated/api";

export async function POST() {
  try {
    const result = await convex.mutation(api.cms.seedAdminUser, {});
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Seed failed" },
      { status: 500 }
    );
  }
}
