
import { Divider } from "@mui/material";
import Hero from "@/components/Hero";
import LogoCollection from "@/components/LogoCollection";
import Features from "@/components/Features";
import Highlights from "@/components/Highlights";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <div>
      <Hero />
      <div>
        <LogoCollection />
        <Features />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
      </div>

    </div>
  );
}
