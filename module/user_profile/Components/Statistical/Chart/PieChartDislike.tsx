import React, {useEffect} from "react";
import {Pie} from "@ant-design/plots";

export function PieChartDislike(props): JSX.Element {
  const {dataPercent, keyTab} = props;

  const data = [
    {
      type: keyTab === "like" ? "Lượt like" : "Lượt dislike",
      value: dataPercent,
    },
    {
      type: keyTab === "like" ? "Chưa like" : "Chưa dislike",
      value: 100 - dataPercent,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} \n {percentage}",
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],
  };

  return <Pie {...config} />;
}
