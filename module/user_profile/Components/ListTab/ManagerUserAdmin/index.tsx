import React, {useEffect, useState} from "react";
import "./index.scss";
import {useQuery} from "react-query";
import ApiAddress from "@app/api/ApiAddress";
import {Modal, Table} from "antd";
import {IconEdit} from "@app/components/Icon";
import {ListTab} from "@app/module/user_profile/Components/ListTab/ManagerUserAdmin/ListTab";

export function ManagerUserAdmin(): JSX.Element {
  const getDataListAllUser = (): Promise<any> => ApiAddress.getAllUser();
  const dataListUser = useQuery("GET_DATA_LIST_ALL_USER", getDataListAllUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState<any>(null);

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
    </div>
  );
}
