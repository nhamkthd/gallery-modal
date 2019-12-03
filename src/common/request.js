import axios from "axios";
import store from "../redux/store";
import { get } from "lodash";
import { actionLogout } from "../redux/user/action";

export default function request(options) {
  axios.interceptors.request.use(function(config) {
    const userLogin = store.getState().userLogin;
    const token = get(userLogin, "token", "");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["X-Requested-With"] = "XMLHttpRequest";

    return config;
  });

  return axios(options).catch(error => {
    if (error.response && error.response.status === 401) {
      store.dispatch(actionLogout());
    }
    return Promise.reject(error);
  });
}
