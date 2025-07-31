import { Event, Feature } from "../types";

export const HERO_IMAGES: readonly string[] = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
] as const;

export const FEATURED_EVENTS: ReadonlyArray<Event> = [
  {
    id: "1",
    title: "AI & Future of Work Summit",
    tier: "silver",
    description: "Explore the impact of artificial intelligence on the evolving landscape of work. Industry leaders and technologists discuss automation, ethics, and future skills.",
    category: "Tech Conference",
    event_date: "2025-08-15",
    image_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "2",
    title: "Design Thinking Workshop",
    tier: "gold",
    description: "A hands-on workshop to master problem-solving through design thinking. Ideal for innovators seeking to build user-centric products and experiences.",
    category: "Workshop",
    event_date: "2025-08-22",
    image_url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "3",
    title: "Startup Pitch Night",
    tier: "platinum",
    description: "An exclusive networking event where emerging startups pitch to VCs, mentors, and peers. Gain exposure, receive feedback, and forge critical connections.",
    category: "Networking",
    event_date: "2025-08-28",
    image_url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
] as const;


export const FEATURES: readonly Feature[] = [
  {
    title: "Curated Excellence",
    description: "Every event is hand-selected by our team of industry experts for quality and relevance.",
  },
  {
    title: "Quality Networking",
    description: "Connect with like-minded professionals, creators, and thought leaders in your field.",
  },
  {
    title: "Exclusive Access",
    description: "Get early access to limited-seat workshops, VIP events, and member-only experiences.",
  },
] as const;