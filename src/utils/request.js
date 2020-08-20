import axios from "axios";
import qs from "qs"; //这个是axios里面的模块，用于序列化参数的。 看情况使用哦
import { getToken } from "@/utils/auth"; //获取到token
import store from "@/store";

console.log(getToken());

//创建一个axios实例
axios.create({
  timeout: 5000,
  baseURL: store.getters.baseUrl,
  //transformRequest 这里主要是 post请求时 请求成功了，但是后台并没
  //有获取到前端的请求参数。如果后台是直接从请求体里取的话，请忽略
  transformRequest: [
    data => {
      let params = qs.stringify(data, { indices: false });
      return params;
    }
  ]
});

// 请求拦截器
axios.interceptors.request.use(
  config => {
    config.headers["Authorization"] = getToken();
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//响应拦截器
axios.interceptors.response.use(
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
          //退回到登录页 需要将sessionStorage里面的值给清空掉
          sessionStorage.clear();
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

export default axios;
