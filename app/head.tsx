// File: app/head.tsx
import React from "react";

export default function Head() {
  return (
    <>
      <title>Money Management</title>
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="description" content="Mobile-first PWA for managing your money." />
      {/* Favicon for desktop browsers */}
      <link rel="icon" href="/icons/icon-48x48.png" sizes="48x48" type="image/png" />
      {/* SVG fallback for browsers that support it */}
    </>
  );
}
