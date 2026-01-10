import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

// Image generation - Creates a stylized "N" icon matching the Next Horizon brand
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          borderRadius: "32px",
        }}
      >
        {/* Stylized "N" logo for Next Horizon */}
        <svg
          width="120"
          height="130"
          viewBox="0 0 24 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* N shape with gradient effect */}
          <defs>
            <linearGradient id="nGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          {/* Left vertical stroke */}
          <path
            d="M4 22V4"
            stroke="url(#nGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Diagonal stroke */}
          <path
            d="M4 4L20 22"
            stroke="url(#nGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Right vertical stroke */}
          <path
            d="M20 4V22"
            stroke="url(#nGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
