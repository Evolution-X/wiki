import { generateStaticParamsFor, importPage } from "nextra/pages";
import { useMDXComponents } from "../../mdx-components";

export async function generateMetadata(props) {
  const { mdxPath } = await props.params;
  const { metadata } = await importPage(mdxPath);
  return {
    metadataBase: new URL("https://wiki.evolution-x.org"),
    title: metadata.title || "Evolution X Wiki",
    description: metadata.description || "The official wiki for Evolution X.",
    icons: {
      icon: "/icon.svg",
    },
    openGraph: {
      type: "website",
      url: "https://wiki.evolution-x.org",
      siteName: "Evolution X Wiki",
      title: "Evolution X Wiki",
      description: "The official wiki for Evolution X.",
      determiner: "the",
      locale: "en_US",
      images: {
        url: "/keepevolving.png",
        width: 4888,
        height: 1622,
        alt: 'Evolution X\'s Banner "#KeepEvolving"',
        type: "image/png",
      },
    },
  };
}

//export const runtime = "edge";
export const generateStaticParams = generateStaticParamsFor("mdxPath");

const Wrapper = useMDXComponents().wrapper;

export default async function Page(props) {
  const params = await props.params;
  const result = await importPage(params.mdxPath);
  const { default: MDXContent, toc, metadata } = result;
  return (
    <Wrapper toc={toc} metadata={metadata}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
