import React, {useEffect, useLayoutEffect, useState} from "react";
import "./index.scss";
import {Menu} from "antd";
import ApiBook from "@app/api/ApiBook";
import {categorys} from "@app/redux/slices/categorySlice";
// eslint-disable-next-line no-duplicate-imports
import type {MenuProps} from "antd";
import {BlockOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import ApiAddress from "@app/api/ApiAddress";
import {useQuery} from "react-query";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export default function Sidebar(): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();
  const [category, setCategory] = useState<any>([]);
  let key;
  let sub;
  if (router.query.kind) {
    key = router.query.type as string;
    sub = router.query.kind as string;
  } else {
    const searchParams = new URLSearchParams(window.location.search);
    sub = Object.fromEntries(searchParams)?.kind;
    key = Object.fromEntries(searchParams)?.type;
  }
  const convertItemSidebar = (): MenuProps["items"] => {
    const itemsTmp: MenuProps["items"] = [];
    category.forEach((item: any) => {
      itemsTmp.push(getItem(item.label, item.value));
      // if (item) {
      //   item.forEach((item: any) => {
      //     itemsTmp.push(getItem(item.name, item.id));
      //   });
      // } else {
      //   itemsTmp.push(getItem(item.name, item.id));
      // }
      // console.log("itemsTmp", itemsTmp);
    });
    const itemsTmpNew = itemsTmp.map((it: any) => {
      return {
        ...it,
        key: it.key + 0.1,
      };
    });
    return itemsTmpNew;
  };
  const onClick: MenuProps["onClick"] = (e) => {
    // console.log(e);
    router.push(
      `/?kind=${Math.round(e?.keyPath[1] as any)}&type=${e.keyPath[0]}`
    );
    // console.log("click ", e);
  };
  const getDataListCategory = (): Promise<any> => ApiAddress.getAllCategory();
  const dataListCategory = useQuery(
    "GET_DATA_LIST_CATEGORY_HOME",
    getDataListCategory,
    {
      onSuccess: (res) => {
        // console.log("Res", res);
        const objectSubmit = [];
        res.map((item, index) => {
          const newObject = {
            value: item.id,
            label: item.name,
          };
          objectSubmit.push(newObject);
        });
        console.log("newObject", objectSubmit);
        setCategory(objectSubmit);
        dispatch(categorys(res as any));
      },
    }
  );

  useEffect(() => {
    dataListCategory.refetch();
  }, []);

  return (
    <div className="sidebar-container">
      <div style={{width: "270px"}} />
      <div className="menu">
        <div style={{display: "flex"}}>
          <BlockOutlined style={{fontSize: 22, color: "red", marginRight: 5}} />
          <h3>Danh mục sản phẩm</h3>
        </div>
        <div
          className="post-all"
          onClick={() => {
            router.push("/");
          }}
        >
          Tất cả thể loại
        </div>
        <div className="list-menu">
          <Menu
            onClick={onClick}
            style={{width: 256, overflow: "scroll"}}
            mode="inline"
            defaultSelectedKeys={[key as any]}
            defaultOpenKeys={[((sub as any) * 1 + 0.1).toString() as any]}
            items={convertItemSidebar()}
          />
        </div>
      </div>
    </div>
  );
}
