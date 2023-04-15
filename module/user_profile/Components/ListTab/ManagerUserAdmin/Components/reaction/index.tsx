import React, {useEffect} from "react";
import {Tabs, TabsProps} from "antd";
import {TableGeneral} from "@app/module/user_profile/Components/ListTab/ManagerUserAdmin/Components/reaction/Table";
import ApiBook from "@app/api/ApiBook";
import {useQuery} from "react-query";

interface IReaction {
  userId?: number;
}

export function Reaction(props: IReaction): JSX.Element {
  const {userId} = props;
  const onChange = (key: string) => {
    console.log(key);
  };

  const getDataReaction = (): Promise<any> => ApiBook.getReaction(userId);
  const dataListBook = useQuery("GET_DATA_LIST_REACTION", getDataReaction);
  console.log("dataListBook", dataListBook);
  useEffect(() => {
    dataListBook.refetch();
  }, []);
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Like`,
      children: <TableGeneral data={dataListBook?.data?.like} />,
    },
    {
      key: "2",
      label: `Dislike`,
      children: <TableGeneral data={dataListBook?.data?.dislike} />,
    },
    {
      key: "3",
      label: `Watch`,
      children: <TableGeneral data={dataListBook?.data?.arrWatch} />,
    },
  ];
  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
}
