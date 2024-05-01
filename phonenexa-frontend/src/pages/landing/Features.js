import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import { SectionHeading } from "components/misc/Headings.js";
import { Container } from "components/misc/Layouts.js";

import defaultCardImage from "images/shield-icon.svg";

import { ReactComponent as SvgDecoratorBlob3 } from "images/svg-decorator-blob-3.svg";

import SupportIconImage from "images/support-icon.svg";
import ShieldIconImage from "images/shield-icon.svg";
import CustomizeIconImage from "images/customize-icon.svg";
import FastIconImage from "images/fast-icon.svg";
import ReliableIconImage from "images/reliable-icon.svg";
import SimpleIconImage from "images/simple-icon.svg";

// const Container = tw.div`relative`;

const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-xl mx-auto`}
`;
const Heading = tw(SectionHeading)`w-full`;

const Column = styled.div`
  ${tw`md:w-1/2 lg:w-1/3 px-6 flex`}
`;

const Card = styled.div`
  ${tw`flex flex-col mx-auto max-w-xs items-center px-6 py-10 mt-12`}
  .imageContainer {
    ${tw`border-4 border-gray-400 text-center rounded-full p-6 flex-shrink-0 relative overflow-hidden`}
    img {
      ${tw`w-16 h-16 transition duration-300 transform hover:scale-110`}
    }

    &:hover {
      ${tw`bg-primary-500 border-primary-500`}
    }

    &:hover img {
      filter: brightness(0) invert(1);
    }
  }

  .textContainer {
    ${tw`mt-6 text-center`}
  }

  .title {
    ${tw`mt-2 font-bold text-xl leading-none text-primary-500`}
  }

  .description {
    ${tw`mt-3 font-semibold text-secondary-100 text-sm leading-loose`}
  }
`;

const DecoratorBlob = styled(SvgDecoratorBlob3)`
  ${tw`pointer-events-none absolute right-0 bottom-0 w-64 opacity-25 transform translate-x-32 translate-y-48 `}
`;

export default () => {

  const cards = [
    {
      imageSrc: ShieldIconImage,
      title: "Dedicated Business Numbers",
      description: "Enhance your professional image and communication efficiency with dedicated business numbers tailored to meet your corporate needs."
    },
    { imageSrc: SupportIconImage, 
      title: "Call Data Analytics", 
      description: "Benefit from uninterrupted support around the clock, ensuring prompt assistance for your business communication needs." 
    },
    { imageSrc: ReliableIconImage, 
      title: "Multiple Integrations", 
      description: "Experience a dependable solution that ensures seamless and uninterrupted business communication."  
    },
    { imageSrc: SimpleIconImage, 
      title: "Advanced Dialing Features", 
      description: "Effortlessly manage and streamline your business communication with a user-friendly solution designed for simplicity and ease."  
    },
    { imageSrc: CustomizeIconImage, 
      title: "Auto Attendant", 
      description: "Tailor the business communication solution to your specific needs with extensive customization options, empowering you to adapt and optimize your communication workflow."  
    },
    { imageSrc: FastIconImage, 
      title: "Single-click Call Functionality", 
      description: "Experience lightning-fast communication with our business solution, ensuring quick and efficient connectivity for seamless collaboration and productivity"  
    }
  ];

  return (
    <Container>
      <ThreeColumnContainer>
        <Heading>Why Choose <span tw="text-primary-600" style={{ fontFamily: 'exo', fontWeight: '300'}}>PhoneNexa?</span></Heading>
        {cards.map((card, i) => (
          <Column key={i}>
            <Card>
              <span className="imageContainer">
                <img src={card.imageSrc || defaultCardImage} alt="" />
              </span>
              <span className="textContainer">
                <span className="title">{card.title || "Fully Secure"}</span>
                {/* <p className="description">
                  {card.description || "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud. Sic Semper Tyrannis. Neoas Calie artel."}
                </p> */}
              </span>
            </Card>
          </Column>
        ))}
      </ThreeColumnContainer>
      <DecoratorBlob />
    </Container>
  );
};
