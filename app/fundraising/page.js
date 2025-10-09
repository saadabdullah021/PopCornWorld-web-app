'use client'
import ExploreProjectsSlider from "../components/HomeComponents/ExploreProjectsSlider";
import PopUpStoresSection from "../components/FundraisingComponents/PopUpStoresSection";
import VirtualFundraisingIntro from "../components/FundraisingComponents/VirtualFundraisingIntro";
import PopcornFlavorsHero from "../components/HomeComponents/PopcornFlavorsHero";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCampaigns } from '../store/slices/appSlice';


export default function Fundraising() {
     const dispatch = useDispatch();
  const { campaigns, campaignsLoading, campaignsError, globalSettings } = useSelector(state => state.app);

  useEffect(() => {
    if (!campaigns && !campaignsLoading) {
      dispatch(fetchCampaigns());
    }
  }, [dispatch, campaigns, campaignsLoading]);
    return (
        <div >
            <VirtualFundraisingIntro />
            <PopUpStoresSection />
            <ExploreProjectsSlider
                    campaigns={campaigns}
        campaignsLoading={campaignsLoading}
        campaignsError={campaignsError}
        globalSettings={globalSettings}/>
            <PopcornFlavorsHero/>
        </div>
    );
}
