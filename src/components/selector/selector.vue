<template>
    <div class="selector">
        <h2 class="title" v-show="title">{{title}}</h2>
        <div class="tabs">          <!--样式的切换也要依赖数组驱动-->
            <div class="item  all" :class="{'current':selectTypeSelf === 2}" @click="selectTab(2)">
                <span class="text">{{desc.all}}</span>
                <span class="count" v-if="ratings">{{ratings.length}}</span>
            </div>
            <div class="item active" :class="{'current':selectTypeSelf === 0}" @click="selectTab(0)">
                <span class="text">{{desc.active}}</span>
                <span class="count">{{activeRatings}}</span>
            </div>
            <div class="item negative" :class="{'current':selectTypeSelf === 1}" @click="selectTab(1)">
                <span class="text">{{desc.negative}}</span>
                <span class="count">{{negativeRatings}}</span>
            </div>                        
        </div>
        <div class="only-content">
            <span class="icon-check_circle" @click="toggleOnlyContent" :class="{'active':onlyContentSelf}"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script type='text/ecmascript-6'> 
    import {ratingSelectType} from 'common/js/const.js';
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
            desc: {
                type: Object,
                default: function(){
                    return {
                        'all': '全部',
                        'active': '推荐',
                        'negative': '吐槽'
                    }
                }
            },
            ratings: {
                type: Array,                // 数组和对象类型的props应该给上默认值，默认值是一个工厂函数，以防报错。
                default: function(){
                    return []
                }
            },
            onlyContent: {                  // 子组件要修改父组件传过来的props时，需要在data或者computed中保存一份副本
                type: Boolean,              // 每次只修改副本中的值，不能修改props值。
                default: false
            },
            selectType: {
                type: Number,
                default: ratingSelectType.ALL
            },
            hasTitle: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                onlyContentSelf: this.onlyContent,      // 这里的data是props的副本，来维持子组件自身的状态。     
                selectTypeSelf: this.selectType         
            }
        },
        computed: {
            activeRatings(){
                return this.ratings.filter((item)=>{
                    return item.rateType === 0
                }).length
            },
            negativeRatings(){
                return this.ratings.filter((item)=>{
                    return item.rateType === 1
                }).length
            }
        },
        methods: {
            selectTab(type){
                this.selectTypeSelf = type;                     // 更改状态驱动视图样式的变化
                this.$emit('selectType',this.selectTypeSelf);   // 父子组件的通信依赖自定义事件
            },
            toggleOnlyContent(){
                this.onlyContentSelf = !this.onlyContentSelf;
                this.$emit('onlyContent',this.onlyContentSelf);
            }
        }
    }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import '~common/stylus/mixin.styl';

    .selector
        padding 0 px2rem(36)
        border-bottom 1px solid rgba(7,17,27,0.1)
        .title
            margin-top px2rem(36)
            line-height px2rem(28)
            font-size px2rem(28)
            color rgb(7,17,27)
        .tabs
            padding px2rem(36) 0
            .item
                display inline-block
                margin-right px2rem(16)
                padding px2rem(16) px2rem(24)
                font-size 0
                color rgb(77,85,93)
                &.all, &.active
                    background #CCECF8
                &.negative
                    background #E9EBEC
                &.current
                    background #00A0DC
                    color #ffffff
                .text
                    font-size px2rem(24)
                    margin-right px2rem(10)
                .count
                    font-size px2rem(16)
        .only-content
            padding px2rem(24) 0
            font-size 0
            color rgb(147,153,159)
            .icon-check_circle
                margin-right px2rem(8)
                line-height px2rem(48)
                vertical-align middle
                font-size px2rem(48)
                &.active
                    color rgb(0,160,220)
            .text
                line-height px2rem(48)
                vertical-align middle
                font-size px2rem(24)
</style>