import React, {useEffect, useState} from "react";
import "./index.scss";
import {Modal, List, Form, Input, Button, notification, Table} from "antd";
import {DeleteFilled, EditFilled} from "@ant-design/icons";
import ApiAddress from "@app/api/ApiAddress";
import store from "@app/redux/store";
import {useQuery} from "react-query";

export function CategoryManager(): JSX.Element {
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [dataCurrent, setDataCurrent] = useState<any>({});
  const [openModal, setOpenModal] = useState<any>();

  const getDataListCategory = (): Promise<any> => ApiAddress.getAllCategory();
  const dataListCategory = useQuery(
    "GET_DATA_LIST_CATEGORY",
    getDataListCategory
  );
  console.log("dataListCategorysss", dataListCategory?.data);

  useEffect(() => {
    dataListCategory.refetch();
  }, []);
  const handleCancel = (): void => {
    setOpenModal("");
    setDataCurrent({});
    setIsEdit(false);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "name",
      render: (_, __, index) => <div>{index + 1}</div>,
    },
    {
      title: "Danh mục",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "bookQuantity",
      key: "bookQuantity",
    },
    {
      title: "Lượt like",
      dataIndex: "likeQuantity",
      key: "likeQuantity",
    },
    {
      title: "Lượt dislike",
      dataIndex: "dislikeQuantity",
      key: "dislikeQuantity",
    },
    {
      title: "Lượt xem",
      dataIndex: "watchQuantity",
      key: "watchQuantity",
    },
  ];
  const handleSave = (dataNew: any): void => {
    console.log("datanew", dataNew.category);
    if (openModal === "new") {
      ApiAddress.createCategory({
        name: dataNew.category,
      }).then((res) => {
        if (res) {
          dataListCategory.refetch();
          notification.success({
            message: "Tạo thể loại thành công",
          });
          ApiAddress.getAllAddress().then((res: any) => {
            setData(res);
          });
          handleCancel();
        } else {
          notification.error({
            message: "Tạo địa chỉ thất bại!",
          });
        }
      });
    } else if (openModal === "edit") {
      const putData = {
        ...dataNew,
        addressId: dataCurrent?.id,
        userId: store.getState()?.user?.id,
      };
      ApiAddress.updateAddress(putData).then((res: any) => {
        if (res) {
          handleCancel();
          ApiAddress.getAllAddress().then((res: any) => {
            setData(res);
          });
        } else {
          notification.error({
            message: "Tạo địa chỉ thất bại!",
          });
        }
      });
    }
  };

  useEffect(() => {
    ApiAddress.getAllAddress().then((res: any) => {
      setData(res);
    });
  }, []);

  return (
    <div className="address-tab-container">
      <h3>Danh sách thể loại</h3>
      <div className="" style={{textAlign: "right"}}>
        <Button type="primary" onClick={() => setOpenModal("new")}>
          Thêm thể loại
        </Button>
      </div>
      <Table dataSource={dataListCategory?.data} columns={columns} />;
      <Modal
        title="Thêm thể loại"
        open={!!openModal}
        onCancel={handleCancel}
        closeIcon
        cancelText="Hủy"
        okText="Lưu"
        width={600}
        destroyOnClose
        okButtonProps={{
          htmlType: "submit",
          form: "form-address",
          disabled: !isEdit,
        }}
      >
        <Form
          name="basic"
          labelAlign="left"
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          onFinish={(data) => {
            handleSave(data);
          }}
          onValuesChange={() => {
            setIsEdit(true);
          }}
          initialValues={dataCurrent}
          autoComplete="off"
          colon={false}
          id="form-address"
        >
          <Form.Item
            label="Thể loại"
            rules={[{required: true, message: "Vui lòng nhập trường này"}]}
            name="category"
          >
            <Input placeholder="Nhập Thể loại" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
