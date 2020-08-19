// import { login } from "@/api/login";
import {
  setToken,
  removeToken,
  getToken
} from "@/utils/auth";
import router, { resetRouter } from "@/router";

const state = {
  token: getToken(),
  baseUrl: ""
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_AJAXURL: (state, url) => {
    state.baseUrl = url;
  }
};

const actions = {
  setajaxurl({ commit }, url) {
    commit("SET_AJAXURL", url);
  },
  login({ commit }, userInfo) {
    const { username, password, verificationcode, guid } = userInfo;
    return new Promise((resolve, reject) => {
      login({
        userNameOrPhoneOrEmailAddress: username,
        password: password,
        Code: verificationcode,
        GenerId: guid
      })
        .then(response => {
          const { data } = response;
          if (response.code == 20000) {
            let tokenStrign = "Bearer " + data.access_token;
            commit("SET_TOKEN", tokenStrign);
            setToken(tokenStrign);
            setTenant(data.tenant);
            resetRouter();
            resolve();
          } else {
            reject(response.message);
          }
        })
        .catch(error => {
          reject(error.message);
        });
    });
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      removeToken();
      removeTenant();
      resetRouter();
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
