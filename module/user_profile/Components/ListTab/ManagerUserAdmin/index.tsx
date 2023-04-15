import React, {useEffect, useState} from "react";
import "./index.scss";
import {useQuery} from "react-query";
import ApiAddress from "@app/api/ApiAddress";
import {Modal, Table} from "antd";
import {IconEdit} from "@app/components/Icon";
import {ListTab} from "@app/module/user_profile/Components/ListTab/ManagerUserAdmin/ListTab";
import {Pie} from "@ant-design/plots";

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

export function ManagerUserAdmin(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState<any>(null);

  const getDataListAllUser = (): Promise<any> => ApiAddress.getAllUser();
  const getDataPercent = (): Promise<any> => ApiAddress.getPercent();

  const dataListUser = useQuery("GET_DATA_LIST_ALL_USER", getDataListAllUser);
  const dataPercent = useQuery("GET_DATA_PERCENT", getDataPercent);

  console.log("dataPercent", dataPercent?.data);
  const showModal = (id: any) => {
    setIsModalOpen(true);
    setUserId(id);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    dataListUser.refetch();
    dataPercent.refetch();
  }, []);
  // console.log("dataListUser", dataListUser);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      align: "center",
    },
    {
      title: "Thao tác",
      dataIndex: "address",
      key: "address",
      align: "center",
      width: 120,
      render: (_: any, record: any): JSX.Element => (
        <IconEdit className="icon-edit" onClick={() => showModal(record.id)} />
      ),
    },
  ];
  return (
    <div className="manager-sale-order">
      <Table dataSource={dataListUser?.data ?? []} columns={columns} />
      <Modal
        title="Thông tin cá nhân"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ListTab userId={userId} />
      </Modal>
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
    </div>
  );
}
