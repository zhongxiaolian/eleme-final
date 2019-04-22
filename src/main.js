import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 在入口文件内引入全局的样式，避免子组件每次使用都要引入
import 'common/stylus/index.styl';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
