import { NextResponse } from "next/server";
import { z } from "zod";
import { convex } from "@/lib/convex-client";
import { api } from "../../../../../convex/_generated/api";

const bodySchema = z.object({ token: z.string().min(1) });

export async function POST(request: Request) {
  try {
    const body = bodySchema.parse(await request.json());
    await convex.mutation(api.cms.adminLogout, body);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Logout failed" },
      { status: 400 }
    );
  }
}
