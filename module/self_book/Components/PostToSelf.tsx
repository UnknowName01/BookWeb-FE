import React, {useEffect, useState} from "react";
import "./indexPostToSelf.scss";
import ApiBook from "@app/api/ApiBook";
import {InputGlobal} from "@app/components/InputGlobal";
import ErrorMessageGlobal from "@app/components/ErrorMessageGlobal";
import {ButtonGlobal} from "@app/components/ButtonGlobal";
import {Formik} from "formik";
import {SelectGlobal} from "@app/components/FormGlobal";
import {useMutation} from "react-query";
import {notification} from "antd";

export default function PostToSelf(): JSX.Element {
  const [category, setCategory] = useState<any>([]);
  const createBookMutate = useMutation(ApiBook.createBook);

  const handleSubmitBook = (value: any) => {
    console.log("valuess", value);

    createBookMutate.mutate(category, {
      onSuccess: (res) => {
        console.log("|asdasdasdasd", res);
        notification.success({
          message: "Thêm sách thành công!",
        });
      },
    });
  };

  useEffect(() => {
    ApiBook.getCategory().then((res) => {
      console.log("getCategory", res);
      setCategory(res);
    });
  }, []);

  return (
    <div className="post-to-self-container">
      <div>
        <Formik
          initialValues={{
            title: "",
            image: "",
            content: "",
            introduce: "",
            categoryId: "",
          }}
          onSubmit={handleSubmitBook}
          validateOnChange
          validateOnBlur
          // validationSchema={LoginValidation}
        >
          {({handleSubmit}): JSX.Element => {
            return (
              <div className="post-to-self-form">
                <div className="post-to-self-main">
                  <div className="item">
                    <span className="title">Tên sách</span>
                    <InputGlobal
                      name="title"
                      placeholder="Password"
                      className="detail-input"
                      onPressEnter={(): void => handleSubmit()}
                    />
                    <ErrorMessageGlobal name="title" />
                  </div>

                  <div className="item">
                    <span className="title">Image</span>
                    <InputGlobal
                      name="image"
                      placeholder="Image"
                      className="detail-input"
                      onPressEnter={(): void => handleSubmit()}
                    />
                    <ErrorMessageGlobal name="image" />
                  </div>
                  <div className="item">
                    <span className="title">Content</span>
                    <InputGlobal
                      name="content"
                      placeholder="Content"
                      className="detail-input"
                      onPressEnter={(): void => handleSubmit()}
                    />
                    <ErrorMessageGlobal name="content" />
                  </div>
                  <div className="item">
                    <span className="title">Introduce</span>
                    <InputGlobal
                      name="introduce"
                      placeholder="Introduce"
                      className="detail-input"
                      onPressEnter={(): void => handleSubmit()}
                    />
                    <ErrorMessageGlobal name="introduce" />
                  </div>
                  <div className="item">
                    <span className="title">Category</span>
                    <SelectGlobal
                      name="categoryId"
                      placeholder="Category"
                      style={{width: "100%"}}
                      options={category}
                    />
                    <ErrorMessageGlobal name="categoryId" />
                  </div>

                  <div className="btn-login">
                    <ButtonGlobal
                      onClick={handleSubmit}
                      title="OK"
                      type="primary-filled"
                    />
                  </div>
                </div>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
