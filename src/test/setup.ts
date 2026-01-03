import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import * as React from "react";

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    motion: {
      div: (props: React.ComponentPropsWithoutRef<"div">) =>
        React.createElement("div", props),
      span: (props: React.ComponentPropsWithoutRef<"span">) =>
        React.createElement("span", props),
      form: (props: React.ComponentPropsWithoutRef<"form">) =>
        React.createElement("form", props),
      p: (props: React.ComponentPropsWithoutRef<"p">) =>
        React.createElement("p", props),
    },
  };
});
