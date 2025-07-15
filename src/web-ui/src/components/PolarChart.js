import React from "react";
import {
  VictoryArea,
  VictoryChart,
  VictoryContainer,
  VictoryPolarAxis,
  VictoryTheme,
} from "victory";

const PolarChart = (props) => {
  const isDark = props.mode === "dark";
  
  return (
    <div className="rounded-2xl bg-white/30 dark:bg-gray-800/30 p-4 backdrop-blur-sm shadow-lg border border-gray-100 dark:border-gray-700">
      <VictoryChart
        polar
        theme={VictoryTheme.material}
        containerComponent={<VictoryContainer responsive={false} />}
        width={650}
        height={250}
        padding={{ top: 60, bottom: 60, left: 50, right: 180 }}
      >
        <VictoryArea
          data={props.data}
          style={{
            data: { 
              fill: "url(#gradientFill)",
              fillOpacity: 0.8,
              stroke: "#FF9900",
              strokeWidth: 2
            },
          }}
        />
        <VictoryPolarAxis
          theme={VictoryTheme.material}
          style={{
            axis: { fill: "none" },
            tickLabels: { fill: isDark ? "#e0e0e0" : "#444" },
            grid: { stroke: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }
          }}
        />
        <defs>
          <linearGradient id="gradientFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF9900" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#FF9900" stopOpacity={0.2} />
          </linearGradient>
        </defs>
      </VictoryChart>
    </div>
  );
};

export default PolarChart;
