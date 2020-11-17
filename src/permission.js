import router from "./router";
import { getToken } from "@/utils/auth";
const whiteList = ["/login"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // determine whether the user has logged in 确认用户是否已经登录了
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === "/login") {
      // if is logged in, redirect to the home page 如果登录了就跳转到下面这个地址
      next({
        path: "/project/list"
      });
    } else {
      if (hasToken) {
        next();
      } else {
        try {
          next();
        } catch (error) {
          // remove token and go to login page to re-login 删除token，重新登录
          Message.error(error || "Has Error");
          next(`/login?redirect=${to.path}`);
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly  不需要登录就可以进入的页面
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.  没有访问权限的其他页面被重定向到登录页面。
      // next(`/login?redirect=${to.path}`)
      next(`/login`);
    }
  }
});
