import { NextResponse } from "next/server";
import { z } from "zod";
import { convex } from "@/lib/convex-client";
import { api } from "../../../../../convex/_generated/api";

const bodySchema = z.object({ token: z.string().min(1) });

export async function POST(request: Request) {
  try {
    const body = bodySchema.parse(await request.json());
    const admin = await convex.query(api.cms.verifyAdminSession, body);
    if (!admin) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }
    return NextResponse.json({ admin });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Verification failed" },
      { status: 401 }
    );
  }
}
