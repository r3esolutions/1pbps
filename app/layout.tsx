import Script from "next/script";
import Header from "@/src/components/Header";
import Footer from "@/src/sections/Footer";
import FloatingActions from "@/src/components/FloatingActions";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "1PBPS - Dedicated Servers, GPU Servers, Cloud VPS and Colocation",
  description: "Dedicated Servers, GPU Servers, Cloud VPS, Colocation, IP Transit and Global Datacenter Infrastructure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">
        <Header />
        <main className="flex-1 pt-24">
          {children}
        </main>
        <FloatingActions />
        <Footer />
      <Script id="tawk-to" strategy="afterInteractive">{`
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),
s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src="https://embed.tawk.to/6189e58f6885f60a50baebc4/1fk1ahf3d";
s1.charset="UTF-8";
s1.setAttribute("crossorigin","*");
s0.parentNode.insertBefore(s1,s0);
})();
`}</Script>
<Script id="schema" type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"Organization","name":"1PBPS","url":"https://jangir.in","description":"Dedicated Servers, AMD EPYC Servers, GPU Servers and Global Infrastructure","sameAs":[]})}</Script>
</body>
    </html>
  );
}
