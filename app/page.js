import "./globals.css";
import HeroSection from "./components/HeroSection";
import PopularCategories from "./components/PopularCategories";
import ExploreProjectsSlider from "./components/ExploreProjectsSlider";
import JoyMissionSection from "./components/JoyMissionSection";
import VirtualFundraisingSection from "./components/VirtualFundraisingSection";
import SuccessStoriesSlider from "./components/SuccessStoriesSlider";
import PopcornFlavorsHero from "./components/PopcornFlavorsHero";

export default function Home() {
  return (
    <div >
      <HeroSection />
      <JoyMissionSection/>
      <PopularCategories />
      <VirtualFundraisingSection/>
      <SuccessStoriesSlider/>
      <ExploreProjectsSlider/>
      <PopcornFlavorsHero/>

    </div>
  );
}
