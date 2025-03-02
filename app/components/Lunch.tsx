"use client";

import { Button } from "nextra/components";
import type { FC, ReactNode } from "react";
import { useEffect, useRef } from "react";

// From https://github.com/shuding/nextra/blob/main/docs/app/docs/guide/syntax-highlighting/_dynamic-code.tsx
export const LunchCommand: FC<{ children: ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null!);
  const tokenRef = useRef<HTMLSpanElement>(undefined);
  // Find the corresponding token from the DOM
  useEffect(() => {
    tokenRef.current = [
      //@ts-ignore
      ...ref.current.querySelectorAll<HTMLSpanElement>("code > span > span"),
    ].find((el) => el.textContent === "$release");
  }, []);

  useEffect(() => {
    if (tokenRef.current) {
      tokenRef.current.textContent = "ap4a";
    }
  }, [tokenRef.current]);

  return (
    <>
      <div ref={ref} className="mt-10">
        {children}
      </div>
    </>
  );
};
