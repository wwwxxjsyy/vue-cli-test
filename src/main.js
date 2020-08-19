import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

Vue.config.productionTip = false;

axios
  .get("./config.json")
  .then(res => {
    let OversUrl =
      process.env.NODE_ENV == "production" ? res.production : res.develop;

    Vue.prototype.$baseUrl = OversUrl;

    store.dispatch("user/setajaxurl", OversUrl);
    /* eslint-disable no-new */
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  })
  .catch(err => {
    console.log(err);
  });
