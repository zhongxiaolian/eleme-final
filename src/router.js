import Vue from 'vue'
import Router from 'vue-router'
/**
import goods from 'components/goods/goods.vue';
import ratings from 'components/ratings/ratings.vue';
import seller from 'components/seller/seller.vue';
import detail from 'components/detail/detail.vue';
**/


// 将异步组件定义为一个返回Promise对象的工厂函数
const goods = () =>{ return import('components/goods/goods.vue') }
const ratings = () =>{ return import('components/ratings/ratings.vue') }
const seller = () =>{ return import('components/seller/seller.vue') }
const detail = () =>{ return import('components/detail/detail.vue') }

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/goods'
        },{
            path: '/goods',
            component: goods
        },{
            path: '/ratings',
            component: ratings
        },{
            path: '/seller',
            component: seller
        },{
            path: '/detail/:id',
            component: detail
        }
    ]
})
