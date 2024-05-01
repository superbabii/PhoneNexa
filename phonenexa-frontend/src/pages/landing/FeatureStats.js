import React from "react";
import tw from "twin.macro";
// import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { ContentWithPaddingXl } from "components/misc/Layouts";


const Container = tw.div`relative my-8 lg:my-10 bg-primary-600 text-gray-100 -mx-8 px-8 shadow-[0 0 8px 2px rgba(0, 0, 0, 0.8)]`;

const HeadingContainer = tw.div``;
const Heading = tw(SectionHeading)`sm:text-3xl md:text-4xl lg:text-5xl text-white`;
const Subheading = tw(SubheadingBase)`text-gray-100 text-center`;

export default ({
  subheading = "",
  heading = "Trusted by over 250 businesses",

}) => {
  return (
    <Container>
      <ContentWithPaddingXl>
        <HeadingContainer>
          {subheading && <Subheading>{subheading}</Subheading>}
          <Heading>{heading}</Heading>
        </HeadingContainer>
      </ContentWithPaddingXl>
    </Container>
  );
};
