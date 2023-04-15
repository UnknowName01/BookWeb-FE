import "./index.scss";
import {Modal} from "antd";

export function ModalConfirmCustom(
  title: string,
  content?: string,
  handleOke?: () => void,
  handleCancel?: () => void
) {
  return Modal.confirm({
    title: title,
    content: content,
    cancelText: "Hủy",
    okText: "Xác nhận",
    onOk: handleOke,
    onCancel: handleCancel,
    className: "modal-confirm-custom",
  });
}
