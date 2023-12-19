import React, { useEffect, useState } from 'react'
import Slider from '../components/Slider';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import AdditionalInfo from '../components/AdditionalInfo';
import RecentListings from '../components/RecentListings';

const Home = () => {
  return (
    <section>
      {/* HERO */}
      <Hero />

      {/* SLIDER */}
      <Slider />

      <AdditionalInfo />

      {/* RECENT LISTINGS */}
      <RecentListings />

    </section>
  )
}

export default Home