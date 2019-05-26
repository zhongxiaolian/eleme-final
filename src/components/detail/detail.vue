<template>
    <div class="food-detail">
        <div class="header-image">
            <img :src="food.image" alt="">
            <span class="icon-arrow_lift" @click="goBack"></span>
        </div>
        <div class="description">
            <h1 class="title">{{food.name}}</h1>
            <div class="delivery">
                <span class="sell-count">月售{{food.sellCount}}份</span>
                <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
                <span class="new">￥{{food.price}}元</span>
                <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}元</span>
            </div>
            <transition name="buy-fade">
                <div class="buy flex-v-h-center" v-show="!getFoodCountById(food.id)" @click="addToCart(food)">
                    <span class="text">加入购物车</span>
                </div>
            </transition>
            <cartcontrol 
                :food="food" 
                class="cartcontrol-wrapper"
                v-show="getFoodCountById(food.id)">
            </cartcontrol>
        </div>

        <div class="split" v-if="food.info"></div>

        <div class="info" v-if="food.info">
            <h2 class="title">商品介绍</h2>
            <p class="text">{{food.info}}</p>
        </div>

        <div class="split"></div>

        <selector 
            :ratings = "food.ratings"
            :onlyContent = "onlyContent"
            :selectType = "selectType"
            title = "商品评价"
            @onlyContent="onlyContentHandler"
            @selectType="selectTypeHandler">
        </selector>

        <ul class="ratings-list">
            <!-- v-show的值也可以是一个函数 -->
            <li class="rating" v-for="(rating,index) in food.ratings" :key="index" v-show="needShow(rating)">
                <div class="header flex-h-between">
                    <div class="time">{{rating.rateTime}}</div>
                    <div class="user flex-v-center">
                        <span class="name">{{rating.username}}</span>
                        <img class="avatar" :src="rating.avatar" alt="">
                    </div>
                </div>
                <p class="content"> 
                    <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                </p>
            </li>
        </ul>
    </div>
</template>

<script type='text/ecmascript-6'>
    import {getFoodById} from 'common/js/api.js';
    import {ratingSelectType} from 'common/js/const.js';
    import selector from 'components/selector/selector.vue';
    import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
    import { mapGetters} from 'vuex';
    import { mapActions } from 'vuex';

    export default {
        data () {
            return {
                food: {},
                onlyContent: false,
                selectType: ratingSelectType.ALL
            }
        },
        computed: {
            ...mapGetters({
                getFoodCountById: 'getFoodCountById'
            })
        },
        components: {
            selector,
            cartcontrol
        },
        created(){
            let foodId = this.$route.params.id;
            getFoodById(foodId).then((data)=>{
                this.food = data;
            })
        },
        methods: {
            onlyContentHandler(param){
                this.onlyContent = param;
            },
            selectTypeHandler(param){
                this.selectType = param;
            },
            needShow(rating){
                // 像这种类型的问题就应该使用排除法。
                // 是否只显示内容和评论的类型两个条件同时满足时才会显示该评论。
                // 只要有一个不满足就会返回false。
                // 所以先把false的情况先都写出来。
                if(this.onlyContent && rating.text.trim() === ''){
                    return false
                }else if(this.selectType !== ratingSelectType.ALL && rating.rateType !== this.selectType){
                    return false
                }else{
                    return true
                }
            },
            goBack(){
                this.$router.go(-1);
            },
            ...mapActions({
                addToCart: 'addToCart'
            })
        }
    }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import '~common/stylus/mixin.styl';

    .food-detail
        position fixed
        top 0
        left 0
        right 0
        bottom 46px
        background #ffffff
        overflow-y auto
        overflow-x hidden
        -webkit-overflow-scrolling touch
        .header-image   
            position relative
            height 0
            padding-bottom 100%
            img 
                position absolute 
                left 0
                top 0
                height 100%
                width 100%
            .icon-arrow_lift
                position absolute
                left px2rem(20)
                top px2rem(20)
                padding px2rem(10)
                font-size px2rem(48)
                color #ffffff
        .description
            position relative
            padding px2rem(36)
            .title
                line-height px2rem(28)
                font-size px2rem(28)
                font-weight 700
                color rgb(7,17,27)
                margin-bottom px2rem(16)
            .delivery
                margin-bottom px2rem(36)
                font-size 0
                line-height px2rem(20)
                color rgb(147,153,159)
                .sell-count
                    margin-right px2rem(24)
                    font-size px2rem(20)
                .rating
                    font-size px2rem(20)
            .price
                line-height px2rem(48)  
                font-size 0
                .new
                    vertical-align middle
                    margin-right px2rem(24)
                    font-size px2rem(28)
                    color rgb(240,20,20)
                .old
                    vertical-align middle
                    font-size px2rem(20)
                    color rgb(147,153,159)
                    text-decoration line-through
            .buy
                position absolute
                right px2rem(36)
                bottom px2rem(36)
                z-index 200
                width px2rem(168)
                height px2rem(48)
                background rgb(0,160,220)
                border-radius px2rem(24)
                text-align center
                &.buy-fade-enter-active, &.buy-fade-leave-active
                    transition all .5s
                &.buy-fade-enter, &.buy-fade-leave-to
                    opacity 0
                .text
                    font-size px2rem(20)
                    color #ffffff
            .cartcontrol-wrapper
                position absolute
                right px2rem(36)
                bottom px2rem(25)
                z-index 100
        .split
            height px2rem(32)
            border-top 1px solid rgba(7,17,27,0.1)
            border-bottom 1px solid rgba(7,17,27,0.1)
            background #f3f5f7
        .info
            padding px2rem(36)
            .title
                margin-bottom px2rem(12)
                line-height px2rem(28)
                font-size px2rem(28)
            .text
                line-height px2rem(48)
                padding 0 px2rem(16)
                font-size px2rem(24)
                color rgb(77,85,93)

        .ratings-list
            padding 0 px2rem(36)
            .rating
                padding px2rem(32) 0
                border-1px-gradient(rgba(7,17,27,0.2))
                // border-1px(rgba(7,17,27,0.2))
                .header
                    margin-bottom px2rem(12)
                    .time
                        line-height px2rem(24)
                        font-size px2rem(20)
                        color rgb(147,153,159)
                    .user
                        .name
                            margin-right px2rem(12)
                            line-height px2rem(24)
                            font-size px2rem(20)
                            color rgb(147,153,159)
                        .avatar
                            width px2rem(24)
                            height px2rem(24)
                            border-radius 50%
                .content
                    line-height px2rem(32)
                    font-size px2rem(24)
                    color rgb(7,17,27)
                    .icon-thumb_down, .icon-thumb_up
                        font-size px2rem(24)
                        line-height px2rem(32)
                        vertical-align middle
                        margin-right px2rem(8)
                    .icon-thumb_down
                        color rgb(147,153,159)
                    .icon-thumb_up
                        color rgb(0,160,220)
</style>