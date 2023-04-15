import React, {useEffect, useState} from "react";
import {useQuery} from "react-query";
import ApiAddress from "@app/api/ApiAddress";
// eslint-disable-next-line import/no-extraneous-dependencies
import {Pie, Column} from "@ant-design/plots";

function DemoPie(props) {
  const {dataPercent, keyTab} = props;
  console.log("dataPercent", dataPercent);
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
function DemoColumn(props) {
  const {dataColumn, keyTab} = props;
  const [data, setData] = useState([]);
  console.log("|dataColumn", dataColumn);
  useEffect(() => {
    // asyncFetch();
    setData(dataColumn);
  }, []);

  const config = {
    data,
    xField: "name",
    yField: "quantityUserDislike",
    seriesField: "name",
    isGroup: true,
    columnStyle: {
      radius: [10, 10, 0, 0],
    },
  };

  return <Column {...config} />;
}
export function Statistical(): JSX.Element {
  const getDataListAllUser = (): Promise<any> => ApiAddress.getAllUser();
  const getDataPercent = (): Promise<any> => ApiAddress.getPercent();
  const getDataTongReaction = (): Promise<any> => ApiAddress.tongReaction();

  const dataListUser = useQuery("GET_DATA_LIST_ALL_USER", getDataListAllUser);
  const dataPercent = useQuery("GET_DATA_PERCENT", getDataPercent);
  const dataTongReact = useQuery("GET_DATA_TONG_REACTION", getDataTongReaction);

  console.log("dataPercent", dataPercent?.data);

  useEffect(() => {
    dataListUser.refetch();
    dataPercent.refetch();
  }, []);
  // console.log("dataListUser", dataListUser);

  return (
    <div className="manager-sale-order">
      <div style={{display: "flex", marginBottom: 20}}>
        <div style={{width: "50%"}}>
          <DemoPie
            dataPercent={dataPercent?.data?.percentLikeWatch}
            keyTab="like"
          />
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginRight: 50,
            }}
          >
            Tỉ lệ lượt like / lượt xem
          </span>
        </div>
        <div style={{width: "50%"}}>
          <DemoPie
            dataPercent={dataPercent?.data?.percentDislikeWatch}
            keyTab="dislike"
          />
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginRight: 50,
            }}
          >
            Tỉ lệ lượt dislike / lượt xem
          </span>
        </div>
      </div>
      <div style={{marginTop: 70}}>
        <DemoColumn dataColumn={dataTongReact?.data ?? []} keyTab="like" />
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginRight: 50,
          }}
        >
          Tổng lượt like cho từng danh mục
        </span>
      </div>
      <div style={{marginTop: 70}}>
        <DemoColumn dataColumn={dataTongReact?.data ?? []} keyTab="dislike" />
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginRight: 50,
          }}
        >
          Tổng lượt dislike cho từng danh mục
        </span>
      </div>
    </div>
  );
}
