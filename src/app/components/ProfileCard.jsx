"use client";
import React from "react";
import Image from "next/image";
import defaultProfile from "@/data/profile.json";

export default function ProfileCard({
  profile = defaultProfile,
  theme = "dark",
  className = "",
}) {
  const data = { ...defaultProfile, ...profile };

  // Support photo / avatar or image path passed in phone
  const photoSrc =
    data.photo ||
    data.avatar ||
    (typeof data.phone === "string" && data.phone.startsWith("/")
      ? data.phone
      : "/images/hero-portrait.png");

  // Support phone number string
  const phoneText =
    typeof data.phone === "string" && !data.phone.startsWith("/")
      ? data.phone
      : null;

  const bannerSrc = data.banner || "/images/profile-banner.jpg";
  const bottom = data.bottom || {};

  const isDark = theme === "dark";

  return (
    <div
      className={`relative w-full max-w-[340px] sm:max-w-[360px] overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 hover:scale-[1.01] ${
        isDark
          ? "bg-[#181a22]/95 border border-white/10 text-white backdrop-blur-md shadow-black/60"
          : "bg-[#cfd4d9] border border-white/40 text-gray-900 shadow-xl"
      } ${className}`}
    >
      {/* Banner */}
      <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-slate-800">
        <Image
          src={bannerSrc}
          alt={`${data.name || "Profile"} banner`}
          fill
          priority
          sizes="(max-width: 640px) 340px, 360px"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Body */}
      <div className="px-5 pb-5">
        {/* Circular Avatar overlapping the banner */}
        <div className="relative -mt-12 mb-3 inline-block">
          <div
            className={`relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full border-4 shadow-lg ${
              isDark
                ? "border-[#181a22] bg-zinc-800"
                : "border-[#cfd4d9] bg-slate-300"
            }`}
          >
            <Image
              src={photoSrc}
              alt={data.name || "Ismail Abbasi"}
              fill
              priority
              sizes="(max-width: 640px) 96px, 112px"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Name */}
        <h3
          className={`text-xl sm:text-2xl font-bold tracking-tight leading-tight ${
            isDark ? "text-white" : "text-gray-950"
          }`}
        >
          {data.name}
        </h3>

        {/* Headline */}
        {data.headline && (
          <p
            className={`mt-1 text-xs sm:text-sm font-normal leading-snug ${
              isDark ? "text-zinc-300" : "text-gray-800"
            }`}
          >
            {data.headline}
          </p>
        )}

        {/* Location & Optional Phone */}
        <div
          className={`mt-1.5 flex flex-wrap items-center gap-x-2 text-xs ${
            isDark ? "text-zinc-400" : "text-gray-600"
          }`}
        >
          {data.location && <span>{data.location}</span>}
          {data.location && phoneText && <span>•</span>}
          {phoneText && (
            <a
              href={`tel:${phoneText.replace(/\s+/g, "")}`}
              className={`hover:underline ${
                isDark ? "hover:text-orange-400" : "hover:text-gray-950"
              }`}
            >
              {phoneText}
            </a>
          )}
        </div>

        {/* Bottom Section (e.g. Devdabs Limited) */}
        {bottom && bottom.text && (
          <div className="mt-4 pt-1">
            {bottom.href ? (
              <a
                href={bottom.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-3 p-2 rounded-xl transition border ${
                  isDark
                    ? "bg-white/[0.04] border-white/5 hover:border-orange-500/40 hover:bg-white/[0.07]"
                    : "bg-white/40 border-black/5 hover:bg-white/60"
                }`}
              >
                {bottom.logo && (
                  <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-lg bg-[#0d111d] shadow-sm">
                    <Image
                      src={bottom.logo}
                      alt={bottom.text}
                      fill
                      sizes="36px"
                      className="object-contain p-1"
                    />
                  </div>
                )}
                <span
                  className={`text-sm font-semibold transition ${
                    isDark
                      ? "text-zinc-100 group-hover:text-white"
                      : "text-gray-900 group-hover:text-black"
                  }`}
                >
                  {bottom.text}
                </span>
              </a>
            ) : (
              <div
                className={`flex items-center gap-3 p-2 rounded-xl border ${
                  isDark
                    ? "bg-white/[0.04] border-white/5"
                    : "bg-white/40 border-black/5"
                }`}
              >
                {bottom.logo && (
                  <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-lg bg-[#0d111d] shadow-sm">
                    <Image
                      src={bottom.logo}
                      alt={bottom.text}
                      fill
                      sizes="36px"
                      className="object-contain p-1"
                    />
                  </div>
                )}
                <span
                  className={`text-sm font-semibold ${
                    isDark ? "text-zinc-100" : "text-gray-900"
                  }`}
                >
                  {bottom.text}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
