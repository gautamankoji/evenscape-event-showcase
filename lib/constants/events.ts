import { TierType } from "../types";

export const TIER_ORDER: TierType[] = ["free", "silver", "gold", "platinum"];

export const TIER_CONFIG = {
  PROGRESSION: {
    free: "silver",
    silver: "gold",
    gold: "platinum",
    platinum: "platinum",
  } as const,
  LABELS: {
    free: "Free",
    silver: "Silver",
    gold: "Gold",
    platinum: "Platinum",
  } as const,
  PRICES: { free: 0, silver: 29.99, gold: 59.99, platinum: 99.99 } as const,
  PROMO_CODES: {
    SILVER2025: "silver",
    GOLD2025: "gold",
    PLATINUM2025: "platinum",
  } as const,
};

export const TIER_BENEFITS = {
  free: [
    "Access to basic events",
    "Community forum access",
    "Email notifications",
    "Mobile app access",
  ],
  silver: [
    "Everything in Free",
    "Priority event registration",
    "Exclusive Silver events",
    "Advanced networking features",
    "Monthly virtual meetups",
    "Basic analytics dashboard",
  ],
  gold: [
    "Everything in Silver",
    "VIP event seating",
    "Exclusive Gold workshops",
    "Direct speaker access",
    "Advanced analytics & insights",
    "Custom event recommendations",
    "Priority customer support",
  ],
  platinum: [
    "Everything in Gold",
    "Unlimited premium events",
    "Private Platinum community",
    "One-on-one mentorship sessions",
    "Early access to new features",
    "Custom integrations",
    "24/7 dedicated support",
    "Annual exclusive retreat",
  ],
};

export const TIER_DESCRIPTIONS = {
  free: "Perfect for getting started with our community",
  silver: "Great for active professionals seeking growth",
  gold: "Ideal for leaders wanting premium experiences",
  platinum: "Ultimate package for serious entrepreneurs",
};

export const FAQS = [
  {
    q: "Can I change my plan anytime?",
    a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
  },
  {
    q: "Is there a free trial?",
    a: "All paid plans come with a 14-day free trial. No credit card required to start.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes, we offer a 30-day money-back guarantee for all paid plans.",
  },
];
