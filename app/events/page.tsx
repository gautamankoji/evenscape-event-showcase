"use client";

import Link from "next/link";
import { dark } from "@clerk/themes";
import { redirect } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";

//* ==== CONSTANTS, UTILITY & TYPES ==== *//
import { TIER_ORDER } from "@/lib/constants";
import { getTierColor, isUpgradeCard } from "@/lib/utils";
import { Event, EventListItem, TierType } from "@/lib/types";

//* ==== UI COMPONENTS ==== *//
import { Menu } from "lucide-react";
import { EventCard, UpgradeCard } from "../../components/cards";
import { EventPreviewModal } from "../../components/modals";
import EventsPageSkeleton from "../../components/skeletons/EventsPageSkeleton";

const SidebarNavLink = ({
  href,
  children,
  active = false,
  className = "",
  onClose,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  onClose: () => void;
}) => (
  <Link
    href={href}
    onClick={onClose}
    className={`w-full px-4 py-2 rounded-2xl text-sm font-medium transition-colors ${
      active
        ? "border border-neutral-700 bg-neutral-800 hover:bg-neutral-700"
        : "border border-transparent hover:border-neutral-700 hover:bg-neutral-800 text-neutral-300 hover:text-neutral-50"
    } ${className}`}
  >
    {children}
  </Link>
);

const EmptyState = ({ tier }: { tier: TierType }) => (
  <div className="flex items-center justify-center font-sans py-16">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 bg-neutral-400 rounded-full flex items-center justify-center">
        <svg
          className="w-8 h-8 text-neutral-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium mb-2">No events available</h3>
      <p className="text-neutral-400">
        {tier === "free"
          ? "Upgrade your tier to unlock exclusive events!"
          : "New events are coming soon. Check back later!"}
      </p>
    </div>
  </div>
);

export default function EventsPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [state, setState] = useState({
    events: [] as Event[],
    currentTier: "free" as TierType,
    isLoading: true,
    error: null as string | null,
  });
  const [selected, setSelected] = useState<{
    event: Event;
    rect: DOMRect;
  } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const closeMenuOpen = () => setMenuOpen(false);

  const fetchEvents = useCallback(async () => {
    setState((s) => ({ ...s, isLoading: true, error: null }));
    try {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error("Failed to fetch events");
      const { events = [], userTier = "free" } = await res.json();
      setState((s) => ({
        ...s,
        events,
        currentTier: userTier,
        isLoading: false,
      }));
    } catch (error) {
      setState((s) => ({
        ...s,
        error: error instanceof Error ? error.message : "Something went wrong",
        isLoading: false,
      }));
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) redirect("/sign-in");
    if (user?.id) {
      const tier = (user.publicMetadata?.tier as TierType) || "free";
      setState((s) => ({ ...s, currentTier: tier }));
      fetchEvents();
    }
  }, [user?.id, user?.publicMetadata?.tier, isLoaded, isSignedIn, fetchEvents]);

  const createEventsList = (): EventListItem[] => {
    const currentIndex = TIER_ORDER.indexOf(state.currentTier);
    const upgradableTiers = TIER_ORDER.slice(currentIndex + 1);
    const items: EventListItem[] = [...state.events];

    // in-place Fisher–Yates shuffle for uniform randomization of event items
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }

    upgradableTiers.forEach((tier, index) => {
      const position = Math.floor(
        (items.length / upgradableTiers.length) * (index + 1)
      );
      items.splice(position + index, 0, {
        id: `upgrade-${tier}`,
        tier,
        isUpgrade: true,
      });
    });

    return items;
  };

  if (!isLoaded || state.isLoading) return <EventsPageSkeleton />;

  const eventsList = createEventsList();
  const isMaxTier = state.currentTier === "platinum";

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* header */}
      <header className="h-16 sticky top-3 z-50 px-2 lg:px-4">
        <nav className="mx-auto bg-neutral-800/80 backdrop-blur-lg shadow-lg rounded-3xl">
          <div className="mx-auto px-4 sm:px-6 py-4">
            <div className="flex gap-2 justify-between items-center">
              <div className="flex gap-1.5 items-center truncate">
                <div
                  className="block lg:hidden"
                  onClick={() => setMenuOpen((prev) => !prev)}
                >
                  <Menu />
                </div>
                <Link
                  href="/"
                  className="text-lg lg:text-3xl font-serif truncate"
                >
                  Evenscape
                </Link>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium font-mono ${getTierColor(
                    state.currentTier
                  )}`}
                >
                  {state.currentTier.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center space-x-1 lg:space-x-4 shrink-0">
                {!isMaxTier && (
                  <Link
                    href="/upgrade"
                    className="px-4 py-2 h-8 flex gap-1.5 items-center justify-center rounded-full text-[0.8em] font-semibold font-mono text-yellow-900 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] bg-[length:200%_200%] hover:scale-105 hover:bg-[position:right] transition duration-200"
                  >
                    Upgrade
                  </Link>
                )}
                <div className="w-8 h-8 bg-neutral-600 rounded-full flex items-center justify-center">
                  <UserButton appearance={{ baseTheme: dark }} />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className="flex gap-6 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* sidebar */}
        <aside
          className={`lg:w-60 h-full fixed top-0 lg:sticky left-0 lg:top-25 bg-neutral-900 ${
            menuOpen
              ? "w-full z-[30] mt-20"
              : "w-0 overflow-clip lg:w-60 lg:overflow-visible"
          }`}
        >
          <div className="px-4 lg:px-0 w-full py-2 h-full">
            <nav className="mt-6 flex flex-col gap-2 font-sans">
              <SidebarNavLink
                onClose={closeMenuOpen}
                href="/events?s=featured"
                active
              >
                Featured
              </SidebarNavLink>
              <SidebarNavLink onClose={closeMenuOpen} href="/events?s=upcoming">
                Upcoming
              </SidebarNavLink>
              <SidebarNavLink onClose={closeMenuOpen} href="/events?s=ongoing">
                Ongoing
              </SidebarNavLink>
              <SidebarNavLink onClose={closeMenuOpen} href="/events?s=past">
                Past
              </SidebarNavLink>
            </nav>
          </div>
        </aside>

        {/* events grid */}
        <main className="h-full w-full">
          {eventsList.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {eventsList.map((event, index) =>
                  isUpgradeCard(event) ? (
                    <UpgradeCard
                      key={event.id}
                      tier={event.tier}
                      index={index}
                    />
                  ) : (
                    <EventCard
                      key={event.id}
                      event={event}
                      index={index}
                      onClick={(rect) => setSelected({ event, rect })}
                    />
                  )
                )}
              </div>
              {selected && (
                <div className="fixed inset-0 z-50">
                  <EventPreviewModal
                    event={selected.event}
                    originRect={selected.rect}
                    onClose={() => setSelected(null)}
                  />
                </div>
              )}
            </>
          ) : (
            <EmptyState tier={state.currentTier} />
          )}
        </main>
      </div>
    </div>
  );
}
