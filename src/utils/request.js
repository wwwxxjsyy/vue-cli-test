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

    config.headers["Authorization"] = "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlFVZ1Y0MEkxRDRoTXVMMXZ0N0drRWciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2MDQ1NjE1NTEsImV4cCI6MTYwNDYxNTU1MSwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMzAuNTU6NTAwMCIsImF1ZCI6WyJDY3NSZWNvcmRMaXN0U2VydmljZSIsIkNERlJlY29yZExpc3QiLCJDb21tb25NYW5hZ2UiLCJDb3N0TWFuYWdlbWVudCIsIkRlc2tUb3AiLCJIYW5kQm9vayIsIkhhbmRCb29rSHgiLCJJZGVudGl0eVNlcnZpY2UiLCJJdGVtTWFzdGVyTWFuYWdlbWVudCIsIk9yZGVyTWFuYWdlbWVudCIsIk9yaWdpbmFsRG9jdW1lbnRzTWFuYWdlbWVudCIsIk90ZWNoQXBwR2F0ZXdheSIsIlBhcnRuZXJSZWxhdGlvbnNNYW5hZ2VtZW50U2VydmljZSIsIlJlY29yZExpc3QiXSwiY2xpZW50X2lkIjoiZ29sZC1tZW1iZXItY2xpZW50Iiwic3ViIjoiMTY2ZDE4NjMtY2FmZC1lMGE0LTNjNGQtMzlmNDk5NGRmNmNmIiwiYXV0aF90aW1lIjoxNjA0NTYxNTUxLCJpZHAiOiJsb2NhbCIsInRlbmFudGlkIjoiMzcxNTZiOWUtNGU3NC1jODk1LTM1YjUtMzlmNDk5NGRmNDYzIiwicm9sZSI6InFhY2huMSIsIm5hbWUiOiJ0ZXN0QHR0c3Rtcy5jb20iLCJlbWFpbCI6InRlc3RAdHRzdG1zLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicGhvbmVfbnVtYmVyIjoiMTgwNDk5Mzc3MTkiLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOmZhbHNlLCJzY29wZSI6WyJhZGRyZXNzIiwiZW1haWwiLCJvcGVuaWQiLCJwaG9uZSIsInByb2ZpbGUiLCJyb2xlIiwiQ2NzUmVjb3JkTGlzdFNlcnZpY2UiLCJDREZSZWNvcmRMaXN0IiwiQ29tbW9uTWFuYWdlIiwiQ29zdE1hbmFnZW1lbnQiLCJEZXNrVG9wIiwiSGFuZEJvb2siLCJIYW5kQm9va0h4IiwiSWRlbnRpdHlTZXJ2aWNlIiwiSXRlbU1hc3Rlck1hbmFnZW1lbnQiLCJPcmRlck1hbmFnZW1lbnQiLCJPcmlnaW5hbERvY3VtZW50c01hbmFnZW1lbnQiLCJPdGVjaEFwcEdhdGV3YXkiLCJQYXJ0bmVyUmVsYXRpb25zTWFuYWdlbWVudFNlcnZpY2UiLCJSZWNvcmRMaXN0Iiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.stxq9uOQkAwpbaXvo41K2Wfdny8Qs8uans01OLUIW-EU8vsuBvLyzZxfFEF532nWo5lgcvE1SK_-Rvx0VfsDMfABPNWefNC8agrcG9RbqYzsiuctYof08c4mrfY3gg-A7W8Ic7y4oLuoFvnXplg1bWDgAsKRCdKo0ZU_achdktWypNU4F5hmh-CJMtdG00dR_BLxX_ZXAfzmugcaosraBNNVFriWa8kjbJ44HYsgtZ6_fuZsBr5nkuDClhRMy0NGQeaRFRUTOdlSvVpifd5QkV7MywYJuEI2b5oQWL8O6zQdERf6Fb6NG_F6g1Fgqfk313WFaEM2AISJOQtddhalZQ";
    // config.headers["Authorization"] = getToken();
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
