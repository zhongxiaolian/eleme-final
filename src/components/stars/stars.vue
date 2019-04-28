<template>
    <div class="stars" :class="starsClass">
        <span class="star-item" 
            v-for="(item,index) in itemClassList" 
            :key="index"
            :class="item"></span>
    </div>
</template>

<script type='text/ecmascript-6'>
    const LENGTH = 5;     
    export default {
        props: {
            size: {
                type: Number
            },
            score: {
                type: Number
            }
        },
        data () {
            return {
            }
        },
        computed: {
            starsClass(){
                return 'stars-' + this.size
            },
            itemClassList(){
                let classList = [];
                let newScore = Math.floor(this.score*2)/2
                let decimal = newScore % 1;
                for(let i=0; i < parseInt(newScore); i++) {
                    classList.push('on');
                }
                if(decimal){
                    classList.push('half');
                }
                while(classList.length < LENGTH){
                    classList.push('off');
                }
                return classList
            }
        }
    }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import '~common/stylus/mixin.styl'
    .stars
        text-align center
        &.stars-24
            .star-item
                display inline-block
                width px2rem(20)
                height px2rem(20)
                margin-right px2rem(5)
                &::last-child
                    margin-right 0
                &.on
                    bg-image('./images/star24_on')
                &.off
                    bg-image('./images/star24_off')  
                &.half
                    bg-image('./images/star24_half')    
        &.stars-36
            .star-item
                display inline-block
                width px2rem(30)
                height px2rem(30)
                margin-right px2rem(10)
                &::last-child
                    margin-right 0
                &.on
                    bg-image('./images/star36_on')
                &.off
                    bg-image('./images/star36_off')  
                &.half
                    bg-image('./images/star36_half') 
        &.stars-48
            .star-item
                display inline-block
                width px2rem(40)
                height px2rem(40)
                margin-right px2rem(30)
                &:last-child
                    margin-right 0
                &.on
                    bg-image('./images/star48_on')
                &.off
                    bg-image('./images/star48_off')  
                &.half
                    bg-image('./images/star48_half')                          
</style>