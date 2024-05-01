import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { Container } from "components/misc/Layouts.js";
import { ReactComponent as SvgDecoratorBlob } from "images/svg-decorator-blob-6.svg";

const Heading = tw(SectionHeading)`w-full`;

const PlansContainer = tw.div`flex justify-between flex-col lg:flex-row items-center lg:items-stretch relative`;
const Plan = styled.div`
  ${tw`w-full max-w-sm mt-16 lg:mx-4 text-center px-8 rounded-lg shadow-2xl relative pt-2 text-gray-900 bg-white flex flex-col`}
  .planHighlight {
    ${tw`rounded-t-lg absolute top-0 inset-x-0 h-2`}
  }

  ${props =>
    props.featured &&
    css`
      background: rgb(100,21,255);
      background: linear-gradient(135deg, rgba(100,21,255,1) 0%, rgba(128,64,252,1) 100%);
      background: rgb(85,60,154);
      background: linear-gradient(135deg, rgba(85,60,154,1) 0%, rgba(128,90,213,1) 100%);
      background: rgb(76,81,191);
      background: linear-gradient(135deg, rgba(76,81,191,1) 0%, rgba(102,126,234,1) 100%);
      ${tw`bg-primary-500 text-gray-100`}
      .planHighlight {
        ${tw`hidden`}
      }
      .duration {
        ${tw`text-gray-200!`}
      }
      ${PlanFeatures} {
        ${tw`border-indigo-500`}
      }
      .feature:not(.mainFeature) {
        ${tw`text-gray-300!`}
      }
      ${BuyNowButton} {
        ${tw`bg-gray-100 text-primary-500 hocus:bg-gray-300 hocus:text-primary-800`}
    `}
`;

const PlanHeader = styled.div`
  ${tw`flex flex-col uppercase leading-relaxed py-8`}
  .name {
    ${tw`font-bold text-xl`}
  }
  .price {
    ${tw`font-bold text-4xl sm:text-3xl my-1`}
  }
  .duration {
    ${tw`text-gray-500 font-bold tracking-widest`}
    text-decoration: line-through;
  }
`;
const PlanFeatures = styled.div`
  ${tw`flex flex-col -mx-8 px-8 py-8 border-t-2 border-b-2 flex-1`}
  .feature {
    ${tw`mt-5 first:mt-0 font-medium`}
    &:not(.mainFeature) {
      ${tw`text-gray-600`}
    }
  }
  .mainFeature {
    ${tw`text-xl font-bold tracking-wide`}
  }
`;

const PlanAction = tw.div`px-4 sm:px-8 xl:px-16 py-8`;
const BuyNowButton = styled(PrimaryButtonBase)`
  ${tw`rounded-full uppercase tracking-wider py-4 w-full text-sm hover:shadow-xl transform hocus:translate-x-px hocus:-translate-y-px focus:shadow-outline`}
`;

const DecoratorBlob = styled(SvgDecoratorBlob)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-25 transform -translate-x-1/2 translate-y-1/2`}
`;


export default ({
  heading = "Flexible Plans.",
  plans = null,
  primaryButtonText = "Buy Now"
}) => {
  const defaultPlans = [
    {
      name: "Solo",
      price: "$24.99/month",
      duration: "$39.99",
      mainFeature: "Suited for Personal",
      features: ["1 Number", "2 Users", "2 Automated Assistants", "100 Bulk Text Messages"],
    },
    {
      name: "Partner",
      price: "$64.99/month",
      duration: "$79.99",
      mainFeature: "Suited for Partner",
      features: ["5 Number", "5 Users", "3 Automated Assistants", "100 Bulk Text Messages"],
      featured: true,
    },
    {
      name: "Small Business",
      price: "$89.99/month",
      duration: "$99.99",
      mainFeature: "Suited for Small Business",
      features: ["10 Number", "10 Users", "10 Automated Assistants", "100 Bulk Text Messages"],
    },
  ];

  if (!plans) plans = defaultPlans;

  const highlightGradientsCss = [
    css`
      background: rgb(56, 178, 172);
      background: linear-gradient(115deg, rgba(56, 178, 172, 1) 0%, rgba(129, 230, 217, 1) 100%);
    `,
    css`
      background: rgb(56, 178, 172);
      background-image: linear-gradient(115eee, #641eee, #742eee, #824eee, #8e5eee, #9a6eee);
    `,
    css`
      background: rgb(245, 101, 101);
      background: linear-gradient(115deg, rgba(245, 101, 101, 1) 0%, rgba(254, 178, 178, 1) 100%);
    `
  ];

  return (
    <Container>
      <Heading>{heading}</Heading>
      <PlansContainer>
        {plans.map((plan, index) => (
          <Plan key={index} featured={plan.featured}>
            {!plan.featured && <div className="planHighlight" css={highlightGradientsCss[index % highlightGradientsCss.length]} />}
            <PlanHeader>
              <span className="name">{plan.name}</span>
              <span className="price">{plan.price}</span>
              <span className="duration">{plan.duration}</span>
            </PlanHeader>
            <PlanFeatures>
              <span className="feature mainFeature">{plan.mainFeature}</span>
              {plan.features.map((feature, index) => (
                <span key={index} className="feature">
                  {feature}
                </span>
              ))}
            </PlanFeatures>
            <PlanAction>
              <BuyNowButton css={!plan.featured && highlightGradientsCss[index]}>{primaryButtonText}</BuyNowButton>
            </PlanAction>
          </Plan>
        ))}
        <DecoratorBlob />
      </PlansContainer>
    </Container>
  );
};
