import { EventListItem, TierType } from "@/lib/types";

export const isValidTier = (tier: TierType) => {
  return ["free", "silver", "gold", "platinum"].includes(tier);
};

export const isUpgradeCard = (
  item: EventListItem
): item is { id: string; tier: TierType; isUpgrade: true } =>
  "isUpgrade" in item && item.isUpgrade;

export const getTierHierarchy = (userTier: TierType): TierType[] => {
  const hierarchy: Record<TierType, TierType[]> = {
    free    : ["free"],
    silver  : ["free", "silver"],
    gold    : ["free", "silver", "gold"],
    platinum: ["free", "silver", "gold", "platinum"],
  };
  return hierarchy[userTier];
};

export const getTierColor = (tier: TierType): string => {
  const colors: Record<TierType, string> = {
    free    : "bg-gradient-to-br from-blue-500/20 to-blue-500/40 text-blue-400",
    silver  : "bg-gradient-to-br from-neutral-300 to-neutral-500 text-neutral-900",
    gold    : "bg-gradient-to-br from-yellow-300/20 to-yellow-300/40 text-yellow-300",
    platinum: "bg-gradient-to-br from-purple-500/20 to-purple-500/40 text-purple-400",
  };

  return colors[tier];
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year  : "numeric",
    month : "long",
    day   : "numeric",
    hour  : "2-digit",
    minute: "2-digit",
  });
};
