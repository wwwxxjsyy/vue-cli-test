import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "@/icons"; // icon

Vue.config.productionTip = false;

axios
  .get("./config.json")
  .then(res => {
    let OversUrl =
      process.env.NODE_ENV == "production"
        ? res.data.production
        : res.data.develop;
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
