import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import styled from "styled-components";
import HeaderBase from "./landing/Header";
import Footer from "./landing/Footer";
import ContactUsForm from "./landing/Contacts";
import ContactDetails from "components/landing/ContactDetails";

const Header = styled(HeaderBase)`max-width: none; background-color: #742EEE;`;
export const Container = styled.div`
    margin-top: 110px;
`;
const Address = tw.span`leading-relaxed`;
const AddressLine = tw.span`block`;
const Email = tw.span`text-sm mt-6 block text-gray-500`;
const Phone = tw.span`text-sm mt-0 block text-gray-500`;

export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <ContactUsForm />
        <ContactDetails
          cards={[
            {
              title: "New York",
              description: (
                <>
                  <Address>
                    <AddressLine>40 Gates Court</AddressLine>
                    <AddressLine>Endicott, NY 13760</AddressLine>
                  </Address>
                  <Email>contact@PhoneNexa.com</Email>
                  <Phone>+1 (203) 991-6988</Phone>
                </>
              )
            },
            {
              title: "Illinois",
              description: (
                <>
                  <Address>
                    <AddressLine>602 Annadale Drive</AddressLine>
                    <AddressLine>Dekalb, IL 60115</AddressLine>
                  </Address>
                  <Email>contact@PhoneNexa.com</Email>
                  <Phone>+1 (203) 991-6988</Phone>
                </>
              )
            },
            {
              title: "California",
              description: (
                <>
                  <Address>
                    <AddressLine>96 NE. Delaware Lane</AddressLine>
                    <AddressLine>Sacramento, CA 95820</AddressLine>
                  </Address>
                  <Email>contact@PhoneNexa.com</Email>
                  <Phone>+1 (203) 991-6988</Phone>
                </>
              )
            },
            {
              title: "Tennessee",
              description: (
                <>
                  <Address>
                    <AddressLine>74 Peachtree Ave.</AddressLine>
                    <AddressLine>Dyersburg, TN 38024</AddressLine>
                  </Address>
                  <Email>contact@PhoneNexa.com</Email>
                  <Phone>+1 (203) 991-6988</Phone>
                </>
              )
            },
            {
              title: "New Jersey",
              description: (
                <>
                  <Address>
                    <AddressLine>8355 Summer Street</AddressLine>
                    <AddressLine>Manchester, NJ 08759</AddressLine>
                  </Address>
                  <Email>contact@PhoneNexa.com</Email>
                  <Phone>+1 (203) 991-6988</Phone>
                </>
              )
            },
            {
              title: "Ohio",
              description: (
                <>
                  <Address>
                    <AddressLine>7713 Snake Hill Ave.</AddressLine>
                    <AddressLine>Piqua, OH 45356</AddressLine>
                  </Address>
                  <Email>contact@PhoneNexa.com</Email>
                  <Phone>+1 (203) 991-6988</Phone>
                </>
              )
            }
          ]}
        />
        <Footer />
      </Container>
    </AnimationRevealPage>
  );
};
