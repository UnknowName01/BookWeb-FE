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
  const [data, setData] = useState<any>([]);
  const [dataCurrent, setDataCurent] = useState<any>();
  const keyPage = "Bán";
  const user = useSelector((state: any) => state.user);

  console.log("use111r", router.query.bookId);

  const handleGetBook = (book: any) => {
    const tmp = data.find((el: any) => el.bookId === book.bookId);
    setDataCurent(tmp);
  };

  const handleListImage = () => {
    return data.map((el: any, index: number) => (
      <div className="item-book" onClick={() => handleGetBook(el)} key={index}>
        <Image
          width={50}
          height={70}
          preview={false}
          src={el.bookImages[0]?.url}
        />
      </div>
    ));
  };

  const createBookMutate = useMutation(ApiBook.interaction);

  const handleInteraction = (value: any) => {
    createBookMutate.mutate(
      {
        bookId: router.query.bookId,
        reactionId: value,
      },
      {
        onSuccess: (res) => {
          console.log("|asdasdasdasd", res);
          notification.success({
            message: "Thêm cảm xúc thành công!",
          });
        },
      }
    );
  };

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
            <div className="icon">
              <div className="group-icon">
                <LikeOutlined
                  onClick={() => handleInteraction(1)}
                  style={{fontSize: "25px", width: "35px"}}
                />
                <DislikeOutlined
                  onClick={() => handleInteraction(2)}
                  style={{fontSize: "25px", width: "45px"}}
                />
              </div>
            </div>
            <div className="image">
              <div style={{display: "flex", justifyContent: "center"}}>
                <Image
                  width={200}
                  height={260}
                  preview={false}
                  src={getDetailBook?.data?.image ?? []}
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
              {/* <div className="row-text"> */}
              {/*  <div className="title">Lượt xem</div> */}
              {/*  <div className="detail">{dataCurrent?.coverType ?? 0}</div> */}
              {/* </div> */}
              {/* <div className="row-text"> */}
              {/*  <div className="title">Yêu thích</div> */}
              {/*  <div className="detail">{dataCurrent?.statusQuo ?? 0}</div> */}
              {/* </div> */}
              {/* <div className="row-text"> */}
              {/*  <div className="title">Dislike</div> */}
              {/*  <div className="detail"> */}
              {/*    {dataCurrent?.subcategoryName ?? 0} */}
              {/*  </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
        <div className="description">
          <div className="left">
            <h3>Mô tả</h3>
            <p>{getDetailBook?.data?.content}</p>
          </div>
          <div className="right">
            <h3>Liên hệ</h3>
            <div className="row1">
              <div className="icon">
                <UserOutlined style={{fontSize: 20}} />
              </div>
              <div className="detail-icon">
                <h4>{user?.name}</h4>
                <CheckCircleFilled
                  style={{marginRight: 4, marginLeft: 4, color: "#26a541"}}
                />
                <h5>Xác thực</h5>
              </div>
            </div>
            {/* <div className="row1">
              <div className="icon">
                <GlobalOutlined style={{fontSize: 20}} />
              </div>
              <div className="detail-icon">
                <h5>North West Delhi (110009), DELHI</h5>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
