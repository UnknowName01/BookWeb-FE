import React from "react";
import "./index.scss";
import {Tabs, TabsProps} from "antd";
import {ListCategoryCare} from "@app/module/user_profile/Components/ListTab/ManagerUserAdmin/Components/listCategoryCare";
import {Reaction} from "@app/module/user_profile/Components/ListTab/ManagerUserAdmin/Components/reaction";

interface IListTab {
  userId?: number;
}
export function ListTab(props: IListTab): JSX.Element {
  const {userId} = props;
  const onChange = (key: string) => {
    // console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Danh sách reaction`,
      children: <Reaction userId={userId} />,
    },
    {
      key: "2",
      label: `Danh mục quan tâm`,
      children: <ListCategoryCare userId={userId} />,
    },
  ];
  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
}
