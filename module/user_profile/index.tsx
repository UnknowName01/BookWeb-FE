import React, {ReactElement, useState} from "react";
import "./index.scss";
import Navbar from "@app/components/Layout/Navbar/Navbar";
import {SideBarUserProfile} from "@app/module/user_profile/Components/SideBarUserProfile";
import Config from "@app/config";
import {
  CloudUploadOutlined,
  DollarCircleOutlined,
  GlobalOutlined,
  SelectOutlined,
  SlidersOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {UserInfor} from "@app/module/user_profile/Components/ListTab/UserInfor";
import {CategoryManager} from "@app/module/user_profile/Components/ListTab/CategoryManager";
import {
  ManagerSaleOrder,
  ManagerUserAdmin,
} from "@app/module/user_profile/Components/ListTab/ManagerUserAdmin";
import {PurchaseOrderManagerment} from "@app/module/user_profile/Components/ListTab/PurchaseOrderManagerment";
import {HistoryPost} from "@app/module/user_profile/Components/ListTab/HistoryPost";
import {Complaint} from "@app/module/user_profile/Components/ListTab/Complaint";

export function UserProfile(): JSX.Element {
  const [keyTab, setKeyTab] = useState<string>("UserInfor");
  const clickTab = () => {
    let element: ReactElement = <UserInfor />;
    switch (keyTab) {
      case "UserInfor":
        element = <UserInfor />;
        break;
      case "CategoryManager":
        element = <CategoryManager />;
        break;
      case "ManagerUserAdmin":
        element = <ManagerUserAdmin />;
        break;
      case "HistoryPost":
        element = <HistoryPost />;
        break;
      case "PurchaseOrderManagerment":
        element = <PurchaseOrderManagerment />;
        break;
      case "Complaint":
        element = <Complaint />;
        break;
      default:
        element = <UserInfor />;
    }
    return element;
  };
  const TabListUserProfile = [
    {
      tabName: "Thông tin tài khoản",
      key: "UserInfor",
      icon: <UserOutlined />,
    },
    {
      tabName: "Quản lí người dùng(Admin)",
      key: "ManagerUserAdmin",
      icon: <UserOutlined />,
    },
    {
      tabName: "Quản lí danh mục sách(Admin)",
      key: "CategoryManager",
      icon: <GlobalOutlined />,
    },
  ];

  return (
    <div className="user_profile_container">
      <Navbar />
      <div
        className="user_profile_main"
        style={{marginTop: Config.HEIGHT_NAVBAR}}
      >
        <div className="side-bar-profile">
          <SideBarUserProfile
            setKeyTab={setKeyTab}
            TabListUserProfile={TabListUserProfile}
          />
        </div>
        <div className="main_content">
          <div className="tab">{clickTab()}</div>
        </div>
      </div>
    </div>
  );
}
