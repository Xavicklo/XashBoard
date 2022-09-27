import React from "react";

import { pieChartData } from "../../data/dummy";
import { ChartsHeader, Pie as PieChart } from "../../components";

import { useStateContext } from "../../contexts/ContextProvider";

const Pie = () => {
  const { currentMode } = useStateContext();
  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <ChartsHeader category="Pie" title="Project Cost Breakdown" />
      <div className="w-full">
        <PieChart
          id="chart-pie"
          data={pieChartData}
          legendVisiblity
          background={currentMode === "dark" ? "#33373E" : "#fff"}
          height="full"
          legendSettings={{
            background: currentMode === "dark" ? "#33373E" : "#fff",
            textStyle: { color: currentMode === "dark" ? "#edf2f7" : "#000" },
          }}
        />
      </div>
    </div>
  );
};

export default Pie;
