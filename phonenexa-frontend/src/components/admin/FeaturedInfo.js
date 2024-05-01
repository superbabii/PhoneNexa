import { Stack } from "@mui/material";
import React from "react";
import styled from "styled-components";

const FeaturedItem = styled.div`
  flex: 1;
  padding: 30px;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

const FeaturedTitle = styled.span`
  font-size: 20px;
`;

const FeaturedMoneyContainer = styled.div`
  margin: 10px 0px;
  display: flex;
  align-items: center;
`;

const FeaturedMoney = styled.span`
  font-size: 30px;
  font-weight: 600;
`;

const FeaturedMoneyRate = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const FeaturedIcon = styled.div`
  font-size: 14px;
  margin-left: 5px;
  color: ${(props) => (props.negative ? "red" : "green")};
`;

const FeaturedSub = styled.span`
  font-size: 15px;
  color: grey;
`;

export default function FeaturedInfo() {
  return (
    <Stack
      direction="row"
      spacing={3}  // Adjust this value to set the desired spacing (30px in this case)
      sx={{
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <FeaturedItem>
        <FeaturedTitle>Revenue</FeaturedTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>$2,415</FeaturedMoney>
          <FeaturedMoneyRate>
            -11.2 <FeaturedIcon negative={true}>&#9660;</FeaturedIcon>
          </FeaturedMoneyRate>
        </FeaturedMoneyContainer>
        <FeaturedSub>Compared to last month</FeaturedSub>
      </FeaturedItem>
      <FeaturedItem>
        <FeaturedTitle>Sales</FeaturedTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>$3,415</FeaturedMoney>
          <FeaturedMoneyRate>
            -2.4 <FeaturedIcon negative={true}>&#9660;</FeaturedIcon>
          </FeaturedMoneyRate>
        </FeaturedMoneyContainer>
        <FeaturedSub>Compared to last month</FeaturedSub>
      </FeaturedItem>
      <FeaturedItem>
        <FeaturedTitle>Cost</FeaturedTitle>
        <FeaturedMoneyContainer>
          <FeaturedMoney>$2,225</FeaturedMoney>
          <FeaturedMoneyRate>
            +2.2 <FeaturedIcon>&#9650;</FeaturedIcon>
          </FeaturedMoneyRate>
        </FeaturedMoneyContainer>
        <FeaturedSub>Compared to last month</FeaturedSub>
      </FeaturedItem>
    </Stack>
  );
}
