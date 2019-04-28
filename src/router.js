import Vue from 'vue'
import Router from 'vue-router'

import goods from 'components/goods/goods.vue';
import ratings from 'components/ratings/ratings.vue';
import seller from 'components/seller/seller.vue';
import detail from 'components/detail/detail.vue';

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
