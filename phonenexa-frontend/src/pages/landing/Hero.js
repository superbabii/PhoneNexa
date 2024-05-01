import React from "react";
import styled, { keyframes } from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import HeaderBase from "./Header";
import { SectionHeading } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { Container} from "components/misc/Layouts.js";
import countsBgImage from 'images/counts-bg.png';
import heroImage from 'images/hero-img.png';  // Import the image

const Header = styled(HeaderBase)`max-width: none;`;
const Row = tw.div`
  relative
  flex 
  flex-col 
  lg:flex-row 
  justify-between 
  items-center 
  max-w-screen-2xl
  py-16
  2xl:py-0
  px-16
`;
const Column = tw.div``;
const TextColumn = tw(Column)`mr-auto lg:mr-0 max-w-3xl lg:max-w-lg xl:max-w-2xl`;

const Heading = styled(SectionHeading)`${tw`
  text-left
  text-white
  leading-snug
  text-4xl
  sm:text-5xl
  md:text-6xl
  lg:text-5xl
  2xl:text-6xl
  `}
  font-family: 'Exo';
  @media (min-width: 1024px) {
    max-width: 50vw;
  }
`;
const Description = tw(SectionDescription)`mt-4 lg:text-base text-white max-w-lg`;
const PrimaryButton = styled(PrimaryButtonBase)`
  ${tw`
    mt-8
    rounded-full
    inline-block
    w-48
    py-4
    tracking-wide
    text-center
    bg-white
    text-[#742EEE]
  `}
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);

  @media (min-width: 1440px) {
    width: 13rem;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }
`;

const ImageColumn = tw(Column)`
  relative  
  ml-auto 
  lg:ml-16 
  lg:mr-0  
  lg:mt-0 
  w-1/2`;
const ImageContainer = tw.div`relative z-40 justify-center items-center hidden lg:block`;

const moveUpDown = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(20px);
  }
  100% {
    transform: translateY(0);
  }
`;

// Apply the animation to the Image component
const Image = styled.img`
  border-radius: 0 0 1rem 1rem;
  position: relative;
  z-index: 20;
  animation: ${moveUpDown} 4s infinite; // 2s duration, infinite loop
`;

const StyledComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: url(${countsBgImage}) center/cover no-repeat;
  height: 100vh;
  @media (max-width: 1024px) {
    flex-direction: row;
  }
`;

export default ({
  heading = "Connect and Collaborate Anywhere, Anytime",
  description = "Streamline your business communication with ease, connecting and collaborating effortlessly anytime, anywhere.",
  primaryButtonUrl = "/communications",
  primaryButtonText = "Get Started",
}) => {
  
  return (
    <>
    <StyledComponent>
      <Header/>
      <Container>
          <Row>
            <TextColumn>
              <Heading>{heading}</Heading>
              <Description>{description}</Description>
              <PrimaryButton as="a" href={primaryButtonUrl}>
                {primaryButtonText}
              </PrimaryButton>
            </TextColumn>
            <ImageColumn>
              <ImageContainer>
                <Image src={heroImage} />
              </ImageContainer>
            </ImageColumn>
          </Row>
      </Container>
      </StyledComponent>
    </>
  );
};
