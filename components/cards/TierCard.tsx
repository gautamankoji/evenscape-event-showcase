//* ==== TYPES & CONSTANTS ==== *//
import { TierType } from "@/lib/types";
import { TIER_BENEFITS, TIER_CONFIG, TIER_DESCRIPTIONS } from "@/lib/constants";

interface TierCardProps {
  tier        : TierType;
  isPopular?  : boolean;
  currentTier : TierType;
  isProcessing: boolean;
  onUpgrade   : (tier: TierType) => void;
}

export const TierCard = ({
  tier,
  isPopular,
  currentTier,
  isProcessing,
  onUpgrade,
}: TierCardProps) => {
  const isCurrentTier = tier === currentTier;
  const canUpgrade = TIER_CONFIG.PRICES[tier] > TIER_CONFIG.PRICES[currentTier];

  const getCardStyles = () => {
    if (isPopular) {
      return "ring-2 ring-yellow-400 shadow-2xl transform scale-105 z-50";
    }
    if (isCurrentTier) {
      return "ring-2 ring-green-500 shadow-lg";
    }
    return "shadow-lg hover:shadow-xl";
  };

  const getButtonStyles = () => {
    if (isCurrentTier) {
      return "bg-green-100 text-green-800 cursor-default";
    }
    if (!canUpgrade) {
      return "bg-gray-100 text-gray-500 cursor-not-allowed";
    }
    if (isPopular) {
      return "bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] text-black font-mono !font-semibold tracking-wide bg-[length:200%_200%] hover:scale-105 scale-100 active:scale-100 hover:bg-[position:right] animate-gradient";
    }
    return "bg-neutral-50 text-black hover:bg-neutral-300";
  };

  const getButtonText = () => {
    if (isCurrentTier) return "Current Plan";
    if (!canUpgrade) return "Downgrade";
    if (tier === "free") return "Get Started";
    return `Upgrade to ${TIER_CONFIG.LABELS[tier]}`;
  };

  return (
    <div
      className={`relative bg-gradient-to-tl from-neutral-900 to-neutral-800 rounded-2xl p-8 transition-all duration-300 ${getCardStyles()}`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] text-black font-sans px-4 py-2 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}

      {isCurrentTier && (
        <div className="absolute -top-4 right-8 z-[200]">
          <span className="bg-gradient-to-tl from-green-900 to-green-700 text-white px-4 py-1.5 border border-green-500 rounded-full text-sm font-sans font-medium">
            Current
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <div className="text-left">
          <h3 className="text-2xl font-serif mb-2">
            {TIER_CONFIG.LABELS[tier]}
          </h3>
          <div className="mb-6 font-mono">
            <span className="text-5xl font-serif">
              {`$${TIER_CONFIG.PRICES[tier]}`}
            </span>
            <span className="text-neutral-400 ml-2">/month</span>
          </div>
        </div>

        <p className="text-neutral-400 mb-4">{TIER_DESCRIPTIONS[tier]}</p>

        <button
          onClick={() => canUpgrade && !isCurrentTier && onUpgrade(tier)}
          disabled={!canUpgrade || isCurrentTier || isProcessing}
          className={`w-full py-2.5 px-6 rounded-lg font-sans font-medium transition-all duration-200 ${getButtonStyles()} ${(!canUpgrade || isCurrentTier || isProcessing) ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          {getButtonText()}
        </button>
      </div>

      <ul className="space-y-4 mb-8">
        {TIER_BENEFITS[tier].map((benefit, index) => (
          <li key={index} className="flex items-start">
            <svg
              className="w-5 h-5 text-white mt-0.5 mr-3 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-neutral-300">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
