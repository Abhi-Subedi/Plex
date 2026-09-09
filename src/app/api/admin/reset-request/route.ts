import { NextResponse } from "next/server";
import { z } from "zod";
import { convex } from "@/lib/convex-client";
import { api } from "../../../../../convex/_generated/api";

const bodySchema = z.object({
  username: z.string().min(1),
  keyword: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = bodySchema.parse(await request.json());
    const result = await convex.mutation(api.cms.requestPasswordReset, body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Reset request failed" },
      { status: 400 }
    );
  }
}
