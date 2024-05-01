import React from "react";
import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ChartContainer = styled.div`
  margin: 20px;
  padding: 20px;
  cursor: pointer;
  border-radius: 10px;
`;

const ChartTitle = styled.h2`
  margin-bottom: 20px;
`;

export default function Chart({ title, data, dataKey, grid }) {
  return (
    <ChartContainer>
      <ChartTitle>{title}</ChartTitle>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#5550bd" />
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
