import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import styled from "styled-components";
import HeaderBase from "./landing/Header";
import Pricing from "./landing/Pricing";
import Testimonial from "components/landing/PriceTestimonials";
import Footer from "./landing/Footer";
import FAQ from "components/landing/PriceFaq";

const Header = styled(HeaderBase)`max-width: none; background-color: #742EEE;`;
export const Container = styled.div`
    margin-top: 110px;
`;
export default () => {
  return (
    <AnimationRevealPage>
      <Header />
        <Container>
          <Pricing />
          <Testimonial
            heading="Our Paying Customers"
          />
          <FAQ />
          <Footer/>
        </Container>
    </AnimationRevealPage>
  );
};
