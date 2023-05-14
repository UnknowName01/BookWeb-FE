import React, {useEffect, useState} from "react";
import "./indexPostToSelf.scss";
import ApiBook from "@app/api/ApiBook";
import {InputGlobal} from "@app/components/InputGlobal";
import ErrorMessageGlobal from "@app/components/ErrorMessageGlobal";
import {ButtonGlobal} from "@app/components/ButtonGlobal";
import {Formik} from "formik";
import {SelectGlobal} from "@app/components/FormGlobal";
import {useMutation} from "react-query";
import {notification, Select} from "antd";

export default function PostToSelf(): JSX.Element {
  const [category, setCategory] = useState<any>();
  const createBookMutate = useMutation(ApiBook.createBook);

  console.log("category", category);
  const handleSubmitBook = (value: any) => {
    console.log("valuess", value);

    createBookMutate.mutate(value, {
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
      const objectSubmit = [];
      res.map((item, index) => {
        const newObject = {
          value: item.id,
          label: item.name,
        };
        objectSubmit.push(newObject);
      });
      console.log("newObject", objectSubmit);
      setCategory(objectSubmit);
    });
  }, []);

  return (
    <div className="post-to-self-container">
      <div>
        <Formik
          initialValues={{
            name: "",
            images: "",
            description: "",
            introduce: "",
            categoryId: "",
          }}
          onSubmit={handleSubmitBook}
          validateOnChange
          validateOnBlur
          // validationSchema={LoginValidation}
        >
          {({handleSubmit, handleChange}): JSX.Element => {
            return (
              <div className="post-to-self-form">
                <div className="post-to-self-main">
                  <div className="item">
                    <span className="title">Tên sách</span>
                    <InputGlobal
                      name="name"
                      placeholder="Name"
                      className="detail-input"
                      onPressEnter={(): void => handleSubmit()}
                    />
                    <ErrorMessageGlobal name="title" />
                  </div>

                  <div className="item">
                    <span className="title">Image</span>
                    <InputGlobal
                      name="images"
                      placeholder="Image"
                      className="detail-input"
                      onPressEnter={(): void => handleSubmit()}
                    />
                    <ErrorMessageGlobal name="image" />
                  </div>
                  <div className="item">
                    <span className="title">Description</span>
                    <InputGlobal
                      name="description"
                      placeholder="Description"
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
