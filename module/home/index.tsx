import React from "react";
import "./index.scss";
import {Button, Card, Image} from "antd";
// Import Swiper styles
import "swiper/scss";
import "swiper/scss/pagination";

import {Pagination} from "swiper";
import Navbar from "@app/components/Layout/Navbar/Navbar";
import {useRouter} from "next/router";
import {DollarCircleOutlined, StarFilled} from "@ant-design/icons";
import {CaroselComponents} from "@app/module/home/Components/CarouselComponent";
import ApiBook from "@app/api/ApiBook";
import {useQuery} from "react-query";

const {Meta} = Card;

export function Home(): JSX.Element {
  const router = useRouter();

  const getDataListAllBook = (): Promise<any> => ApiBook.getAllRecomment();
  const dataListBook = useQuery("GET_RECOMMENT", getDataListAllBook);

  console.log("recomment", dataListBook?.data);

  const listPosting = [
    {
      image:
        "https://salt.tikicdn.com/cache/750x750/ts/product/4f/87/d7/75d5f3884d462d1b23b7376c5300896f.png.webp",
      category: "Ăn Sạch Sống Xanh, Tâm Lành Trí Khoẻ",
      buy: "TPHCM",
    },
    {
      image:
        "https://salt.tikicdn.com/cache/750x750/media/catalog/producttmp/25/4d/52/6e5a9b48c1316dc3ccc55df2c955ec24.jpg.webp",
      category: "Sách Thay Đổi Cuộc Sống Với Nhân Số Học - Lê Đỗ Quỳnh Hương",
      buy: "TPHCM",
    },
    {
      image:
        "https://salt.tikicdn.com/cache/750x750/ts/product/07/3e/ae/26cc99e58483d0030de5e8dc777e3d81.jpg.webp",
      category: "Sách Người trong muôn nghề",
      buy: "TPHCM",
    },
    {
      image:
        "https://salt.tikicdn.com/cache/750x750/ts/product/78/97/9e/09dc123679ecd939271fe9a4ee4cb841.jpg.webp",
      category: "Làm sạch tâm hồn - Các bài tập thiền",
      buy: "TPHCM",
    },
    {
      image:
        "https://salt.tikicdn.com/cache/750x750/ts/product/c9/ae/56/39270337e02960aa4f4938e113e4c5c2.jpg.webp",
      category: "Sách Chữa Lành Nỗi Đau",
      buy: "TPHCM",
    },
    {
      image:
        "https://salt.tikicdn.com/cache/750x750/ts/product/63/8f/cf/555ac6f80db52502513ae753c7d33722.jpg.webp",
      category: "Những đòn tâm lý trong thuyết phục",
      buy: "TPHCM",
    },
    {
      image:
        "https://vtv1.mediacdn.vn/thumb_w/650/2020/8/29/chadwick-boseman-elle-man-feature-1598674387430539628601.jpg",
      category: "Cho Đi Và Nhận Lại",
      buy: "TPHCM",
    },
    {
      image:
        "https://cms.dmpcdn.com/cdn-cgi/image/fit=cover,quality=85,f=auto/https://cms.dmpcdn.com/article/2021/05/30/cc7430c0-c160-11eb-8020-bb86c50a8d49_original.jpg",
      category: "Cho Đi Và Nhận Lại",
      buy: "TPHCM",
    },
    {
      image:
        "https://kenh14cdn.com/thumb_w/660/2018/5/16/photo-4-15264888122402032180945.jpg",
      category: "Cho Đi Và Nhận Lại",
      buy: "TPHCM",
    },
    {
      image: "https://mcdn.coolmate.me/image/July2022/image1_91.png",
      category: "Cho Đi Và Nhận Lại",
      buy: "TPHCM",
    },
  ];

  const handleViewAll = (): void => {
    console.log("handleViewAll");
    router.push("/");
  };

  return (
    <div className="home-page-container">
      <Navbar />
      <div className="introduce">
        <div className="background-image-home" />
        <div className="text-introduce-detail">
          <div>
            <h2 className="text-introduce">
              {" "}
              "Một cuốn sách hay thực sự hay dạy tôi nhiều điều hơn là đọc nó,
              Tôi phải nhanh chóng đặt nó xuống, bắt đầu sống theo những điều nó
              chỉ dẫn. Điều tôi bắt đầu bằng cách đọc, tôi phải kết thúc bằng
              hành động"
            </h2>
            <div
              style={{
                color: "white",
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <em>-- Henry David Thoreau --</em>
            </div>
          </div>
        </div>
      </div>
      <CaroselComponents
        title="Top Like"
        keyRender="like"
        listItemData={listPosting}
      />
      <CaroselComponents
        title="Top Dislike"
        keyRender="dislike"
        listItemData={listPosting}
      />
      <CaroselComponents
        title="Lượt xem nhiều nhất"
        keyRender="watch"
        listItemData={listPosting}
      />
      {/* <CaroselComponents title="Top người dùng" listItem={listUser} /> */}
      <CaroselComponents
        isViewAll
        handleViewAll={handleViewAll}
        title="Top bài đăng"
        listItem={listPosting}
      />

      <div className="row3">
        <div className="title">
          <h2>CHỢ SÁCH CŨ</h2>
        </div>
        <div className="desciption">
          <p>
            “Đằng sau sự thành công công của một người đàn ông, là hình dáng của
            một người phụ nữ. Còn đằng sau sự thành công của bất kì ai là ít
            nhất một cuốn sách, hay cả một giá sách..”
          </p>
          <p>
            “Vào khoảnh khắc mà chúng ta quyết thuyết phục đứa trẻ, bất cứ đứa
            trẻ nào, bước qua bậc thềm ấy, bậc thềm màu nhiệm dẫn vào thư viện,
            ta thay đổi cuộc sống của nó mãi mãi, theo cách tốt đẹp hơn.” -
            Barack Obama
          </p>
          <p>
            “Vào khoảnh khắc mà chúng ta quyết thuyết phục đứa trẻ, bất cứ đứa
            trẻ nào, bước qua bậc thềm ấy, bậc thềm màu nhiệm dẫn vào thư viện,
            ta thay đổi cuộc sống của nó mãi mãi, theo cách tốt đẹp hơn.” -
            Barack Obama
          </p>
          <p>
            "Cuốn sách tốt nhất cho bạn là cuốn sách nói nhiều nhất với bạn vào
            lúc bạn đọc nó. Tôi không nói tới cuốn sách cho bạn nhiều bài học
            nhất mà là cuốn sách nuôi dưỡng tâm hồn bạn. Và điều đó phụ thuộc
            vào tuổi tác, trải nghiệm, nhu cầu về tâm lý và tinh thần.” -
            Robertson Davies
          </p>
        </div>
      </div>
    </div>
  );
}
