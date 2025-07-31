import { createClerkClient } from "@clerk/backend";
import { NextRequest, NextResponse } from "next/server";

import { isValidTier } from "@/lib/utils";

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! });

export async function POST(req: NextRequest) {
  const fail = (msg: string, status = 400) =>
    NextResponse.json({ error: msg }, { status });

  try {
    const { userId, newTier } = await req.json();

    if (!userId) return fail("User ID is required");
    if (!newTier) return fail("New tier is required");
    if (!isValidTier(newTier)) return fail("Invalid tier specified");

    const user = await clerk.users.updateUser(userId, {
      publicMetadata: { tier: newTier },
    });

    return NextResponse.json({
      success: true,
      tier: newTier,
      userId,
      metadata: user.publicMetadata,
    });
  } catch (err) {
    console.error("Upgrade error:", err);
    return NextResponse.json(
      {
        error: "Failed to update user metadata",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
