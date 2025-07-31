"use client";

import Image from "next/image";
import { HERO_IMAGES } from "@/lib/constants";
import { useCallback, useEffect, useState } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const nextImage = useCallback(
    () => setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length),
    []
  );

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);

  return (
    <div className="min-h-screen flex">
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {HERO_IMAGES.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-30" : "opacity-0"
              }`}
            >
              <Image
                className="w-full h-full object-cover"
                src={image}
                alt=""
                loading={index === 0 ? "eager" : "lazy"}
                width={500}
                height={500}
              />
            </div>
          ))}

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div
          className={`relative z-10 max-w-4xl px-8 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif mb-6 bg-gradient-to-r from-white via-yellow-200 to-yellow-200 bg-clip-text text-transparent leading-tight">
            Curated Events
            <br />
            <span className="text-3xl sm:text-4xl lg:text-6xl">
              That Matter
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-2xl text-neutral-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover premium events, workshops, and experiences handpicked for
            professionals, creators, and visionaries.
            <span className="text-yellow-200 block sm:inline">
              {" "}
              Skip the noise, find your tribe.
            </span>
          </p>
        </div>
      </div>

      <div className="w-full bg-neutral-900 max-w-md lg:max-w-lg xl:max-w-xl flex items-center justify-center p-6 lg:p-8 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
