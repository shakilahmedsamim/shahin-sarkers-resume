"use client";

import { useEffect, useState } from "react";

export default function Avatar({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const img = new window.Image();
    img.onload = () => {
      if (!cancelled) setLoaded(true);
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!loaded) {
    return (
      <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white/40 bg-white/10">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-14 w-14 text-white/90"
        >
          <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5Zm0 2c-3.87 0-9 1.94-9 5.78V22h18v-2.22C21 15.94 15.87 14 12 14Z" />
        </svg>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="h-28 w-28 rounded-full border-4 border-white/40 object-cover"
    />
  );
}
