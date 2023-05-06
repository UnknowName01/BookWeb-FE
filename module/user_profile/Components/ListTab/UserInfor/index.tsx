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
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState<any>();

  console.log("data", data);
  const handleSubmit = (dataNew: any) => {
    const putData = {
      ...dataNew,
      id: store.getState()?.user?.id,
      dob: moment(dataNew.dob).format("YYYY-MM-DD"),
      imageUrl: imageUrl,
      email: undefined,
    };
    ApiUser.updateUser(putData)
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

  const handleChangeUploadImage = async (file: any) => {
    const link = await upLoadImage(file.file);
    setImageUrl(link);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{marginTop: 8}}>Tải ảnh lên</div>
    </div>
  );


  const getDataUser = (): Promise<any> => ApiAddress.getUser();
  const dataUser = useQuery("GET_DATA_INFO_USER", getDataUser);
  useEffect(() => {
    dataUser.refetch();
    setData(dataUser.data);
  }, []);
  console.log("dataUser", dataUser.data);
  return (
    <div className="user-profile-tab-container">
      <h3>THÔNG TIN TÀI KHOẢN</h3>
      <div style={{width: "60%", margin: "12px 0"}}>
        {JSON.stringify(dataUser?.data)}
        <Formik
          initialValues={{
            name: dataUser?.data?.name ?? "",
            role: dataUser?.data?.role ?? "",
            email: dataUser?.data?.email ?? "",
            MoF: dataUser?.data?.MoF ?? "",
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
                  <span style={{width: "23%"}}>Họ và tên</span>
                  <InputGlobal
                    name="name"
                    value={values.name}
                    placeholder="Nhập họ và tên"
                    style={{width: "80%"}}
                    onPressEnter={(): void => handleSubmit()}
                  />
                  <ErrorMessageGlobal name="username" />
                </div>
                <div className="item-detail">
                  <span style={{width: "28%"}}>Ảnh đại diện</span>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={() => false}
                    onChange={(file) => handleChangeUploadImage(file)}
                  >
                    {true ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{width: "100%"}}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                  <ErrorMessageGlobal name="username" />
                </div>
                <div className="item-detail">
                  <span style={{width: "23%"}}>Quyền</span>
                  <InputGlobal
                    name="role"
                    value={values.role}
                    placeholder="Nhập quyền"
                    style={{width: "80%"}}
                    onPressEnter={(): void => handleSubmit()}
                  />
                  <ErrorMessageGlobal name="role" />
                </div>
                <div className="item-detail">
                  <span style={{width: "23%"}}>Email</span>
                  <InputGlobal
                    name="email"
                    value={values.email}
                    placeholder="Nhập Email"
                    style={{width: "80%"}}
                    onPressEnter={(): void => handleSubmit()}
                  />
                  <ErrorMessageGlobal name="email" />
                </div>
                <div className="item-detail">
                  <span style={{width: "23%"}}>Giới tính</span>
                  <InputGlobal
                    name="MoF"
                    value={values.MoF}
                    placeholder="Nhập giới tính"
                    style={{width: "80%"}}
                    onPressEnter={(): void => handleSubmit()}
                  />
                  <ErrorMessageGlobal name="MoF" />
                </div>
              </div>
            );
          }}
        </Formik>

        <div className="btn" style={{textAlign: "center"}}>
          <Button
            type="primary"
            htmlType="submit"
            // disabled={!isEdit}
            style={{marginTop: "24px", textAlign: "center"}}
            form="form-profile"
          >
            Sửa
          </Button>
        </div>
      </div>
    </div>
  );
}
