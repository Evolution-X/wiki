"use client";

import { Button } from "nextra/components";
import type { FC, ReactNode } from "react";
import { useEffect, useRef } from "react";

// From https://github.com/shuding/nextra/blob/main/docs/app/docs/guide/syntax-highlighting/_dynamic-code.tsx
export const LunchCommand: FC<{ children: ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null!);
  const tokenRefs = useRef<HTMLSpanElement[]>([]);
  // Find all corresponding tokens from the DOM
  useEffect(() => {
    tokenRefs.current = [
      //@ts-ignore
      ...ref.current.querySelectorAll<HTMLSpanElement>("code > span > span"),
    ].filter((el) => el.textContent === "$release");
  }, []);

  useEffect(() => {
    tokenRefs.current.forEach((token) => {
      if (token) {
        token.textContent = "bp2a";
      }
    });
  }, [tokenRefs.current]);

  return (
    <>
      <div ref={ref} className="mt-10">
        {children}
      </div>
    </>
  );
};
