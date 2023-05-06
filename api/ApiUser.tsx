import {fetcher} from "./Fetcher";
import store from "../redux/store";

export interface ILoginBody {
  username: string;
  password: string;
}
export interface ILoginResponse {
  success?: boolean;
  message?: string;
  data: {
    id: number;
    username: string;
    // email: string;
    // phoneNumber: string;
    // gender: string;
    // imageUrl: string;
    // dob: string;
    // password: string;
    //Testparam: string;
    accessToken?: string;
  };
}

export interface IParamsGetUser {
  sort?: string[];
  searchFields?: string[];
  pageSize?: number;
  pageNumber?: number;
  disablePagination?: boolean;
  search?: string;
  searchType?: string;
}

export interface IRegisterBody {
  name?: string;
  userName?: string;
  password?: string;
}

const path = {
  login: "/auth/login",
  register: "/auth/register",
  updateUser: "/auth/update-user-infor",
  changePass: "/auth/change_password",
};

function register(body: IRegisterBody): Promise<never> {
  return fetcher({url: path.register, method: "post", data: body});
}

function login(body: ILoginBody): Promise<ILoginResponse> {
  return fetcher(
    {url: path.login, method: "post", data: body},
    {displayError: true}
  );
}

function updateUser(data: any) {
  return fetcher({url: path.updateUser, method: "put", data: data});
}

function changePass(data: any) {
  return fetcher({url: path.changePass, method: "put", data: data});
}

function isLogin(): boolean {
  const {user} = store.getState();
  return !!user?.accessToken;
}

export default {
  login,
  isLogin,
  register,
  updateUser,
  changePass,
};
