import Link from "next/link";
import Image from "next/image";

import { TierType } from "@/lib/types";
import { getTierColor } from "@/lib/utils";

interface UpgradeCardProps {
  index: number;
  tier: TierType;
}

export const UpgradeCard = ({ index, tier }: UpgradeCardProps) => (
  <div
    className="bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-800 relative"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <Image
      className="w-full h-48 object-cover"
      src="https://placehold.co/400x200/3B82F6/FFFFFF?text=Premium+Event"
      alt="Premium Event"
      width={500}
      height={500}
    />
    <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] top-0 flex items-center justify-center">
      <div className="text-center p-6">
        <h3 className="text-lg tracking-wider text-white mb-2 font-serif">
          Upgrade to {tier.charAt(0).toUpperCase() + tier.slice(1)}
        </h3>
        <p className="text-gray-200 text font-serif mb-2">to view this event</p>
        <Link
          href="/upgrade"
          className="inline-flex px-4 py-2 gap-1.5 h-8 items-center justify-center rounded-full border-none text-[0.8em] font-semibold font-mono text-yellow-900 cursor-pointer relative z-[2] transition duration-200 ease-in-out shadow-[5px_5px_10px_rgba(0,0,0,0.144)] bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] bg-[length:200%_200%] hover:scale-105 scale-100 active:scale-100 hover:bg-[position:right]"
        >
          Upgrade Now
        </Link>
      </div>
    </div>
    <div className="p-6 font-sans">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold">Exclusive Premium Event</h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium font-mono ${getTierColor(
            tier
          )}`}
        >
          {tier.toUpperCase()}
        </span>
      </div>
      <p className="text-neutral-400 mb-4">
        Unlock premium content and exclusive events
      </p>
      <div className="flex items-center text-sm text-neutral-500 font-mono font-medium">
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
        Available for {tier} members
      </div>
    </div>
  </div>
);
