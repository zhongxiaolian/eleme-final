<template>
    <div class="header">
        <div class="content flex">
            <div class="avatar">
                <img :src="seller.avatar" alt="">
            </div>
            <div class="content-right">
                <h1 class="title flex-v-center">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </h1>
                <div class="delivery">
                    {{seller.description}} / {{seller.deliveryTime}}分钟送达
                </div>
                <!-- v-show就会报错 -->
                <div class="supports flex-v-center" v-if="seller.supports && seller.supports.length>0">
                    <span class="icon" :class="classList[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
                <div class="count" v-if="seller.supports && seller.supports.length>0" @click="toggleDetail">
                    <span class="text">{{seller.supports.length}}个</span>
                    <span class="icon-keyboard_arrow_right"></span>
                </div>
            </div>
        </div>
        <div class="bulletin flex-v-center" @click="toggleDetail">
            <span class="icon"></span>
            <p class="text">{{seller.bulletin}}</p>
            <span class="icon-keyboard_arrow_right"></span>
        </div>
        <div class="background">
            <img :src="seller.avatar" alt="">
        </div>
        <transition name="fade-slide">
            <div class="detail" v-show="detailShow">
                <div class="detail-main">
                    <h2 class="title">{{seller.name}}</h2>
                    <div class="stars-wrapper">
                        <stars :size="48" :score="seller.score"></stars>
                    </div>
                    <div class="split flex-v-center">
                        <div class="linear"></div>
                        <div class="text">优惠信息</div>
                        <div class="linear"></div>
                    </div>
                    <div class="supports-wrapper"  v-if="seller.supports && seller.supports.length>0">
                        <div class="supports flex-v-center" v-for="(item,index) in seller.supports" :key="index">
                            <span class="icon" :class="classList[item.type]"></span>
                            <span class="text">{{item.description}}</span>
                        </div>
                    </div>
                    <div class="split flex-v-center">
                        <div class="linear"></div>
                        <div class="text">商家公告</div>
                        <div class="linear"></div>
                    </div>  
                    <p class="bulletin-info">{{seller.bulletin}}{{seller.bulletin}}{{seller.bulletin}}{{seller.bulletin}}</p>                 
                </div>
                <div class="close-wrapper">
                    <span class="icon-close" @click="toggleDetail"></span>  
                </div>
            </div>
        </transition>
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
                detailShow: false
            }
        },
        components: {
            stars
        },
        created(){
            // 静态数据没必要放到data中
            this.classList = ['decrease','discount','guarantee','invoice','special'];
        },
        methods: {
            toggleDetail(){
                this.detailShow = !this.detailShow;
            }
        }
    }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import '~common/stylus/mixin.styl'

    .header
        position relative
        .content
            position relative
            padding px2rem(48) px2rem(48) px2rem(36) 
            background rgba(7,17,27,0.5)
            .avatar
                flex 0 0 px2rem(128)
                width px2rem(128)
                height px2rem(128)
                margin-right px2rem(32)
                border-radius 4px
                overflow hidden
                img 
                    width 100%
                    height 100%
            .content-right
                flex 1
                padding px2rem(4) 0
                .title
                    margin-bottom px2rem(16)
                    .brand
                        margin-right px2rem(12)
                        width px2rem(60)
                        height px2rem(36)
                        bg-image('./images/brand')
                    .name
                        font-size px2rem(32)
                        font-weight 300
                        color #ffffff
                .delivery
                    margin-bottom px2rem(20)
                    line-height px2rem(24)
                    font-size px2rem(24)
                    color #ffffff
                .supports
                    .icon
                        height px2rem(24)
                        width px2rem(24)
                        margin-right px2rem(8)
                        &.decrease
                            bg-image('./images/decrease_1')
                        &.discount
                            bg-image('./images/discount_1')
                        &.guarantee
                            bg-image('./images/guarantee_1')
                        &.invoice
                            bg-image('./images/invoice_1')
                        &.special
                            bg-image('./images/special_1')
                    .text
                        font-size px2rem(20)
                        color #ffffff
                .count
                    position absolute
                    right px2rem(24)
                    bottom px2rem(30)
                    padding px2rem(14) px2rem(16) 
                    line-height px2rem(24)
                    font-size px2rem(20)
                    color #ffffff
                    background rgba(0,0,0,0.2)
                    border-radius 15px
                    .text
                        margin-right px2rem(4)
                    .icon-keyboard_arrow_right
                        line-height px2rem(24)
        .bulletin
            height px2rem(56)
            padding 0 px2rem(24)
            background rgba(7,17,27,0.3)
            .icon
                margin-right px2rem(8)
                flex 0 0 px2rem(44)
                width px2rem(44)
                height px2rem(24)
                bg-image('./images/bulletin')
            .text   
                margin-right px2rem(8)
                flex 1
                font-size px2rem(20)
                color #ffffff
                white-space nowrap
                overflow hidden
                text-overflow ellipsis
            .icon-keyboard_arrow_right
                color #ffffff
        .background
            position absolute
            left 0
            right 0
            top 0
            bottom 0
            z-index -10
            img 
                width 100%
                height 100%
                filter blur(10px)
        .detail
            position fixed
            left 0 
            top 0
            width 100%
            height 100%
            background rgba(7,17,27,0.8) 
            z-index 100
            overflow-y scroll
            -webkit-overflow-scrolling touch
            &.fade-slide-enter-active, &.fade-slide-leave-active
                transition all .3s
            &.fade-slide-enter, &.fade-slide-leave-to
                transform translate3d(100%,0,0)
                opacity 0
            .detail-main
                min-height 100%
                padding px2rem(128) px2rem(72)
                box-sizing border-box
                .title
                    margin-bottom px2rem(32)
                    line-height px2rem(32)
                    font-size px2rem(32)
                    font-weight 700
                    color #ffffff
                    text-align center
                .stars-wrapper
                    margin-bottom px2rem(56)
                .split
                    margin-bottom px2rem(48)
                    .linear
                        flex 1
                        height 0
                        border-bottom 2px solid rgba(255,255,255,0.2)
                    .text
                        padding 0 px2rem(24)
                        line-height px2rem(28)
                        font-size px2rem(28)
                        color #ffffff
                .supports-wrapper
                    margin-bottom px2rem(56)
                    padding 0 px2rem(24)
                    .supports
                        margin-bottom px2rem(12)
                        &:last-child
                            margin-bottom 0
                        .icon
                            height px2rem(32)
                            width px2rem(32)
                            margin-right px2rem(12)
                            &.decrease
                                bg-image('./images/decrease_2')
                            &.discount
                                bg-image('./images/discount_2')
                            &.guarantee
                                bg-image('./images/guarantee_2')
                            &.invoice
                                bg-image('./images/invoice_2')
                            &.special
                                bg-image('./images/special_2')
                        .text
                            font-size px2rem(24)
                            color #ffffff
                .bulletin-info
                    padding 0 px2rem(24)
                    line-height px2rem(48)
                    font-size px2rem(24)
                    color #ffffff
            .close-wrapper
                margin-top px2rem(-128)
                text-align center
                font-size px2rem(64)
                color rgba(255,255,255,0.5)
</style>