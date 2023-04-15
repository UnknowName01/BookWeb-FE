import React, {useEffect} from "react";
import {Table} from "antd";
import ApiBook from "@app/api/ApiBook";
import {useQuery} from "react-query";

interface IListCategoryCare {
  userId?: number;
}
export function ListCategoryCare(props: IListCategoryCare): JSX.Element {
  const {userId} = props;
  console.log("userId", userId);

  const getDataListCategoryCare = (): Promise<any> =>
    ApiBook.getCategoryCare(userId);
  const dataListCategory = useQuery(
    "GET_DATA_LIST_CATEGORY_CARE",
    getDataListCategoryCare
  );
  // console.log("dataListCategory", dataListCategory);

  useEffect(() => {
    dataListCategory.refetch();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "name",
      key: "name",
      render: (_, __, index) => <div>{index + 1}</div>,
    },
    {
      title: "Danh mục",
      dataIndex: "name",
      key: "name",
    },
  ];

  return <Table dataSource={dataListCategory?.data ?? []} columns={columns} />;
}
