'use client'
import "./globals.css";
import HeroSection from "./components/HeroSection";
import PopularCategories from "./components/PopularCategories";
import ExploreProjectsSlider from "./components/ExploreProjectsSlider";
import JoyMissionSection from "./components/JoyMissionSection";
import VirtualFundraisingSection from "./components/VirtualFundraisingSection";
import SuccessStoriesSlider from "./components/SuccessStoriesSlider";
import PopcornFlavorsHero from "./components/PopcornFlavorsHero";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampaigns } from './store/slices/appSlice';

export default function Home() {
  const dispatch = useDispatch();
  const { campaigns, campaignsLoading, campaignsError } = useSelector(state => state.app);

  useEffect(() => {
    if (!campaigns && !campaignsLoading) {
      dispatch(fetchCampaigns());
    }
  }, [dispatch, campaigns, campaignsLoading]);


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
