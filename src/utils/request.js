import axios from "axios";
import qs from "qs"; //这个是axios里面的模块，用于序列化参数的。 看情况使用哦
import { getToken } from "@/utils/auth"; //获取到token
import store from "@/store";

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
    config.headers["Authorization"] =
      "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlFVZ1Y0MEkxRDRoTXVMMXZ0N0drRWciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE1OTc4MjM2NjksImV4cCI6MTU5Nzg3NzY2OSwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMzAuNTU6NTAwMCIsImF1ZCI6WyJDY3NSZWNvcmRMaXN0U2VydmljZSIsIkNERlJlY29yZExpc3QiLCJDb21tb25NYW5hZ2UiLCJDb3N0TWFuYWdlbWVudCIsIkRlc2tUb3AiLCJIYW5kQm9vayIsIkhhbmRCb29rSHgiLCJJZGVudGl0eVNlcnZpY2UiLCJJdGVtTWFzdGVyTWFuYWdlbWVudCIsIk9yZGVyTWFuYWdlbWVudCIsIk9yaWdpbmFsRG9jdW1lbnRzTWFuYWdlbWVudCIsIk90ZWNoQXBwR2F0ZXdheSIsIlBhcnRuZXJSZWxhdGlvbnNNYW5hZ2VtZW50U2VydmljZSIsIlJlY29yZExpc3QiXSwiY2xpZW50X2lkIjoiZ29sZC1tZW1iZXItY2xpZW50Iiwic3ViIjoiMTY2ZDE4NjMtY2FmZC1lMGE0LTNjNGQtMzlmNDk5NGRmNmNmIiwiYXV0aF90aW1lIjoxNTk3ODIzNjY5LCJpZHAiOiJsb2NhbCIsInRlbmFudGlkIjoiMzcxNTZiOWUtNGU3NC1jODk1LTM1YjUtMzlmNDk5NGRmNDYzIiwicm9sZSI6InFhY2huMSIsIm5hbWUiOiJ0ZXN0QHR0c3Rtcy5jb20iLCJlbWFpbCI6InRlc3RAdHRzdG1zLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicGhvbmVfbnVtYmVyIjoiMTgwNDk5Mzc3MTkiLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOmZhbHNlLCJzY29wZSI6WyJhZGRyZXNzIiwiZW1haWwiLCJvcGVuaWQiLCJwaG9uZSIsInByb2ZpbGUiLCJyb2xlIiwiQ2NzUmVjb3JkTGlzdFNlcnZpY2UiLCJDREZSZWNvcmRMaXN0IiwiQ29tbW9uTWFuYWdlIiwiQ29zdE1hbmFnZW1lbnQiLCJEZXNrVG9wIiwiSGFuZEJvb2siLCJIYW5kQm9va0h4IiwiSWRlbnRpdHlTZXJ2aWNlIiwiSXRlbU1hc3Rlck1hbmFnZW1lbnQiLCJPcmRlck1hbmFnZW1lbnQiLCJPcmlnaW5hbERvY3VtZW50c01hbmFnZW1lbnQiLCJPdGVjaEFwcEdhdGV3YXkiLCJQYXJ0bmVyUmVsYXRpb25zTWFuYWdlbWVudFNlcnZpY2UiLCJSZWNvcmRMaXN0Iiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.omuAXk7RmcOzrfauUbvRE5z-wnn9fH7uEjkBNXguzSkCjaJ02kW27l5zVCUoyThvr5vUss67lw311riucfHHIVGuMX2z7NKP_FIwKSm5CwyKrBQY048vFFtKZ0-fGWEueOmcpEHL_exv0rINO5ie_IsVHeYbjLRkIDQDc5uMupWuZZjj1QnKLY_XMXUXLpg1BSJybvxtzY8WzlF676j-fSDVfet_NEEl8-Nhppnntu47X7VnQgxb0uswOL9QhsOzgfRQ-3qUi-6_B-xqt8ACr4kAaxxcirl3XIEy_3yrbCtO0lDti3EtreLYREunrpuRQnrZmMKXeozHObdJxl3g5w";
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
