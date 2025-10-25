'use client'
import "./globals.css";
import HeroSection from "./components/HomeComponents/HeroSection";
import PopularCategories from "./components/HomeComponents/PopularCategories";
import ExploreProjectsSlider from "./components/HomeComponents/ExploreProjectsSlider";
import JoyMissionSection from "./components/HomeComponents/JoyMissionSection";
import VirtualFundraisingSection from "./components/HomeComponents/VirtualFundraisingSection";
import SuccessStoriesSlider from "./components/HomeComponents/SuccessStoriesSlider";
import PopcornFlavorsHero from "./components/HomeComponents/PopcornFlavorsHero";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampaigns } from './store/slices/appSlice';

export default function Home() {
  const dispatch = useDispatch();
  const { campaigns, campaignsLoading, campaignsError, globalSettings } = useSelector(state => state.app);

  useEffect(() => {
    if (!campaigns && !campaignsLoading) {
      dispatch(fetchCampaigns());
    }
  }, [dispatch, campaigns, campaignsLoading]);


  return (
    <div >
      <HeroSection />
      <JoyMissionSection/>
      {/* <PopularCategories /> */}
      <VirtualFundraisingSection/>
      {/* <SuccessStoriesSlider/> */}
      <ExploreProjectsSlider 
        campaigns={campaigns}
        campaignsLoading={campaignsLoading}
        campaignsError={campaignsError}
        globalSettings={globalSettings}
      />
      <PopcornFlavorsHero/>

    </div>
  );
}
