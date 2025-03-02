import { useMDXComponents } from "nextra-theme-docs";
import type { ReactNode } from "react";
import { Children, isValidElement } from "react";

export function LunchCommand({
  children,
  type,
  language = "bash",
}: {
  children: ReactNode;
  type: "codeblock" | "inline";
  language?: string;
}) {
  const components = useMDXComponents();
  const Code = type === "codeblock" ? components.pre : components.code;

  let text = "";

  if (typeof children === "string") {
    text = children;
  } else if (
    isValidElement(children) &&
    typeof (children as { props: { children: string } }).props.children ===
      "string"
  ) {
    text = (children as { props: { children: string } }).props.children;
  } else {
    text = Children.toArray(children)
      .map((child) => (typeof child === "string" ? child : ""))
      .join("");
  }

  if (type === "codeblock" && language) {
    const NextraCode = components.code;
    return (
      <Code data-copy="" data-language={language}>
        <NextraCode data-language={language}>
          {text.replaceAll("$release", "ap4a")}
        </NextraCode>
      </Code>
    );
  }

  return <Code>{text.replaceAll("$release", "ap4a")}</Code>;
}
