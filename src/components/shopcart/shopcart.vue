<template>
    <div class="shopcart-wrapper">
        <div class="shopcart">
            <div class="shopcart-content flex">
                <div class="left flex-v-center" @click="toggleFold">
                    <div class="logo-wrapper" :class="{'highlight': totalCount > 0}">
                        <span class="icon-shopping_cart"></span>
                        <span class="num" v-show="totalCount>0">{{totalCount}}</span>
                    </div>
                    <div class="price">{{totalPrice}}元</div>
                    <div class="delivery">另需配送费{{deliveryPrice}}元</div>
                </div>
                <div class="right">
                    <div class="pay" :class="{'highlight':totalPrice>=minPrice}">{{payDesc}}</div>
                </div>
            </div>
            <transition name="slide-down">
                <div class="shopcart-list" v-show="listShow">
                    <div class="header flex-h-between flex-v-center">
                        <span class="title">购物车</span>
                        <span class="empty" @click="emptyCart">清空</span>
                    </div>
                    <div class="content">
                        <ul>
                            <li v-for="(food,index) in cartList" :key="index" class="food-item flex-v-center flex-h-between">
                                <div class="food-item-left">
                                    <span class="food-name">{{food.name}}</span>
                                </div>
                                <div class="food-item-right flex-v-center">
                                    <span class="price">￥{{food.price * food.count}}</span>
                                    <div class="cartcontrol-wrapper">
                                        <cartcontrol :food="food"></cartcontrol>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="mask-fade">
            <div class="shopcart-mask" v-show="listShow" @click="toggleFold"></div>
        </transition>
    </div>

</template>

<script type='text/ecmascript-6'>
    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';
    import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
    export default {
        props: {
            minPrice: {
                type: Number
            },
            deliveryPrice: {
                type: Number
            }
        },
        data () {
            return {
                flod: true
            }
        },
        computed: {
            totalPrice(){
                let price = 0;
                this.cartList.forEach((item)=>{
                    price += item.price * item.count;
                })
                return price
            },
            totalCount(){
                let count = 0;
                this.cartList.forEach((item)=>{
                    count += item.count
                })
                return count
            },
            payDesc(){
                if(this.totalPrice < this.minPrice){
                    return `还差${this.minPrice-this.totalPrice}元起送`
                }else{
                    return `去支付`;
                }
            },
            listShow(){
                if(this.totalCount === 0){
                    this.flod = true;
                    return false
                }
                return !this.flod
            },
            ...mapGetters({
                cartList: 'cartList'
            })
        },
        components: {
            cartcontrol
        },
        methods: {
            toggleFold(){
                if(this.totalCount === 0){
                    return
                }else{
                    this.flod = !this.flod;
                }
            },
            ...mapActions({
                emptyCart: 'emptyCart'
            })
        }
    }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import '~common/stylus/mixin.styl';

    .shopcart-wrapper
        position fixed          // 因为子元素mask是固定定位，如果这里改成绝对定位整体布局都会随着滑动而滚动
        left 0                  // 绝对定位里面套固定定位不合理
        bottom 0
        width 100%
        height 46px
        z-index 100
        &.shopcart-slidedown-enter-active, &.shopcart-slidedown-leave-active
            transition all .3s
        &.shopcart-slidedown-enter, &.shopcart-slidedown-leave-to
            transform translate3d(0,100%,0)
        .shopcart   
            color rgba(255,255,255,0.4)
            box-shadow: 0 3px 14px 2px rgba(0,0,0,.12);
            .shopcart-content
                .left
                    flex 1
                    background #141D27
                    height 46px           // 如果这里不设置高度，left的高度会被子元素logo撑大，从而导致父元素也被撑大
                    .logo-wrapper
                        margin 0 px2rem(26)
                        position relative
                        top px2rem(-15)
                        width px2rem(88)
                        height px2rem(88)
                        border px2rem(10) solid #141D27
                        border-radius 50%
                        background #2B343C
                        text-align center
                        &.highlight
                            background rgb(0,160,220)
                            .icon-shopping_cart
                                color #ffffff
                        .icon-shopping_cart
                            line-height px2rem(88)
                            font-size px2rem(48)
                            color #80858A
                        .num
                            position absolute
                            right 0
                            top 0
                            width px2rem(48)
                            height px2rem(32)
                            line-height px2rem(32)
                            font-weight 700
                            font-size px2rem(18)
                            border-radius 10px
                            color #ffffff
                            background rgb(240,20,20)
                            box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
                            text-align center
                    .price
                        line-height px2rem(48)
                        padding-right px2rem(24)
                        border-right 1px solid rgba(255,255,255,0.1)
                        font-size px2rem(32)
                        font-weight 700
                    .delivery
                        padding 0 px2rem(24)
                        line-height px2rem(48)
                        font-size px2rem(24)
                .right 
                    flex 0 0 px2rem(210)
                    width px2rem(210)
                    .pay
                        height px2rem(92)
                        line-height px2rem(92)
                        font-size px2rem(24)
                        font-weight 700
                        text-align center
                        background #2B333B
                        &.highlight
                            color #ffffff
                            background-color #00b43c                   
                        
            .shopcart-list
                position absolute
                left 0
                top 0
                z-index -100        
                // 购物车的z-index是100，所以所有子元素的默认z-index都是100，而shopcart-list元素的
                // 由于设置了定位，它的默认层级会覆盖购物车的logo，而购物车没有设置定位，所以不能设置z-index
                // 所以这里要给定位了的shopcart-list一个负值，才能让它低于shopcart-content。
                width 100%
                transform translate3d(0,-100%,0)
                &.slide-down-enter-active, &.slide-down-leave-active
                    transition all .3s
                &.slide-down-enter, &.slide-down-leave-to
                    transform translate3d(0,0,0)
                .header
                    height px2rem(80)
                    background #f3f5f7
                    padding 0 px2rem(36)
                    .title
                        font-size px2rem(28)
                        color rgb(7,17,27)
                    .empty
                        padding px2rem(20)
                        font-size px2rem(24)
                        color rgb(0,160,220)
                .content
                    padding 0 px2rem(36)
                    background #ffffff
                    max-height px2rem(404)
                    overflow-y scroll
                    --webkit-overflow-scrolling touch
                    .food-item
                        border-1px-gradient(rgba(7,17,27,0.1))
                        height px2rem(96)
                        .food-name
                            font-size px2rem(28)
                            color rgb(7,17,27)
                        .price
                            font-size px2rem(28)
                            font-weight 700
                            color rgb(240,20,20)
                            margin-right px2rem(24)


        .shopcart-mask
            position fixed
            left 0
            top 0
            z-index -200                // 它的层级在shopcart中应该是最低的，比shopcart-list的-100还要低
            width 100%
            height 100%
            overflow hidden
            background rgba(0,0,0,0.8)
            backdrop-filter blur(10px)
            &.mask-fade-enter-active, &.mask-fade-leave-active
                transition all .3s
            &.mask-fade-enter, &.mask-fade-leave-to
                opacity 0
</style>