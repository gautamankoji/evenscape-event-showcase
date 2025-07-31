"use client";

import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

//* ==== CLERK AUTH CONFIG ==== *//
import { dark } from "@clerk/themes";
import { useUser, UserButton } from "@clerk/nextjs";

//* ==== TYPES & CONSTANTS ==== *//
import { TierType } from "@/lib/types";
import { FAQS, TIER_CONFIG } from "@/lib/constants";

//* ==== UI COMPONENTS ==== *//
import { PromoCodeCard, TierCard } from "../../components/cards";
import { StatusMessages } from "../../components/notifications/Statusmessages";

interface UpgradeState {
  currentTier: TierType;
  isProcessing: boolean;
  error: string | null;
  successMessage: string | null;
}

const INITIAL_STATE: UpgradeState = {
  currentTier: "free",
  isProcessing: false,
  error: null,
  successMessage: null,
};

export default function UpgradeTier() {
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  const [state, setState] = useState<UpgradeState>(INITIAL_STATE);

  const updateState = (updates: Partial<UpgradeState>) =>
    setState((prev) => ({ ...prev, ...updates }));

  const handleUpgradeRequest = useCallback(
    async (tier: TierType, type: "promo" | "paid", amount?: number) => {
      if (!user?.id || tier === state.currentTier) return;

      const clearMessage = (type: "error" | "success", delay = 5000) =>
        setTimeout(
          () =>
            updateState({
              [type === "error" ? "error" : "successMessage"]: null,
            }),
          delay
        );

      updateState({ isProcessing: true, error: null });

      try {
        const response = await fetch("/api/tier/upgrade", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            newTier: tier,
            upgradeType: type,
            ...(amount && { amount }),
          }),
        });

        if (!response.ok) {
          const { error } = await response
            .json()
            .catch(() => ({ error: "Upgrade failed" }));
          throw new Error(error);
        }

        const result = await response.json();

        if (result.paymentUrl) {
          window.location.href = result.paymentUrl;
          return;
        }

        await user.reload();
        updateState({
          currentTier: tier,
          successMessage: `Successfully upgraded to ${TIER_CONFIG.LABELS[tier]}!`,
        });

        clearMessage("success");
        if (type === "paid") router.push("/events");
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : `Failed to ${
                type === "promo" ? "apply promo code" : "upgrade tier"
              }`;
        updateState({ error: errorMessage });
        clearMessage("error", 10000);
      } finally {
        updateState({ isProcessing: false });
      }
    },
    [user, state.currentTier, router]
  );

  const handlePromoSuccess = useCallback(
    (tier: TierType) => handleUpgradeRequest(tier, "promo"),
    [handleUpgradeRequest]
  );

  const handleUpgrade = useCallback(
    (tier: TierType) =>
      handleUpgradeRequest(tier, "paid", TIER_CONFIG.PRICES[tier]),
    [handleUpgradeRequest]
  );

  useEffect(() => {
    if (isLoaded && !isSignedIn) redirect("/sign-in");
    if (user?.id && isLoaded) {
      updateState({
        currentTier: (user.publicMetadata?.tier as TierType) || "free",
      });
    }
  }, [user?.id, user?.publicMetadata?.tier, isLoaded, isSignedIn]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600" />
      </div>
    );
  }

  const { currentTier, isProcessing, error, successMessage } = state;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <StatusMessages error={error} success={successMessage} />
        <PricingGrid
          currentTier={currentTier}
          onUpgrade={handleUpgrade}
          isProcessing={isProcessing}
        />
        <PromoCodeCard
          onCodeApplied={handlePromoSuccess}
          isProcessing={isProcessing}
        />
        <FAQSection />
      </main>
      {isProcessing && <ProcessingOverlay />}
    </div>
  );
}

const Header = () => (
  <header className="h-16 mt-3 z-10 px-4">
    <nav className="mx-auto bg-neutral-800/80 backdrop-blur-lg shadow-lg rounded-3xl">
      <div className="mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <Link href="/" className="text-lg lg:text-3xl font-serif truncate">
              Evenscape
            </Link>
            <div className="gap-4 items-center hidden lg:flex">
              <div className="text-neutral-500 text-2xl">|</div>
              <div className="font-sans -my-2">
                <h3 className="text-lg font-semibold text-neutral-300">
                  Choose Your Plan
                </h3>
                <p className="text-neutral-500 text-sm">
                  Select the perfect tier for your needs
                </p>
              </div>
            </div>
          </div>
          <div className="w-8 h-8 bg-neutral-600 rounded-full flex items-center justify-center">
            <UserButton appearance={{ baseTheme: dark }} />
          </div>
        </div>
      </div>
    </nav>
  </header>
);

const PricingGrid = ({
  currentTier,
  onUpgrade,
  isProcessing,
}: {
  currentTier: TierType;
  onUpgrade: (tier: TierType) => void;
  isProcessing: boolean;
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 lg:gap-2 lg:mt-8 mb-20">
    {(["free", "silver", "gold", "platinum"] as const).map((tier) => (
      <TierCard
        key={tier}
        tier={tier}
        currentTier={currentTier}
        onUpgrade={onUpgrade}
        isProcessing={isProcessing}
        isPopular={tier === "gold"}
      />
    ))}
  </div>
);

const FAQSection = () => {
  return (
    <div className="mt-16 rounded-2xl px-4 lg:p-8">
      <h2 className="text-2xl lg:text-5xl mb-8 lg:mb-20 text-center font-serif">
        Frequently Asked Questions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
        {FAQS.map(({ q, a }) => (
          <div key={q}>
            <h3 className="text-lg font-semibold mb-2">{q}</h3>
            <p className="text-neutral-400">{a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProcessingOverlay = () => (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[200]">
    <div className="rounded-2xl p-8 text-center font-serif tracking-wide text-lg lg:text-2xl">
      <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-yellow-300 mx-auto mb-4" />
      <p className="font-medium">Processing your upgrade...</p>
    </div>
  </div>
);
