import React, { useState, useEffect } from 'react';
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "../../helpers/AnimationRevealPage.js";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';

import Hero from "./Hero";
import Features from "./Features.js";
import DownloadApp from './DownloadApp.js';
// import MainFeature from "./TwoColWithTwoHorizontalFeaturesAndButton.js";
import FeatureStats from "./FeatureStats.js";
import Pricing from "./Pricing.js";
import MainFeature from "./MainFeatures.js";
import MainFeatureFirst from "./MainFeaturesFirst.js";
import Testimonial from "./Testimonials.js";
import FAQ from "./Faq.js";
// import GetStarted from "./GetStarted.js";
import Contact from "./Contacts.js";
import Footer from "./Footer.js";

const HighlightedText = tw.span`text-primary-500`

export default () => {
  const [isVisible, setIsVisible] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width: 1024px)');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop > 300); // Adjust the scroll position threshold as needed
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimationRevealPage>
      <Hero />
      <MainFeatureFirst />
      <MainFeature />
      <Features
        heading={<>Amazing <HighlightedText>Features</HighlightedText></>}
      />
      <FeatureStats />
      {/* <MainFeature
        heading={<>Cloud built by and for <HighlightedText>Professionals</HighlightedText></>}
      /> */}
      <Testimonial
        heading={<>Our Clients <HighlightedText>Love Us</HighlightedText></>}
      />
      <Pricing
        heading={<>Flexible <HighlightedText>Plans</HighlightedText></>}
      />
      <DownloadApp />
      <FAQ
        heading={<>Any <HighlightedText>Questions ?</HighlightedText></>}
      />
      {/* <GetStarted/> */}
      <Contact />
      <Footer />

      <IconButton
        style={{
          display: isVisible ? 'block' : 'none',
          boxShadow: "0 0 8px 4px rgba(0, 0, 0, 0.3)",
        }}
        onClick={scrollToTop}
        size={isSmallScreen ? 'small' : 'medium'}
        sx={{
          position: 'fixed',
          bottom: isSmallScreen ? '1rem' : '2rem',
          right: isSmallScreen ? '1rem' : '2rem',
          backgroundColor: '#742EEE',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#501eee',
          },
          // width: isSmallScreen ? '38px' :'52px',
          // height: isSmallScreen ? '48px' : '52px',
        }}
      >
        <ArrowUpwardIcon />
      </IconButton>
    </AnimationRevealPage>
  );
}
