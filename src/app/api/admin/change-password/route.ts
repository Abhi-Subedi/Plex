import { NextResponse } from "next/server";
import { z } from "zod";
import { convex } from "@/lib/convex-client";
import { api } from "../../../../../convex/_generated/api";

const bodySchema = z.object({
  token: z.string().min(1),
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8),
});

export async function POST(request: Request) {
  try {
    const body = bodySchema.parse(await request.json());
    const result = await convex.mutation(api.cms.changePassword, body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Password change failed" },
      { status: 400 }
    );
  }
}
