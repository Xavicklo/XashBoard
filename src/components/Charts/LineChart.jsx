import React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  DateTime,
  Legend,
  Tooltip,
} from "@syncfusion/ej2-react-charts";

import {
  lineCustomSeries,
  LinePrimaryYAxis,
  LinePrimaryXAxis,
} from "../../data/dummy";
import { useStateContext } from "../../contexts/ContextProvider";

const LineChart = () => {
  const { currentMode } = useStateContext();

  return (
    <ChartComponent
      id="line-chart"
      height="420px"
      primaryXAxis={LinePrimaryXAxis}
      primaryYAxis={LinePrimaryYAxis}
      chartArea={{ border: { width: 0 } }}
      tootip={{ enable: true }}
      palettes={[
        "#BB1212",
        "#C3C3C3",
        "#00491D",
        "#067A0B",
        "#42016A",
        "#C89606",
      ]}
      background={currentMode === "dark" ? "#33373E" : "#fff"}
      legendSettings={{
        background: currentMode === "dark" ? "#33373E" : "#fff",
        textStyle: { color: currentMode === "dark" ? "#edf2f7" : "#000" },
      }}
      tooltipSettings={{
        visible: true,
        format: "${x} : ${yval}",
        trackLineSettings: {
          visible: true,
        },
      }}
    >
      <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {lineCustomSeries.map((item, index) => (
          <SeriesDirective key={index} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineChart;
