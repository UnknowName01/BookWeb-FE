import React, {useEffect, useState} from "react";
import "./index.scss";
import Navbar from "@app/components/Layout/Navbar/Navbar";
import {Button, Image, notification} from "antd";
import {
  CheckCircleFilled,
  DislikeOutlined,
  HeartOutlined,
  LikeOutlined,
  MoneyCollectOutlined,
  ShareAltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {useRouter} from "next/router";
import {BreakCrumGlobal} from "@app/components/BreakCrumGlobal";
import ApiBook from "@app/api/ApiBook";
import moment from "moment";
import {useMutation, useQuery} from "react-query";
import {useSelector} from "react-redux";

export function DetailBook(): JSX.Element {
  const router = useRouter();
  const [dataCurrent, setDataCurent] = useState<any>();
  const user = useSelector((state: any) => state.user);

  console.log("use111r", user);

  const getDataDetailBook = (): Promise<any> =>
    ApiBook.getBookDetail(Number(router.query.bookId));
  const getDetailBook = useQuery("GET_DATA_DETAIL_BOOK", getDataDetailBook);

  console.log("getDetailBook", getDetailBook?.data);
  useEffect(() => {
    getDetailBook.refetch();
  }, []);

  return (
    <div className="detail-book-container-new">
      <Navbar />
      <div className="self-book">
        <div className="main">
          <div className="image-book">
            <div className="image">
              <div style={{display: "flex", justifyContent: "center"}}>
                <Image
                  width={200}
                  height={260}
                  preview={false}
                  src={getDetailBook?.data?.images ?? []}
                />
              </div>
              {/* <div className="horizontalLine" /> */}
              {/* <div className="group-image-preview">{handleListImage()}</div> */}
            </div>
          </div>
          <div className="detail-book">
            <h2 style={{color: "#333"}}>{getDetailBook?.data?.name}</h2>

            <div className="group-text">
              <div className="row-text">
                <div className="title">Ngày xuất bản</div>
                <div className="detail">
                  {moment(dataCurrent?.publicationDate).format("DD/MM/YYYY")}
                </div>
              </div>
              <div className="row-text">
                <div className="title">Mô tả</div>
                <div className="detail">{getDetailBook?.data?.description}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="description">
          <div className="left">
            <h3>Đăng kí lấy sách</h3>
            <Button
              onClick={() => {
                notification.success({
                  message: "Lấy sách thành công, vui lòng liên hệ chủ sở hữu!",
                  duration: 3,
                });
              }}
              type="primary"
            >
              Lấy sách
            </Button>
          </div>
          <div className="right">
            <h3>Liên hệ</h3>
            <div className="row1">
              <div className="icon">
                <UserOutlined style={{fontSize: 20}} />
              </div>
              <div className="detail-icon">
                <h4>0379864575</h4>
                <CheckCircleFilled
                  style={{marginRight: 4, marginLeft: 4, color: "#26a541"}}
                />
                <h5>Xác thực</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
