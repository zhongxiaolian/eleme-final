<template>
    <div class="myapp">
        <v-header :seller="seller"></v-header>
        <div class="tab">
            <span class="tab-item" :class="{'current': $route.path === '/goods'}" @click="toRoute('/goods')">商品</span>
            <span class="tab-item" :class="{'current': $route.path === '/ratings'}" @click="toRoute('/ratings')">评价</span>
            <span class="tab-item" :class="{'current': $route.path === '/seller'}" @click="toRoute('/seller')">商家</span>
        </div>
        <transition name="view-fade">
            <keep-alive>
                <router-view :seller="seller"></router-view>
            </keep-alive>
        </transition>
        <transition name="shopcart-slidedown">
            <shopcart 
                :minPrice="seller.minPrice" 
                :deliveryPrice="seller.deliveryPrice"
                v-show="cartShow">
            </shopcart>
        </transition>
    </div>
</template>

<script type='text/ecmascript-6'>
    import header from 'components/header/header.vue';
    import shopcart from 'components/shopcart/shopcart.vue';
import { setTimeout } from 'timers';

    export default {
        data () {
            return {
                seller: {},
                cartShow: true
            }
        },
        components: {
            'v-header': header,
            shopcart
        },
        methods: {
            toRoute(path){
                this.$router.push({'path':path})
            }
        },
        created(){
            this.axios.get('/api/seller').then((response)=>{
                let data = response.data;
                if(data.errno === 0){
                    this.seller = data.data;
                }
            });
        },
        updated(){                          // updated发生在patch方法之后
            setTimeout(() => {              // 不加延时动画会卡顿
                console.log('app updated')            // 打印两次是因为cartShow的修改导致视图又发生更新
                if(this.$route.path.indexOf('goods')>0 || this.$route.path.indexOf('detail')>0){
                    this.cartShow = true
                }else{
                    this.cartShow = false
                }     

            }, 300);
        },
        mounted(){                          // mounted在组件的生命周期中只执行一次

        }
    }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import '~common/stylus/mixin.styl';

    .myapp
        .tab
            display flex
            line-height px2rem(80)
            font-size px2rem(28)
            text-align center
            border-1px(rgba(7,17,27,0.1))
            .tab-item
                flex 1
                color rgb(77,85,93)
                &.current
                    color rgb(240,20,20)
        .view-fade-enter-active, .view-fade-leave-active
            transition opacity .3s
        .view-fade-enter, .view-fade-leave-to
            opacity 0
</style>