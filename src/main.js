import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
// 在入口文件内引入全局的样式，避免子组件每次使用都要引入
import 'common/stylus/index.styl';

// 因为axios不是Vue的插件，所以只能通过原型的方式，让所有子组件使用
Vue.prototype.axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')			// #app是页面上我们要挂载到的位置，在最终会把这个dom替换成我们的App组件
