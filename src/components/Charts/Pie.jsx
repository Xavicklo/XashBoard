import React from "react";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationLegend,
  PieSeries,
  AccumulationDataLabel,
  Inject,
  AccumulationTooltip,
} from "@syncfusion/ej2-react-charts";

import { useStateContext } from "../../contexts/ContextProvider";

const Doughnut = ({ id, data, legendVisiblity, height }) => {
  const { currentMode } = useStateContext();

  return (
    <AccumulationChartComponent
      id={id}
      legendSettings={{
        visible: legendVisiblity,
        background: currentMode === "dark" ? "#33373E" : "#fff",
        textStyle: { color: currentMode === "dark" ? "#edf2f7" : "#000" },
      }}
      height={height}
      background={currentMode === "dark" ? "#33373E" : "#fff"}
      tooltip={{ enable: true }}
    >
      <Inject
        services={[
          AccumulationLegend,
          PieSeries,
          AccumulationDataLabel,
          AccumulationTooltip,
        ]}
      />
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective
          name="Cost"
          dataSource={data}
          xName="x"
          yName="y"
          innerRadius="45%"
          startAngle={0}
          endAngle={330}
          radius="100%"
          explode={true}
          explodeOffset="10%"
          explodeIndex={3}
          opacity={0.5}
          palettes={[
            "#8D13A2",
            "#BF0B8F",
            "#FF0077",
            "#F5013A",
            "#EC0202",
            "#F63201",
            "#FF5E00",
          ]}
          dataLabel={{
            visible: true,
            name: "text",
            position: "Inside",
            font: {
              fontWeight: "600",
              color: "#fff",
            },
          }}
        />
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
  );
};

export default Doughnut;
