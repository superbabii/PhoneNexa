import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Container } from "components/misc/Layouts.js";
import { ReactComponent as SvgDotPatternIcon } from "images/dot-pattern.svg";
import { SectionHeading as HeadingTitle } from "../../components/misc/Headings.js";
import firstImage from "images/first.jpg";
import secondImage from "images/second.jpg";
import thirdImage from "images/third.jpg";


const SingleColumn = tw.div`max-w-screen-xl mx-auto`;

const HeadingInfoContainer = tw.div`flex flex-col items-center`;
const HeadingDescription = tw.p`mt-4 font-medium text-gray-600 text-center max-w-xl`;

const Content = tw.div`mt-8`;

const Card = styled.div(props => [
  tw`mt-12 md:flex justify-between items-center`,
  props.reversed ? tw`flex-row-reverse` : "flex-row"
]);
const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded md:w-1/2 lg:w-5/12 xl:w-5/12 flex-shrink-0 h-80 md:h-144 bg-cover bg-center mx-4 sm:mx-8 md:mx-4 lg:mx-4`
]);
const Details = tw.div`mt-4 md:mt-0 md:max-w-md mx-4 sm:mx-8 md:mx-4 lg:mx-8`;
// const Subtitle = tw.div`font-bold tracking-wide text-secondary-100`;
const Title = tw.h5`text-4xl font-black tracking-wide text-gray-900`;
const Description = tw.p`text-xl mt-2 leading-loose`;
// const Link = tw.a`inline-block mt-4 text-sm text-primary-500 font-bold cursor-pointer transition duration-300 border-b-2 border-transparent hover:border-primary-500`;

const SvgDotPattern1 = tw(
  SvgDotPatternIcon
)`absolute top-0 left-0 transform -translate-x-20 rotate-90 translate-y-8 -z-10 opacity-25 text-primary-500 fill-current w-24`;
const SvgDotPattern2 = tw(
  SvgDotPatternIcon
)`absolute top-0 right-0 transform translate-x-20 rotate-45 translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24`;
const SvgDotPattern3 = tw(
  SvgDotPatternIcon
)`absolute bottom-0 left-0 transform -translate-x-20 rotate-45 -translate-y-8 -z-10 opacity-25 text-primary-500 fill-current w-24`;
const SvgDotPattern4 = tw(
  SvgDotPatternIcon
)`absolute bottom-0 right-0 transform translate-x-20 rotate-90 -translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24`;

export default () => {
  const cards = [
    {
      imageSrc: firstImage
        ,
      subtitle: "Paid",
      title: "Unleash business communication potential.",
      description:
        "Maximize your business communication capabilities with our advanced phone system, unlocking its full potential for seamless connectivity and collaboration.",
      url: "https://timerse.com"
    },

    {
      imageSrc:
        secondImage,
      subtitle: "Free",
      title: "Simplify, collaborate, elevate effortlessly.",
      description:
        "Effortlessly streamline operations, foster seamless collaboration, and elevate customer interactions with our simplified business solution.",
      url: "https://timerse.com"
    },

    {
      imageSrc:
        thirdImage,
      subtitle: "Exclusive",
      title: "Optimize business phone, transform communication.",
      description:
        "Enhance your business phone experience, revolutionizing communication and optimizing connectivity for increased efficiency.",
      url: "https://timerse.com"
    }
  ];

  return (
    <Container>
      <SingleColumn>
        <HeadingInfoContainer>
          <HeadingTitle>Get More Out Of Your Business Phone</HeadingTitle>
          <HeadingDescription>
            Optimize your business communication and productivity with our advanced phone system, ensuring you get more out of every call and connection.
          </HeadingDescription>
        </HeadingInfoContainer>
        <Content>
          {cards.map((card, i) => (
            <Card key={i} reversed={i % 2 === 1}>
              <Image imageSrc={card.imageSrc} />
              <Details>
                {/* <Subtitle>{card.subtitle}</Subtitle> */}
                <Title>{card.title}</Title>
                <Description>{card.description}</Description>
                {/* <Link href={card.url}>See Event Details</Link> */}
              </Details>
            </Card>
          ))}
        </Content>
      </SingleColumn>
      <SvgDotPattern1 />
      <SvgDotPattern2 />
      <SvgDotPattern3 />
      <SvgDotPattern4 />
    </Container>
  );
};
