<template>
    <div class="cartcontrol flex-v-center">
        <div class="decrease" v-show="getFoodCountById(food.id)" @click.stop.prevent="removeFromCart(food.id)">
            <span class="icon-remove_circle_outline"></span>
        </div>
        <div class="count-wrapper" v-show="getFoodCountById(food.id)">
            <span class="count">{{getFoodCountById(food.id)}}</span>
        </div>
        <div class="increase" @click.stop.prevent="addToCart(food)">
            <span class="icon-add_circle"></span>
        </div>
    </div>
</template>

<script type='text/ecmascript-6'>
    import { mapGetters} from 'vuex';
    import { mapActions } from 'vuex'
    export default {
        props: {
            food: {
                type: Object
            }
        },
        computed: {
            ...mapGetters({
                getFoodCountById: 'getFoodCountById'
            })
        },
        data () {
            return {
            }
        },
        methods: {
            ...mapActions([
                'addToCart',
                'removeFromCart'
            ])
        }
    }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import '~common/stylus/mixin.styl';
    .cartcontrol
        .decrease, .increase
            padding px2rem(10)
            line-height px2rem(48)
            font-size px2rem(48)
            color rgb(0,160,220)
        .count-wrapper
            .count
                display inline-block
                width px2rem(40)
                text-align center
                color rgb(147,153,159)
</style>