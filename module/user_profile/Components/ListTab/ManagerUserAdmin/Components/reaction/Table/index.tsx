import React from "react";
import moment from "moment";
import {Image, Table} from "antd";
import "./index.scss";

interface ITableGeneral {
  data: any;
}
export function TableGeneral(props: ITableGeneral): JSX.Element {
  const {data} = props;

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (_: any, record: any, index: any) => <div>{index + 1}</div>,
      width: 80,
    },
    {
      title: "Tên sách",
      dataIndex: "title",
      align: "center",
      key: "title",
      width: 200,
    },
    {
      title: "Thể loại",
      dataIndex: "title",
      align: "center",
      key: "title",
      render: (_: any, record: any, index: any) => (
        <div>{record?.categoryData?.name}</div>
      ),
      width: 200,
    },
    {
      title: "Ảnh",
      dataIndex: "age",
      align: "center",
      key: "age",
      render: (_: any, record: any, index: any) => (
        <div>
          <Image
            width={100}
            height={140}
            style={{objectFit: "cover"}}
            src={record?.image}
            preview={false}
          />
        </div>
      ),
      width: 200,
    },
    {
      title: "Giới thiệu",
      dataIndex: "introduce",
      align: "center",
      key: "introduce",
      width: 200,
    },
    {
      title: "Ngày tạo",
      dataIndex: "categoryData",
      align: "center",
      key: "categoryData",
      render: (_: any, record: any, index: any) => (
        <div> {moment(record?.createdAt).format("DD-MM-YYYY")}</div>
      ),
    },
  ];

  return (
    <div className="table-userInfor">
      <Table dataSource={data} columns={columns} scroll={{x: 500}} />
    </div>
  );
}
