<template>
    <div class="ratings-wrapper">
        <div class="header">
            <div class="left">
                <h1 class="score">{{seller.score}}</h1>
                <div class="text">综合评分</div>
                <div class="desc">高于周边{{seller.rankRate}}%的商家</div>
            </div>
            <div class="right">
                <div class="goods-score flex-v-center">
                    <span class="text">商品评分</span> <stars class="stars" :size="36" :score="seller.score"></stars>
                </div>
                <div class="service-score flex-v-center">
                    <span class="text">服务评分</span>  <stars class="stars" :size="36" :score="seller.serviceScore"></stars>
                </div>
                <div class="delivery">
                    <span class="text">送达时间</span><span class="desc">{{seller.deliveryTime}}分钟送达</span>
                </div>
            </div>
        </div>
        <div class="split"></div>
        <selector
            :desc="desc"
            :ratings="ratings"
            :hasTitle="false"
            :onlyContent="onlyContent"
            :selectType="selectType"
            @onlyContent="onlyContentHandler"
            @selectType="selectTypeHandler">
        </selector>
        <ul class="ratings">
            <li v-for='(rating,index) in ratings' :key="index" class="rating-item flex" v-show="needShow(rating)">
                <div class="user-avatar">
                    <img :src="rating.avatar" alt="">
                </div>
                <div class="content">
                    <div class="top flex-h-between">
                        <span class="username">{{rating.username}}</span>
                        <span class="time" >{{rating.rateTime}}</span>
                    </div>
                    <div class="description flex-v-center">
                        <stars :score="rating.score" :size="24" class="stars-wrapper"></stars>
                        <span class="delivery" v-if="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                    </div>
                    <p class="text">
                        {{rating.text}}
                    </p>
                    <div class="recommend">
                        <span :class="{'icon-thumb_down': rating.rateType===1, 'icon-thumb_up': rating.rateType===0}"></span>
                        <span class="food-name" v-for="(item,index) in rating.recommend" :key="index">
                            {{item}}
                        </span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script type='text/ecmascript-6'>
    import stars from 'components/stars/stars.vue';
    import {getSellerRatings} from 'common/js/api.js';
    import selector from 'components/selector/selector.vue';
    import {ratingSelectType} from 'common/js/const.js';

    export default {
        props: {
            seller: {
                type: Object,
                default: {}
            }
        },
        data () {
            return {
                desc: {'all':'全部','active':'满意','negative':'不满意'},
                onlyContent: false,
                selectType: ratingSelectType.ALL,       // 使用常量的意义在于使用字符串字面量代替数组库中生硬的数值
                ratings: []
            }
        },
        components: {
            stars,
            selector
        },
        created(){
            getSellerRatings().then((data)=>{
                this.ratings = data;
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
                if(this.onlyContent && rating.text.trim() === ''){
                    return false
                }else if(this.selectType !== ratingSelectType.ALL && this.selectType !== rating.rateType){
                    return false
                }else{
                    return true
                }
            }       
        }
    }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import '~common/stylus/mixin.styl'

    .ratings-wrapper  
        position absolute
        top px2rem(349)
        bottom 0
        left 0
        right 0  
        overflow-y scroll
        --webkit-overflow-scrolling touch  
        .header
            display flex
            padding px2rem(36) 0            
            .left 
                flex 0 0 px2rem(275)
                width px2rem(275)     
                border-right 1px solid rgba(7,17,27,0.1)
                text-align center
                @media screen and (max-width : 375px)       // 针对特殊的机型做特殊的处理 
                    flex 0 0 px2rem(250)
                    width px2rem(250)
                .score
                    margin-bottom px2rem(12)
                    line-height px2rem(56)
                    font-size px2rem(48)
                    color rgb(255,153,0)                
                .text
                    margin-bottom px2rem(16)
                    line-height px2rem(24)
                    font-size px2rem(24)
                    color rgb(7,17,27)
                .desc
                    margin-bottom px2rem(12)
                    line-height px2rem(20)
                    font-size px2rem(20)
                    color rgb(7,17,27)
            .right
                flex 1
                padding 0 px2rem(48)
                .goods-score, .service-score, .delivery
                    margin-bottom px2rem(16)
                    .text
                        margin-right px2rem(24)
                        font-size px2rem(24)
        .split
            height px2rem(32)
            border-top 1px solid rgba(7,17,27,0.1)
            border-bottom 1px solid rgba(7,17,27,0.1)
            background #f3f5f7
        .ratings
            padding 0 px2rem(36)
            .rating-item
                padding px2rem(36) 0
                border-1px-gradient(rgba(7,17,27,0.2))
                .user-avatar
                    margin-right px2rem(24)
                    flex 0 0 px2rem(56)
                    width px2rem(56)
                    height px2rem(56)
                    border-radius 50%
                    overflow hidden
                    img 
                        width 100%
                        height 100%
                .content
                    flex 1
                    .top
                        font-size px2rem(20)
                        margin-bottom px2rem(8)
                        .username
                            color rgb(7,17,27)
                        .time
                            color rgb(147,153,159)
                    .description
                        margin-bottom px2rem(12)
                        .stars-wrapper
                            margin-right px2rem(12)
                        .delivery
                            font-size px2rem(20)
                            color rgb(147,153,159)
                    .text
                        line-height px2rem(36)
                        font-size px2rem(24)
                        color rbg(7,17,27)
                        margin-bottom px2rem(16)
                    .recommend
                        line-height px2rem(48)
                        .icon-thumb_down, .icon-thumb_up
                            margin-right px2rem(16)
                            line-height px2rem(32)
                            vertical-align middle
                            font-size px2rem(24)
                            color rgb(0,160,220)
                        .food-name
                            display inline-block
                            margin-right px2rem(16)
                            // margin-bottom px2rem(35)
                            padding 0 px2rem(12)
                            line-height px2rem(32)
                            vertical-align middle
                            font-size px2rem(18)
                            border 1px solid rgba(7,17,27,0.2)
</style>