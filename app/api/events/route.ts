import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClerkClient } from "@clerk/backend";

import { TierType } from "@/lib/types";
import { getTierHierarchy } from "@/lib/utils";

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! });

export async function GET() {
  const fail = (msg: string, status = 500) =>
    NextResponse.json({ error: msg }, { status });

  try {
    const { userId } = await auth();
    if (!userId) return fail("Unauthorized", 401);

    const user = await clerk.users.getUser(userId);
    const tier = (user.publicMetadata?.tier as TierType) || "free";
    const tiers = getTierHierarchy(tier);

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .in("tier", tiers)
      .order("event_date", { ascending: true });

    if (error) return fail("Database error");

    return NextResponse.json({ events: data, userTier: tier });
  } catch (err) {
    console.error(err);
    return fail("Internal server error");
  }
}
