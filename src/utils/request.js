import axios from "axios";
import qs from "qs"; //这个是axios里面的模块，用于序列化参数的。 看情况使用哦
import { getToken, removeToken } from "@/utils/auth"; //获取到token

//创建一个axios实例
const service = axios.create({
  timeout: 5000,
  headers: { "Content-Type": "application/json;charset=utf-8" }
});

// axios.defaults.withCredentials = true;

// 请求拦截器
service.interceptors.request.use(
  config => {
    // config.baseURL = store.getters.baseUrl;

    config.headers["Authorization"] = getToken();
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code != 200) {
      //这里主要是判断code值 等于什么，代表着token值失效 例如：50008
      if (res.code == 50008) {
        MessageBox.confirm("token值失效，请重新登录", {
          confirmButtonText: "返回登录页",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          removeToken();
        });
      }
      return res;
    } else {
      return res;
    }
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
