import React, {useEffect, useState} from "react";
import "./index.scss";
import {Button, notification, Upload} from "antd";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import ApiUser from "@app/api/ApiUser";
import {upLoadImage} from "@app/utils/firebase/uploadImage";
import moment from "moment";
import store from "@app/redux/store";
import ApiAddress from "@app/api/ApiAddress";
import {useQuery} from "react-query";
import {Formik} from "formik";
import ErrorMessageGlobal from "@app/components/ErrorMessageGlobal";
import {InputGlobal} from "@app/components/InputGlobal";

export function UserInfor(): JSX.Element {
  const [imageUrl, setImageUrl] = useState<string>();
  const [data, setData] = useState<any>();

  // console.log("data", data);
  const handleSubmit = (dataNew: any) => {
    console.log("handle Submit", dataNew);
    const objectSubmit = {
      id: dataUser?.data?.id,
      username: dataNew.username,
      email: dataNew.email,
      fullName: dataNew.fullName,
    };
    ApiUser.updateUser(objectSubmit)
      .then((res: any) => {
        notification.success({
          message: "Sửa thông tin thành công",
        });
        setData({
          ...res,
          dob: moment(res.dob),
        });
        setImageUrl(res?.imageUrl);
      })
      .catch(() => {
        notification.error({
          message: "Sửa thông tin thất bại",
        });
      });
  };

  const getDataUser = (): Promise<any> => ApiAddress.getUser();
  const dataUser = useQuery("GET_DATA_INFO_USER", getDataUser);

  useEffect(() => {
    dataUser.refetch();
    setData(dataUser.data);
  }, []);
  return (
    <div className="user-profile-tab-container">
      <h3>THÔNG TIN TÀI KHOẢN</h3>
      <div style={{width: "60%", margin: "12px 0"}}>
        {/* {JSON.stringify(dataUser?.data)} */}
        <Formik
          initialValues={{
            username: dataUser?.data?.username,
            email: dataUser?.data?.email,
            fullName: dataUser?.data?.fullName,
          }}
          onSubmit={handleSubmit}
          validateOnChange
          validateOnBlur
          // validationSchema={LoginValidation}
        >
          {({values, handleSubmit}): JSX.Element => {
            return (
              <div>
                <div className="item-detail">
                  <span style={{width: "28%"}}>Tên đăng nhập</span>
                  <InputGlobal
                    name="username"
                    // value={values.username}
                    disabled
                    placeholder="Tên đăng nhập"
                    style={{width: "80%"}}
                  />
                  <ErrorMessageGlobal name="username" />
                </div>
                <div className="item-detail">
                  <span style={{width: "28%"}}>Họ và tên</span>
                  <InputGlobal
                    name="fullName"
                    // value={values.fullName}
                    placeholder="Nhập họ và tên"
                    style={{width: "80%"}}
                    onPressEnter={(): void => handleSubmit()}
                  />
                  <ErrorMessageGlobal name="fullName" />
                </div>
                <div className="item-detail">
                  <span style={{width: "28%"}}>Email</span>
                  <InputGlobal
                    name="email"
                    // value={values.email}
                    placeholder="Nhập Email"
                    style={{width: "80%"}}
                    onPressEnter={(): void => handleSubmit()}
                  />
                  <ErrorMessageGlobal name="email" />
                </div>
                <div className="btn" style={{textAlign: "center"}}>
                  <Button
                    type="primary"
                    onClick={handleSubmit}
                    // disabled={!isEdit}
                    style={{marginTop: "24px", textAlign: "center"}}
                    form="form-profile"
                  >
                    Sửa
                  </Button>
                </div>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
