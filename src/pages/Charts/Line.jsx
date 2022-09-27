import React from "react";

import { ChartsHeader, LineChart } from "../../components";

const Line = () => (
  <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
    <ChartsHeader
      category="Crypto Analysis"
      title="Rate Changes of Cryptocurrency with $10 Million+ Market Value in 2022 Fall"
    />
    <div className="w-full">
      <LineChart />
    </div>
  </div>
);

export default Line;
