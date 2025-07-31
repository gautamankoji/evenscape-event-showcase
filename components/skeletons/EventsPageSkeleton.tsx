import React from "react";
import { Menu } from "lucide-react";

const SkeletonBar = ({ className = "" }) => (
  <div className={`bg-neutral-700 rounded animate-pulse ${className}`} />
);

const EventCard = () => (
  <div className="bg-neutral-800 rounded-xl overflow-hidden cursor-pointer">
    <SkeletonBar className="w-full h-48 rounded-t-xl" />
    <div className="p-6 space-y-3 font-sans">
      <div className="flex justify-between items-start">
        <SkeletonBar className="h-6 w-3/4" />
        <SkeletonBar className="h-6 w-16 rounded-full ml-2" />
      </div>
      <SkeletonBar className="h-5 w-full" />
      <SkeletonBar className="h-5 w-2/3" />
      <SkeletonBar className="h-5 w-1/2" />
    </div>
  </div>
);

const SidebarNavLink = ({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) => (
  <button
    className={`w-full px-4 py-2 rounded-2xl text-sm font-medium text-left transition-colors ${
      active
        ? "bg-neutral-800 border border-neutral-700"
        : "text-neutral-300 border border-transparent hover:border-neutral-700 hover:bg-neutral-800 hover:text-neutral-50"
    }`}
  >
    {children}
  </button>
);

const EventsPageSkeleton = () => (
  <div className="min-h-screen bg-neutral-900">
    {/* header */}
    <header className="h-16 sticky top-3 z-10 px-2 lg:px-4">
      <nav className="mx-auto bg-neutral-800/80 backdrop-blur-lg shadow-lg rounded-3xl">
        <div className="flex justify-between items-center mx-auto px-4 sm:px-6 py-4">
          <div className="flex gap-1.5 items-center truncate">
            <Menu className="block lg:hidden" />
            <div className="text-lg lg:text-3xl font-serif truncate">
              Evenscape
            </div>
          </div>
          <div className="flex items-center space-x-1 lg:space-x-4">
            <button className="inline-flex items-center px-4 py-2 h-8 rounded-full text-[0.8em] font-semibold font-mono text-yellow-900 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] bg-[length:200%_200%] shadow-[5px_5px_10px_rgba(0,0,0,0.144)] hover:scale-105 hover:bg-[position:right] transition-all duration-200">
              Upgrade
            </button>
            <SkeletonBar className="w-8 h-8 rounded-full" />
          </div>
        </div>
      </nav>
    </header>

    <div className="flex gap-6 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* sidebar */}
      <aside className="lg:w-60 h-full fixed top-0 lg:sticky left-0 lg:top-25 w-0 overflow-clip lg:overflow-visible bg-neutral-900">
        <div className="px-4 lg:px-0 w-full py-2 h-full">
          <nav className="mt-6 flex flex-col gap-2 font-sans">
            <SidebarNavLink active>Featured</SidebarNavLink>
            {["Upcoming", "Ongoing", "Past"].map((item) => (
              <SidebarNavLink key={item}>{item}</SidebarNavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* events grid */}
      <main className="h-full w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 8 }, (_, i) => (
            <EventCard key={i} />
          ))}
        </div>
      </main>
    </div>
  </div>
);

export default EventsPageSkeleton;
