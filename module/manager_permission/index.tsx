import "./index.scss";
import {Button, Image, Pagination} from "antd";
import {useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {DollarCircleOutlined} from "@ant-design/icons";
import {BreakCrumGlobal} from "@app/components/BreakCrumGlobal";
import ApiBook from "@app/api/ApiBook";
import FilterGroupGlobal from "@app/components/FilterGroupGlobal";
import {LoadingGlobal} from "@app/components/Loading";
import {useMutation, useQuery} from "react-query";
import {ContextSearchHome} from "@app/components/Layout/Sidebar/ContextProvider/ContextSearchHome";

export function ManagerPermission(): JSX.Element {
  const router = useRouter();
  const [pageSize, setPageSize] = useState(20);
  const [pageCurent, setPageCurent] = useState(1);
  const [path, setPath] = useState<string[]>(["Trang chủ", "Tất cả sách"]);
  const {searchHomeListBook} = useContext(ContextSearchHome);

  const [totalItemBook, setTotalItemBook] = useState(0);
  const listDataCity = [
    {
      value: "null",
      label: "Tất cả",
    },
  ];
  // const createBookMutate = useMutation(ApiBook.interaction);

  const toDetailBook = (item: any): void => {
    console.log("item", item);
    router.push({
      pathname: "/detail_book",
      query: {bookId: item.id},
    });
    // createBookMutate.mutate(
    //   {
    //     bookId: item.id,
    //     reactionId: 3,
    //   },
    //   {
    //     onSuccess: (res) => {
    //       console.log("|asdasdasdasd", res);
    //     },
    //   }
    // );
  };

  const handleChangePage = (page: number, pageSizeNew: number) => {
    if (page !== pageCurent || pageSizeNew !== pageSize) {
      setPageSize(pageSizeNew);
      setPageCurent(page);
    }
  };

  // handle getDataListAllBook
  const getDataListAllBook = (): Promise<any> => ApiBook.getAllPost();
  const dataListBook = useQuery("GET_DATA_LIST_ALL_BOOK", getDataListAllBook);
  console.log("dataListBook", dataListBook?.data);

  const listSelectOption = [
    {
      title: "Giá",
      placeholder: "Giá",
      width: 120,
      handleChange: () => console.log("handleChange"),
      optionSelect: [
        {
          value: "Tăng dần",
          label: "Tăng dần",
        },
        {
          value: "Giảm dần",
          label: "Giảm dần",
        },
      ],
    },
    {
      title: "Thành phố",
      placeholder: "Chọn thành phố",
      width: 120,
      handleChange: console.log("handleChange"),
      optionSelect: [],
    },
  ];
  const getDataListAllCity = (): Promise<any> => ApiBook.getAllCity();
  const getDataCity = useQuery("GET_DATA_CITY", getDataListAllCity);
  if (getDataCity?.data) {
    getDataCity.data.map((item: any) =>
      listDataCity.push({
        value: item,
        label: item,
      })
    );
  }

  useEffect(() => {
    dataListBook.refetch();
  }, []);

  return (
    <div className="home-container">
      <BreakCrumGlobal listBreakcrum={path} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: "10%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <FilterGroupGlobal
            // listSearchText={listSearchText}
            listSelectOption={listSelectOption}
          />
          <Button>Đặt lại</Button>
        </div>
        <span style={{marginLeft: 5}}>Kết quả: {totalItemBook}</span>
      </div>
      <div className="home-list-book">
        {dataListBook && dataListBook?.isLoading ? (
          <LoadingGlobal />
        ) : (
          dataListBook?.data?.map((item: any, index: number) => (
            <div
              onClick={() => toDetailBook(item)}
              className="item-book"
              key={index}
            >
              <Image
                preview={false}
                width={160}
                height={160}
                src={item?.images}
              />
              <div className="text-title">{item?.name}</div>
              <div className="description">{item?.description}</div>
              <div className="category">Thể loại: {item?.category?.name}</div>
              <div className="row-end">
                <div>
                  <div style={{display: "flex", alignItems: "center"}}>
                    <DollarCircleOutlined />
                    <div className="text-align-center">
                      {/* {item.price ?? "Chưa có giá"} */}
                      20.000đ
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="pagination-home">
        <Pagination
          responsive
          current={pageCurent}
          // total={listBookInitial.length}
          pageSize={pageSize}
          onChange={(page, PageSizes) => {
            handleChangePage(page, PageSizes);
          }}
        />
      </div>
    </div>
  );
}
