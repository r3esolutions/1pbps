import Hero from "@/src/sections/Hero";
import PricingPreview from "@/src/sections/PricingPreview";
import TrustedBy from "@/src/sections/TrustedBy";
import Stats from "@/src/sections/Stats";
import DedicatedPlans from "@/src/sections/DedicatedPlans";
import ServerCategories from "@/src/sections/ServerCategories";
import GlobalNetwork from "@/src/sections/GlobalNetwork";
import WhyUs from "@/src/sections/WhyUs";
import Locations from "@/src/sections/Locations";
import ContactBlock from "@/src/sections/ContactBlock";
import CTA from "@/src/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Stats />
      <DedicatedPlans />
      <ServerCategories />
      <GlobalNetwork />
      <WhyUs />
      <Locations />
      <PricingPreview />
      <ContactBlock />
      <CTA />
    </>
  );
}
