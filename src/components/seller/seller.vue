<template>
    <div class="seller">
        <div class="description">
            <div class="top">
                <div class="title">{{seller.name}}</div>
                <div class="seller-count flex-v-center">
                    <stars :score="seller.score" :size="36" class="stars"></stars> 
                    <span class="count">({{seller.sellCount}})</span>
                    <span class="month">月售{{seller.sellCount}}份</span>
                </div>
            </div>
            <div class="bottom">
                <div class="item">
                    <span class="text">起送价</span>
                    <span class="price">{{seller.minPrice}}<span class="extra">元</span></span>
                </div>
                <div class="item">
                    <span class="text">商家配送</span>
                    <span class="price">{{seller.deliveryPrice}}<span class="extra">元</span></span>
                </div>
                <div class="item">
                    <span class="text">平均配送时间</span>
                    <span class="price">{{seller.deliveryTime}}<span class="extra">分钟</span></span>
                </div>
            </div>
        </div>
        <div class="split"></div>
        <div class="bulletin">
            <div class="title">活动与公告</div>
            <p class="bulletin-text">{{seller.bulletin}}</p>
            <ul class="supports">
                <li class="item flex-v-center" v-for="(item,index) in seller.supports" :key="index">
                    <span class="icon" :class="classList[item.type]"></span><span class="text">{{item.description}}</span>
                </li>
            </ul>
        </div>
        <div class="split"></div>
        <div class="seller-pics">
            <div class="title">商家实景</div>
            <div class="pics">
                <img v-for="(item,index) in seller.pics" :key="index" :src="item" alt="">
            </div>
        </div>
        <div class="split"></div>
        <div class="seller-info">
            <div class="title">商家信息</div>
            <ul class="info-list">
                <li class="info" v-for="(item,index) in seller.infos" :key="index">
                    <span class="text">{{item}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type='text/ecmascript-6'>
    import stars from 'components/stars/stars.vue';

    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data () {
            return {
            }
        },
        components: {
            stars
        },
        created(){
            this.classList = ['decrease','discount','guarantee','invoice','special'];
        }
    }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import '~common/stylus/mixin.styl';

    .seller
        position absolute
        top px2rem(349)
        bottom 0
        left 0
        right 0  
        overflow-y scroll
        --webkit-overflow-scrolling touch
        .description
            padding 0 px2rem(36)
            .top
                padding px2rem(36) 0
                border-1px-gradient(rgba(7,17,27,0.1))
                .title
                    margin-bottom px2rem(16)
                    line-height px2rem(28)
                    font-size px2rem(28)
                    color rgb(7,17,27)
                .seller-count
                    .stars
                        margin-right px2rem(16)
                    .count
                        margin-right px2rem(24)
            .bottom
                padding px2rem(36) 0
                display flex 
                .item
                    flex 1
                    display flex
                    flex-direction column
                    justify-content center
                    text-align center
                    border-right 1px solid rgba(7,17,27,0.1)
                    &:last-child
                        border-right none 
                    .text
                        margin-bottom px2rem(8)
                        color rgb(147,153,159)
                        font-size px2rem(20)
                    .price
                        font-size px2rem(48)
                        .extra
                            font-size px2rem(20)
        .split
            height px2rem(32)
            border-top 1px solid rgba(7,17,27,0.1)
            border-bottom 1px solid rgba(7,17,27,0.1)
            background #f3f5f7
        .bulletin
            padding 0 px2rem(36)
            .title
                margin-bottom px2rem(16)
                padding-top px2rem(36)
                line-height px2rem(28)
                font-size px2rem(28)
                color rgb(7,17,27)
            .bulletin-text
                padding 0 px2rem(24) px2rem(36) px2rem(24)
                line-height px2rem(48)
                font-size px2rem(24)
                color rgb(240,20,20)
                border-1px-gradient(rgba(7,17,27,0.1))
            .supports
                padding 0 px2rem(24)
                .item
                    padding px2rem(32) 0
                    border-1px-gradient(rgba(7,17,27,0.1))
                    .icon
                        height px2rem(32)
                        width px2rem(32)
                        flex 0 0 px2rem(32)
                        margin-right px2rem(12)
                        &.decrease
                            bg-image('./images/decrease_4')
                        &.discount
                            bg-image('./images/discount_4')
                        &.guarantee
                            bg-image('./images/guarantee_4')
                        &.invoice
                            bg-image('./images/invoice_4')
                        &.special
                            bg-image('./images/special_4')
                    .text
                        flex 1
                        color rgb(7,17,27)
                        font-size px2rem(24)
                        white-space nowrap
                        overflow hidden
                        text-overflow ellipsis
        .seller-pics
            padding px2rem(36)
            .title
                margin-bottom px2rem(24)
                line-height px2rem(28)
                font-size px2rem(28)
                color rgb(7,17,27)  
            .pics
                white-space nowrap    
                overflow-x scroll
                overflow-y hidden
                --webkit-overflow-scrolling touch
                img 
                    display inline-block    
                    margin-right px2rem(12)
                    width px2rem(240)
                    height px2rem(180)
                    &:last-child
                        margin-right 0    
        .seller-info
            padding px2rem(36) px2rem(36) 0
            .title
                padding-bottom px2rem(24)
                line-height px2rem(28)
                font-size px2rem(28)
                color rgb(7,17,27)
                border-1px-gradient(rgba(7,17,27,0.1))
            .info   
                padding px2rem(32) px2rem(24)
                border-1px-gradient(rgba(7,17,27,0.1))
                .text
                    line-height px2rem(32)
                    font-size px2rem(24)
                    color rgb(7,17,27)     
                          
</style>