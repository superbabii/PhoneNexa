import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading as HeadingTitle } from "../../components/misc/Headings.js";
import { Container } from "components/misc/Layouts.js";
import { ReactComponent as QuotesLeftIcon } from "images/quotes-l.svg";
import { ReactComponent as QuotesRightIcon } from "images/quotes-r.svg";
import { ReactComponent as ArrowLeftIcon } from "images/arrow-left-2-icon.svg";
import { ReactComponent as ArrowRightIcon } from "images/arrow-right-2-icon.svg";
import womanImage from "images/woman.jpg";
import manImage from "images/man.jpg";
import ladyImage from "images/business-lady.jpg";

import "slick-carousel/slick/slick.css";

const HeadingInfoContainer = tw.div`flex flex-col items-center pb-4`;
const HeadingDescription = tw.p`mt-4 font-medium text-gray-600 text-center max-w-sm`;

const TestimonialSlider = styled(Slider)``;
const Testimonial = tw.div`flex! flex-col items-center md:items-stretch md:flex-row md:justify-center outline-none`;
const ImageContainer = styled.div`
  ${tw`md:mx-3 lg:mx-6 w-2/3 md:w-4/12 rounded flex items-center max-w-xs md:max-w-none`}
  img {
    ${tw`rounded`}
  }
`;
const TextContainer = tw.div`md:mx-3 lg:mx-6 md:w-6/12 py-4 flex flex-col justify-between`;
const QuoteContainer = tw.div`relative p-6 md:p-8 lg:p-10 mt-4 md:mt-0`;
const Quote = tw.blockquote`text-center md:text-left font-medium text-xl lg:text-2xl xl:text-3xl`;
const CustomerInfo = tw.div`px-5 lg:px-10 text-center md:text-left mt-4 md:mt-0`;
const CustomerName = tw.h5`font-bold text-lg lg:text-xl xl:text-2xl text-primary-500`;
const CustomerTitle = tw.p`font-medium text-sm`;

const QuotesLeft = tw(QuotesLeftIcon)`w-8 h-8 lg:w-10 lg:h-10 text-primary-500 absolute top-0 left-0`;
const QuotesRight = tw(QuotesRightIcon)`w-8 h-8 lg:w-10 lg:h-10 text-primary-500 absolute bottom-0 right-0`;

const SliderControlButtonContainer = styled.div`
  ${tw`absolute top-0 h-full flex items-end md:items-center z-20`}
  button {
    ${tw`text-secondary-500 hover:text-primary-500 focus:outline-none transition duration-300 transform hover:scale-125 transform -translate-y-2/3 md:translate-y-0`}
    svg {
      ${tw`w-8`}
    }
  }
`;

const NextArrow = ({ currentSlide, slideCount, ...props }) => (
  <SliderControlButtonContainer tw="right-0">
    <button {...props}>
      <ArrowRightIcon />
    </button>
  </SliderControlButtonContainer>
);
const PreviousArrow = ({ currentSlide, slideCount, ...props }) => (
  <SliderControlButtonContainer tw="left-0">
    <button {...props}>
      <ArrowLeftIcon />
    </button>
  </SliderControlButtonContainer>
);

export default () => {
  const testimonials = [
    {
      imageSrc:
        womanImage,
      quote:
        "Thanks to this advanced communication solution, my business operations have become more streamlined, efficient, and connected than ever before.",
      customerName: "Charlotte Hale",
      customerTitle: "CEO, Delos Inc."
    },
    {
      imageSrc:
        manImage,
      quote:
        "With the outstanding communication solution, my business operations flourished, enabling seamless connectivity and collaboration that propelled my success to new heights.",
      customerName: "Adam Cuppy",
      customerTitle: "Founder, EventsNYC"
    },
    {
      imageSrc:
        ladyImage,
      quote:
        "As a businesswoman, I highly recommend this communication solution for its seamless connectivity and efficient collaboration, which have greatly improved my professional interactions.",
      customerName: "Steven Marcetti",
      customerTitle: "Event Manager, Brite"
    }
  ];
  return (
    <Container>
      <HeadingInfoContainer>
        <HeadingTitle>Our Awesome Customers</HeadingTitle>
        <HeadingDescription></HeadingDescription>
      </HeadingInfoContainer>
      <TestimonialSlider nextArrow={<NextArrow />} prevArrow={<PreviousArrow />}>
        {testimonials.map((testimonial, index) => (
          <Testimonial key={index}>
            <ImageContainer>
              <img src={testimonial.imageSrc} alt={testimonial.customerName} />
            </ImageContainer>
            <TextContainer>
              <QuoteContainer>
                <QuotesLeft />
                <Quote>{testimonial.quote}</Quote>
                <QuotesRight />
              </QuoteContainer>
              <CustomerInfo>
                <CustomerName>{testimonial.customerName}</CustomerName>
                <CustomerTitle>{testimonial.customerTitle}</CustomerTitle>
              </CustomerInfo>
            </TextContainer>
          </Testimonial>
        ))}
      </TestimonialSlider>
    </Container>
  );
};
