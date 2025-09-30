import ExploreProjectsSlider from "../components/HomeComponents/ExploreProjectsSlider";
import PopUpStoresSection from "../components/FundraisingComponents/PopUpStoresSection";
import VirtualFundraisingIntro from "../components/FundraisingComponents/VirtualFundraisingIntro";
import PopcornFlavorsHero from "../components/HomeComponents/PopcornFlavorsHero";



export default function Fundraising() {
    return (
        <div >
            <VirtualFundraisingIntro />
            <PopUpStoresSection />
            <ExploreProjectsSlider/>
            <PopcornFlavorsHero/>
        </div>
    );
}
