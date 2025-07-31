"use client";

import Link from "next/link";
import Image from "next/image";
import { dark } from "@clerk/themes";
import { redirect } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import React, { useState, useEffect, useCallback, useMemo } from "react";

//* ==== TYPES & CONSTANTS ==== *//
import { Feature } from "@/lib/types";
import { FEATURED_EVENTS, FEATURES, HERO_IMAGES } from "@/lib/constants";

//* ==== UI COMPONENTS ==== *//
import { EventCard } from "../../components/cards";

interface HeroProps {
  isVisible: boolean;
  currentImageIndex: number;
}

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

const Navigation = () => (
  <header className="h-16 w-full fixed top-3 z-50 px-2 lg:px-4">
    <nav className="lg:max-w-4xl mx-auto bg-neutral-800/80 backdrop-blur-lg shadow-lg rounded-3xl">
      <div className="mx-auto px-4 sm:px-6 py-4">
        <div className="flex gap-2 justify-between items-center">
          <Link href="/" className="text-lg lg:text-3xl font-serif truncate">
            Evenscape
          </Link>
          <div className="flex items-center space-x-1 lg:space-x-4 shrink-0">
            <Link
              href="/upgrade"
              className="px-4 py-2 h-8 flex gap-1.5 items-center justify-center rounded-full text-[0.8em] font-semibold font-mono text-yellow-900 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] bg-[length:200%_200%] hover:scale-105 hover:bg-[position:right] transition duration-200"
            >
              Upgrade
            </Link>
            <div className="w-8 h-8 bg-neutral-600 rounded-full flex items-center justify-center">
              <UserButton appearance={{ baseTheme: dark }} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
);

const HeroSection = ({ currentImageIndex, isVisible }: HeroProps) => (
  <section className="relative min-h-screen flex items-center justify-center w-full overflow-hidden">
    <div className="absolute inset-0">
      {HERO_IMAGES.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === currentImageIndex ? "opacity-30" : "opacity-0"
          }`}
        >
          <Image
            className="w-full h-full object-cover"
            src={img}
            alt="Event background"
            width={500}
            height={500}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
    </div>

    <div
      className={`relative z-10 max-w-4xl px-6 md:pt-[5%] text-center transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <h1 className="text-5xl font-serif md:text-7xl mb-6 bg-gradient-to-r from-white via-yellow-200 to-yellow-200 bg-clip-text text-transparent leading-tight">
        Curated Events
        <br />
        <span className="text-4xl md:text-6xl">That Matter</span>
      </h1>
      <p className="text-lg md:text-2xl text-neutral-300 mb-8 max-w-4xl mx-auto leading-relaxed font-sans">
        Discover premium events, workshops, and experiences handpicked for
        professionals, creators, and visionaries.
        <span className="text-yellow-200">
          {" "}
          Skip the noise, find your tribe.
        </span>
      </p>
    </div>
  </section>
);

const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => (
  <div className="text-center mb-16">
    <h2 className="text-4xl md:text-5xl pb-6 bg-gradient-to-r font-serif from-white to-yellow-300 bg-clip-text text-transparent">
      {title}
    </h2>
    <p className="text-xl text-stone-500 font-sans max-w-2xl mx-auto">
      {subtitle}
    </p>
  </div>
);

const FeatureCard = ({ feature }: { feature: Feature }) => (
  <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 transition-all duration-300 font-sans cursor-pointer">
    <h3 className="text-2xl font-serif mb-4 text-white">{feature.title}</h3>
    <p className="text-neutral-400 leading-relaxed">{feature.description}</p>
  </div>
);

const Footer = () => {
  const links = ["Privacy Policy", "Terms of Service", "Contact"];

  return (
    <footer className="py-12 border-t border-white/10 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <span className="text-lg lg:text-3xl font-serif mb-4 md:mb-0">
            Evenscape
          </span>
          <div className="flex items-center space-x-6 text-neutral-400 text-sm">
            {links.map((link) => (
              <a
                key={link}
                href="#"
                className="hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between mt-8 pt-8 border-t border-white/10">
          <p className="text-stone-500">
            © 2025 Evenscape. All rights reserved. Crafted with passion for
            meaningful connections.
          </p>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/gautamankoji"
            className="font-mono text-stone-500 inline bg-[linear-gradient(180deg,_#79716b,_#79716b)] bg-[length:0%_1px] bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_1px] bg-left pb-6 lowercase"
          >
            gautamankoji
          </Link>
        </div>
      </div>
    </footer>
  );
};

const Home = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  }, []);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) redirect("/");
  }, [isLoaded, isSignedIn]);

  const eventCards = useMemo(
    () =>
      FEATURED_EVENTS.map((event, i) => (
        <EventCard key={event.id} index={i} event={event} />
      )),
    []
  );

  const featureCards = useMemo(
    () =>
      FEATURES.map((feature, i) => <FeatureCard key={i} feature={feature} />),
    []
  );

  return (
    <div className="min-h-screen bg-neutral-900">
      <Navigation />
      <HeroSection
        currentImageIndex={currentImageIndex}
        isVisible={isVisible}
      />

      <section id="events" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            title="Upcoming Featured Events"
            subtitle="Handpicked events that deliver real value and meaningful connections"
          />
          <div className="grid md:grid-cols-3 gap-8">{eventCards}</div>
        </div>
      </section>

      <section
        id="features"
        className="py-20 bg-gradient-to-b from-transparent to-yellow-900/10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            title="Why Choose Evenscape?"
            subtitle="We don't just list events – we curate experiences that elevate your personal and professional journey"
          />
          <div className="grid md:grid-cols-3 gap-8">{featureCards}</div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
