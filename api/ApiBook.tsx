import {fetcher} from "./Fetcher";

const path = {
  category: "/category/get",
  get_all_post: "/book",
  createBookPath: "/book/create",
  deletePath: "/book/delete",
  interactionPath: "/interaction/create",
  getAllRecommentPath: "/recomment",
  getReactionPath: "/recomment/top_interaction_user",
  getListCategoryCarePath: "/recomment/recomment_category_user",
};

function getAllPost() {
  return fetcher({
    url: path.get_all_post,
    method: "get",
  });
}

function getReaction(userId: number) {
  return fetcher({
    url: `${path.getReactionPath}/${userId}`,
    method: "get",
  });
}
function getCategoryCare(userId: number) {
  return fetcher({
    url: `${path.getListCategoryCarePath}/${userId}`,
    method: "get",
  });
}

function getAllRecomment() {
  return fetcher({
    url: path.getAllRecommentPath,
    method: "get",
  });
}

function getKindBook(params: {
  subcategoryId?: number | string;
  sortBy?: string;
  filter?: string;
}) {
  return fetcher({
    url: `/post/get_all_post_by_subcategoryId`,
    method: "get",
    params: params,
  });
}

function getCategory() {
  return fetcher({url: path.category, method: "get"});
}
function getBookDetail(id: number) {
  return fetcher({url: `/book/${id}`, method: "get"});
}

function searchPost(search: string) {
  return fetcher({
    url: `/post/search-post-by-Keyword/${search}`,
    method: "get",
  });
}

function createBook(params): Promise<any> {
  return fetcher({url: path.createBookPath, method: "post", params: params});
}

function deleteBook(params: {id: number}): Promise<any> {
  return fetcher({url: `${path.deletePath}/${params.id}`, method: "delete"});
}

function interaction(params: {
  bookId?: any;
  reactionId?: number;
}): Promise<any> {
  return fetcher({url: path.interactionPath, method: "post", data: params});
}

function getCategoryDetail() {
  return fetcher({url: `/category/get-all-category`, method: "get"});
}

function getAllCity(): Promise<any> {
  return fetcher({url: `/address/get_all_city_in_list_post`, method: "get"});
}

function getSubcategoryDeatail(id: number | string) {
  return fetcher({
    url: `/subcategory/get-all-subcategory/${id}`,
    method: "get",
  });
}

export default {
  getAllPost,
  getCategory,
  getKindBook,
  getBookDetail,
  searchPost,
  getCategoryDetail,
  getSubcategoryDeatail,
  getAllCity,
  createBook,
  deleteBook,
  interaction,
  getAllRecomment,
  getReaction,
  getCategoryCare,
};
