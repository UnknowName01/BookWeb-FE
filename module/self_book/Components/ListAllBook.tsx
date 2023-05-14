import React, {useEffect} from "react";
import {Image, notification, Table} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import "./indexPostToSelf.scss";
import ApiBook from "@app/api/ApiBook";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import {useMutation, useQuery} from "react-query";
import moment from "moment";
import {ModalConfirmCustom} from "@app/components/ModalConfirmCustom";

export default function ListAllBook(): JSX.Element {
  const router = useRouter();
  const user = useSelector((state: any) => state.user);

  // handle getDataListAllBook
  const getDataListAllBook = (): Promise<any> => ApiBook.getAllPost();
  const dataListBook = useQuery(
    "GET_DATA_LIST_ALL_BOOK_ADMIN",
    getDataListAllBook
  );
  console.log("GET_DATA_LIST_ALL_BOOK_ADMIN", dataListBook?.data);

  const editEmployee = useMutation(ApiBook.deleteBook);

  const deleteBook = (id: number) => {
    console.log("id", id);
    ModalConfirmCustom("Xác nhân xoá sách?", "", () =>
      editEmployee.mutate(
        {
          id: id,
        },
        {
          onSuccess: (res) => {
            // console.log("res", res);
            dataListBook.refetch();
            notification.success({
              message: "Xoá thành công!",
            });
          },
          onError: (res) => {
            console.log("error res", res);
          },
        }
      )
    );
  };

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
      dataIndex: "name",
      align: "center",
      key: "name",
      width: 200,
    },
    {
      title: "Thể loại",
      dataIndex: "title",
      align: "center",
      key: "title",
      render: (_: any, record: any, index: any) => (
        <div>{record?.category?.name}</div>
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
            src={record.images}
            preview={false}
          />
        </div>
      ),
      width: 200,
    },
    {
      title: "Mô tả",
      dataIndex: "introduce",
      align: "center",
      key: "description",
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
        <div> {moment(record.createdAt).format("DD-MM-YYYY")}</div>
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "categoryData",
      align: "center",
      fixed: "right",
      key: "categoryData",
      render: (_: any, record: any, index: any) => (
        <div onClick={() => deleteBook(record.id)}>
          <DeleteOutlined style={{fontSize: 25, color: "red"}} />
        </div>
      ),
      width: 120,
    },
  ];

  useEffect(() => {
    dataListBook.refetch();
  }, []);

  return (
    <Table
      dataSource={dataListBook?.data ?? []}
      columns={columns}
      scroll={{x: 1200, y: 450}}
      // scroll={{x: 1200}}
    />
  );
}
