import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Banner, Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import "material-symbols";
import "../styles.css";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://wiki.evolution-x.org"),
  title: "Evolution X Wiki",
  description: "The official wiki for Evolution X.",
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

const banner = (
  <Banner storageKey="evolution-x-10-3">Evolution X 10.3 released 🎉</Banner>
);
const logo = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 39 54"
    fill="none"
  >
    <path
      d="M37.0867 2H4.60425L13.0256 10.3138H35.4826L37.0867 2Z"
      fill="white"
    />
    <path
      d="M34.2794 20.2111H5.4061L3 28.9208L28.6651 50.695L31.0712 40.7976L17.4366 28.9208H36.6855L34.2794 20.2111Z"
      fill="white"
    />
  </svg>
);
const navbar = (
  <Navbar
    logo={
      <div style={{ display: "flex", alignItems: "center" }}>
        {logo}
        <b style={{ marginLeft: 5 }}>Evolution X Wiki</b>
      </div>
    }
    // ... Your additional navbar options
  />
);
const footer = <Footer>#KeepEvolving</Footer>;

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      // Not required, but good for SEO
      lang="en"
      // Required to be set
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head
      // ... Your additional head options
      >
        {/* Your additional tags should be passed as `children` of `<Head>` element */}
      </Head>
      <body>
        <Layout
          //banner={banner} // uncomment to show optional banner
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/Evolution-X/wiki/tree/main"
          footer={footer}
          darkMode
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
