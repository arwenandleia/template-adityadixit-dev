import type { Metadata } from "next";
import { Geist, Geist_Mono, Merriweather, EB_Garamond } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import GlobalProviders from "@/components/client/GlobalProviders";
import RootHeader from "@/components/server/RootHeader";
import RootFooter from "@/components/server/RootFooter";

const ebGaramondHeading = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextJS Template",
  description:
    "Opinionated NextJS template with semi-rigid directory structure to ease adding features",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-serif",
        merriweather.variable,
        ebGaramondHeading.variable,
      )}
      suppressHydrationWarning
    >
      <body>
        <GlobalProviders>
          <div className="flex flex-col h-screen">
            <RootHeader />
            <main className="max-w-container typeset w-full h-full no-scrollbar">
              {children}
            </main>
            <RootFooter />
          </div>
        </GlobalProviders>
      </body>
    </html>
  );
}
