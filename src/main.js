/*
 * @Author: codytang
 * @Date: 2020-07-09 21:10:07
 * @LastEditTime: 2020-07-10 00:49:56
 * @LastEditors: codytang
 * @Description:
 */

import Vue from "vue";
import App from "./App.vue";
import "normalize.css";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
