import React from "react";
import styled from "styled-components";
import FeaturedInfo from "components/admin/FeaturedInfo";
import Chart from "components/admin/Chart";
import { userData } from "./dummyData";
import WidgetSm from "components/admin/WidgetSm";
import WidgetLg from "components/admin/WidgetLg";

export const DefaultContainer = styled.div`
  flex: 5;
  padding-left: 320px;
  width: calc(100vw - 340px);
  margin: 20px;
  @media (max-width: 1440px) {
    padding-left: 260px;
  }
`;

const HomeWidgets = styled.div`
  display: flex;
`;

const HomeChart = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  border-radius: 5px;
`;

export default function Home() {
  return (
    <DefaultContainer>
      <FeaturedInfo />
      <HomeChart>
        <Chart data={userData} title={"User Analytics"} dataKey={"Active Users"} grid={true} />
      </HomeChart>
      <HomeWidgets>
        <WidgetSm />
        <WidgetLg />
      </HomeWidgets>
    </DefaultContainer>
  );
}
