import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation - Creates a stylized "horizon" icon matching the brand
export default function Icon() {
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
          borderRadius: "6px",
        }}
      >
        {/* Stylized horizon with rising sun/arrow representing forward movement */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Horizon line */}
          <path
            d="M2 16h20"
            stroke="#22d3ee"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Rising arc/sun above horizon */}
          <path
            d="M6 16c0-3.314 2.686-6 6-6s6 2.686 6 6"
            stroke="#06b6d4"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Upward arrow/peak representing growth/leadership */}
          <path
            d="M12 4v6M9 7l3-3 3 3"
            stroke="#0ea5e9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
