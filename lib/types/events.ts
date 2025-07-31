export type TierType = "free" | "silver" | "gold" | "platinum";

export interface UserMetadata {
  tier: TierType;
}

export interface Event {
  id: string;
  title: string;
  tier: TierType;
  event_date: string;
  description: string;
  image_url: string | null;
  
  category?: string;
}

export type EventListItem =
  | Event
  | {
      id: string;
      tier: TierType;
      isUpgrade: true;
    };
