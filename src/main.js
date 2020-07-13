/*
 * @Author: codytang
 * @Date: 2020-07-09 21:10:07
 * @LastEditTime: 2020-07-13 11:49:27
 * @LastEditors: codytang
 * @Description:
 */

import Vue from 'vue';
import App from './App.vue';
import 'normalize.css';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
