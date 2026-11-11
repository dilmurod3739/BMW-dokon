import React from 'react';

export function BmwLogo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="BMW Logo"
    >
      {/* Outer border */}
      <circle cx="50" cy="50" r="48" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      {/* Black Outer Ring */}
      <circle cx="50" cy="50" r="47" fill="#0A0A0C" />
      
      {/* BMW Letters in Arch */}
      {/* B */}
      <text
        x="33"
        y="26"
        fill="#FFFFFF"
        fontSize="13"
        fontWeight="bold"
        fontFamily="sans-serif"
        textAnchor="middle"
        transform="rotate(-36 33 26)"
      >
        B
      </text>
      {/* M */}
      <text
        x="50"
        y="18"
        fill="#FFFFFF"
        fontSize="13"
        fontWeight="bold"
        fontFamily="sans-serif"
        textAnchor="middle"
      >
        M
      </text>
      {/* W */}
      <text
        x="67"
        y="26"
        fill="#FFFFFF"
        fontSize="13"
        fontWeight="bold"
        fontFamily="sans-serif"
        textAnchor="middle"
        transform="rotate(36 67 26)"
      >
        W
      </text>

      {/* Inner Ring Border */}
      <circle cx="50" cy="50" r="30" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />

      {/* 4 Quadrants: Top-left blue, Top-right white, Bottom-right blue, Bottom-left white */}
      <g clipPath="url(#bmw-circle-clip)">
        {/* Top-Left Quadrant: Blue */}
        <path d="M50 50 L50 20 A30 30 0 0 0 20 50 Z" fill="#0066B1" />
        {/* Top-Right Quadrant: White */}
        <path d="M50 50 L80 50 A30 30 0 0 0 50 20 Z" fill="#F8FAFC" />
        {/* Bottom-Right Quadrant: Blue */}
        <path d="M50 50 L50 80 A30 30 0 0 0 80 50 Z" fill="#0066B1" />
        {/* Bottom-Left Quadrant: White */}
        <path d="M50 50 L20 50 A30 30 0 0 0 50 80 Z" fill="#F8FAFC" />
      </g>

      <defs>
        <clipPath id="bmw-circle-clip">
          <circle cx="50" cy="50" r="30" />
        </clipPath>
      </defs>
    </svg>
  );
}
