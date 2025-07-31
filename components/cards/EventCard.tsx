import Image from "next/image";
import { useRef, useState } from "react";

//* ==== TYPES & UTILITY FUNCTIONS ==== *//
import { Event } from "@/lib/types";
import { getTierColor, formatDate } from "@/lib/utils";

interface EventCardProps {
  event   : Event;
  index   : number;
  onClick?: (rect: DOMRect) => void;
}

export const EventCard = ({ event, index, onClick }: EventCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      ref={cardRef}
      className="bg-neutral-800 rounded-xl overflow-hidden group cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (rect) onClick?.(rect);
      }}
    >
      <div className="relative w-full h-48">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-neutral-700 animate-pulse rounded-t-xl" />
        )}
        <Image
          src={event.image_url || "https://via.placeholder.com/400x200"}
          alt={event.title}
          fill
          onLoad={() => setImageLoaded(true)}
          className={`object-cover rounded-t-xl transition-all duration-300 ease-in-out group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        {event.category && (
          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-tr from-yellow-100 to-yellow-300 px-3 py-1.5 rounded-full text-xs font-medium text-black font-mono uppercase">
              {event.category}
            </span>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col justify-between min-h-42 font-sans">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold line-clamp-2">
              {event.title}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2 font-mono ${getTierColor(
                event.tier
              )}`}
            >
              {event.tier.toUpperCase()}
            </span>
          </div>
          <p className="text-neutral-400 mb-4 line-clamp-3">
            {event.description}
          </p>
        </div>
        <div className="flex items-center text-sm text-neutral-400 font-mono font-medium">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {formatDate(event.event_date)}
        </div>
      </div>
    </div>
  );
};
