<template>
    <div class="app">
        <v-header :seller="seller"></v-header>
        <div class="tab">
            <span class="tab-item" :class="{'current': $route.path === '/goods'}" @click="toRoute('/goods')">商品</span>
            <span class="tab-item" :class="{'current': $route.path === '/ratings'}" @click="toRoute('/ratings')">评价</span>
            <span class="tab-item" :class="{'current': $route.path === '/seller'}" @click="toRoute('/seller')">商家</span>
        </div>
        <router-view></router-view>
    </div>
</template>

<script type='text/ecmascript-6'>
    import header from 'components/header/header.vue';

    export default {
        data () {
            return {
                seller: {}
            }
        },
        components: {
            'v-header': header
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
        }
    }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import '~common/stylus/mixin.styl';

    .app
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
</style>