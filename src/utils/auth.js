import Cookies from "js-cookie";
const TokenKey = "AuthorizationOtech";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token);
}

export function removeToken() {
  return sessionStorage.remove(TokenKey);
}
