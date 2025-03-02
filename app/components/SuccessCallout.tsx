import { useTheme } from "nextra-theme-docs";
import { useEffect, useState, type ReactNode } from "react";
import cn from "clsx";

const theme = {
  light: "bg-green-100 text-green-800 border-green-200",
  dark: "bg-green-500/20 text-green-300 border-green-400/30",
};

export default function SuccessCallout({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "nextra-callout x:overflow-x-auto x:mt-6 x:flex x:rounded-lg x:border x:py-2 x:pe-4",
        "x:contrast-more:border-current!",
        "x:border-green-100 x:bg-green-50 x:text-green-900 x:dark:border-green-200/30 x:dark:bg-green-700/30 x:dark:text-green-200"
      )}
      style={{
        borderColor: "#3fb95090",
        backgroundColor: "#3fb95050",
        color: "#bfe8c5",
      }}
    >
      <div
        className="x:select-none x:text-xl x:ps-3 x:pe-2"
        style={{
          fontFamily:
            '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        }}
        data-pagefind-ignore="all"
      >
        ✅
      </div>
      <div className="x:w-full x:min-w-0 x:leading-7">{children}</div>
    </div>
  );
}
