import { useState } from "react";

//* ==== TYPES & CONSTANTS ==== *//
import { TierType } from "@/lib/types";
import { TIER_CONFIG } from "@/lib/constants";

interface PromoCodeCardProps {
  isProcessing : boolean;
  onCodeApplied: (tier: TierType) => void;
}

export const PromoCodeCard = ({
  isProcessing,
  onCodeApplied,
}: PromoCodeCardProps) => {
  const [code, setCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleApplyCode = async () => {
    if (!code.trim()) return;

    setIsApplying(true);
    setError("");
    setSuccess("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const upperCode =
        code.toUpperCase() as keyof typeof TIER_CONFIG.PROMO_CODES;
      const newTier = TIER_CONFIG.PROMO_CODES[upperCode];

      if (!newTier) throw new Error("Invalid promo code");

      setSuccess(
        `Promo code applied! You've been upgraded to ${TIER_CONFIG.LABELS[newTier]}!`
      );
      onCodeApplied(newTier);
      setCode("");

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid code");
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="my-8 p-6 bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-2xl border border-purple-500/30 max-w-5xl mx-auto">
      <h3 className="text-xl font-medium text-purple-400 mb-4 font-serif flex items-center">
        Have a promo code?
      </h3>

      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-3 font-sans">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Enter promo code (e.g., GOLD2025)"
            className="flex-1 px-4 py-3 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent lg:text-lg text-base font-mono"
            disabled={isApplying || isProcessing}
          />
          <button
            onClick={handleApplyCode}
            disabled={isApplying || isProcessing || !code.trim()}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-semibold font-mono uppercase cursor-pointer"
          >
            {isApplying ? "Applying..." : "Apply Code"}
          </button>
        </div>

        {error && (
          <p className="font-mono uppercase text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}

        {success && (
          <p className="font-mono uppercase text-green-600 text-sm bg-green-50 px-3 py-2 rounded-lg">
            success{success}
          </p>
        )}

        <p className="text-sm text-purple-400 font-mono opacity-80">
          Available codes: <span className="font-mono">SILVER2025</span>,{" "}
          <span className="font-mono">GOLD2025</span>,{" "}
          <span className="font-mono">PLATINUM2025</span>
        </p>
      </div>
    </div>
  );
};
