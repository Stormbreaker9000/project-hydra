
import { Divider } from "@mui/material";
import Hero from "@/app/marketing/_components/Hero";
import LogoCollection from "@/app/marketing/_components/LogoCollection";
import Features from "@/app/marketing/_components/Features";
import Highlights from "@/app/marketing/_components/Highlights";
import Pricing from "@/app/marketing/_components/Pricing";
import FAQ from "@/app/marketing/_components/FAQ";

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
