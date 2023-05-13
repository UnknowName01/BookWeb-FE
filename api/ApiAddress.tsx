import {fetcher} from "./Fetcher";
import store from "@app/redux/store";

const path = {
  update: "/address/update-address",
  create: "/category/staff/create-category",
  delete: "/address/update-address-status",
  getAllUserPath: "/user/get_all_users",
  getUserPath: "/user/get_info",
  categoryPath: "category/information",
  getAllCategory: "/category/get-all-category",
};

function createCategory(data: {cateName: string}) {
  return fetcher({url: `${path.create}/${data.cateName}`, method: "post"});
}

function updateAddress(data: any) {
  return fetcher({url: path.update, method: "put", data: data});
}

function deleteAddress(id: number | string) {
  return fetcher({url: path.delete + "/" + id, method: "put"});
}

function getAllAddress() {
  return fetcher({
    url: path.getAll + "/" + store.getState()?.user?.id,
    method: "get",
  });
}

function getAllUser() {
  return fetcher({
    url: path.getAllUserPath,
    method: "get",
  });
}

function getAllCategory() {
  return fetcher({
    url: path.getAllCategory,
    method: "get",
  });
}
function getUser() {
  return fetcher({
    url: path.getUserPath,
    method: "get",
  });
}
export default {
  createCategory,
  updateAddress,
  getAllAddress,
  deleteAddress,
  getAllUser,
  getUser,
  getAllCategory,
};
