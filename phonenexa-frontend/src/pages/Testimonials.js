import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import styled from "styled-components";
import HeaderBase from "./landing/Header";
import Testimonials from "./landing/Testimonials";
import PriceTestimonial from "components/landing/PriceTestimonials";
import Footer from "./landing/Footer";

const Header = styled(HeaderBase)`max-width: none; background-color: #742EEE;`;
export const Container = styled.div`
    margin-top: 110px;
`;
export default () => {
  return (
    <AnimationRevealPage>
      <Header />
        <Container>
          <Testimonials />
          <PriceTestimonial
            heading="Our Paying Customers"
          />
          <Footer/>
        </Container>
    </AnimationRevealPage>
  );
};
