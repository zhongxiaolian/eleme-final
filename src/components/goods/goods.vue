<template>
    <div class="goods flex">
        <div class="menu-wrapper" ref="menu-wrapper">
            <ul>
                <li class="menu-item-wrapper menu-item-hook" 
                    v-for="(item,index) in goods" 
                    :key="index" @click="_scrollTo(index)" 
                    :class="{'current':currentMenu === index}">
                    <div class="menu-item">
                        <span class="icon" :class="classList[item.type]" v-if="item.type && item.type>0"></span>
                        <span class="text">{{item.name}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foods-wrapper" @scroll="_scrollHandler($event)">
            <ul>
                <li v-for="(item,index) in goods" :key="index" class="food-list-hook">
                    <h2 class="title">{{item.name}}</h2>
                    <ul>
                        <li v-for="(food,index) in item.foods" :key="index" class="food-item flex" @click="gotoFood(food.id)">
                            <div class="left">
                                <img :src="food.image" alt="">
                            </div>
                            <div class="right">
                                <h3 class="food-name">{{food.name}}</h3>
                                <div class="description">{{food.description}}</div>
                                <div class="sell-info">
                                    <span class="sell-count">月售{{food.sellCount}}份</span>
                                    <span class="rating">好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="new">￥{{food.price}}</span>
                                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                            </div>
                            <div class="cartcontrol-wrapper">
                                <cartcontrol :food="food"></cartcontrol>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template> 

<script type='text/ecmascript-6'>
    import shopcart from 'components/shopcart/shopcart.vue';
    import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data () {
            return {
                goods: {},
                currentMenu: 0,
                shopcartW: 0
            }
        },
        components: {
            shopcart,
            cartcontrol
        },
        created(){
            this.axios.get('/api/goods').then((response)=>{
                let data = response.data;
                if(data.errno === 0) {
                    this.goods = data.data;         // 改变data数组，到视图发生更新是一个异步的过程
                    this.$nextTick(()=>{
                        this._calculateHeight();
                    })
                }
            })

            this.classList = ['decrease','discount','guarantee','invoice','special'];
        },
        methods: {
            _calculateHeight(){
                let height = 0;
                let heightArray = [];
                heightArray.push(height);
                let foodList = document.querySelectorAll('.food-list-hook');
                for(let i=0; i<foodList.length; i++){
                    height += foodList[i].clientHeight;
                    heightArray.push(height);
                }
                this.heightArray = heightArray;
            },
            /**
             * 缓动到指定的菜单页
             */
            _scrollTo(index){
                this.currentMenu = index;
                let foodsWrapper = this.$refs['foods-wrapper'];
                let from = foodsWrapper.scrollTop;
                let to = this.heightArray[index];
                let step = Math.ceil((to-from)/10);    // 保证最终最小的步长是1，不会出现死循环   

                if(timer){
                    clearTimeout(timer);
                }
                let timer = setTimeout(() => {
                    if((step>0 && from+step < to) || (step<0 && from+step > to)){
                        foodsWrapper.scrollTop = from + step;
                        this._scrollTo(index)
                    }else{
                        foodsWrapper.scrollTop = to;
                    }
                }, 1);
            },
            // 模拟scroll-end事件
            _scrollHandler($event){
                if(this.timer){
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(() => {
                    let foodsWrapper = $event.target;
                    let scrollTop = foodsWrapper.scrollTop;
                    for(let i = 0; i<this.heightArray.length; i++){
                        if(scrollTop >= this.heightArray[i] && scrollTop < this.heightArray[i+1]){
                            this.currentMenu = i;
                            this._currentMenuIntoView();
                            break;
                        }
                    }
                }, 50);
            },
            _currentMenuIntoView(){
                let currentMenu = document.querySelectorAll('.menu-item-hook')[this.currentMenu];
                let menuWrapper = this.$refs['menu-wrapper'];
                let currentMenuPosition = currentMenu.offsetTop;
                let min = menuWrapper.scrollTop;
                let max = menuWrapper.clientHeight + min;
                if(currentMenuPosition > min && currentMenuPosition + currentMenu.clientHeight < max){
                    return
                }else if(currentMenuPosition+currentMenu.clientHeight > max){
                    menuWrapper.scrollTop = currentMenuPosition + currentMenu.clientHeight - menuWrapper.clientHeight;
                }else if(currentMenuPosition < min){
                    menuWrapper.scrollTop = currentMenuPosition
                }
            },
            gotoFood(id){
                this.$router.push({path: `/detail/${id}`});
            }
        }
    }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
    @import '~common/stylus/mixin.styl'

    .goods
        position absolute   // footer和header也可以用fixed，这里用绝对定位其实就是让滚动发生在子元素内，不能是body内滚动
        top px2rem(349)
        left 0
        right 0
        bottom 46px
        .menu-wrapper
            flex 0 0 px2rem(160)
            width px2rem(160)
            background #f3f5f7
            overflow-y scroll
            --webkit-overflow-scrolling touch
            .menu-item-wrapper
                display table
                width 100%
                height px2rem(108)
                padding 0 px2rem(24)
                box-sizing border-box
                color #000
                &.current
                    font-weight 700
                    color rgb(240,20,20)
                .menu-item
                    display table-cell
                    line-height px2rem(28)
                    vertical-align middle
                    border-1px-gradient(rgba(7,17,27,0.1))
                    .icon
                        display inline-block
                        vertical-align middle
                        width px2rem(24)
                        height px2rem(24)
                        &.decrease
                            bg-image('./images/decrease_3')
                        &.discount
                            bg-image('./images/discount_3')
                        &.guarantee
                            bg-image('./images/guarantee_3')
                        &.invoice
                            bg-image('./images/invoice_3')
                        &.special
                            bg-image('./images/special_3')
                    .text   
                        display inline          // inline-block文本就不会和图标一行显示
                        font-size px2rem(24)
                        
        .foods-wrapper
            flex 1
            overflow-y scroll
            --webkit-overflow-scrolling touch
            .title
                line-height px2rem(52)
                padding-left px2rem(28)
                font-size px2rem(24)
                color rgb(147,153,159)
                border-left 2px solid #d9dde1
                background #f3f5f7
            .food-item
                position relative
                margin px2rem(36) px2rem(36) 0
                padding-bottom px2rem(36)
                border-1px-gradient(rgba(7,17,27,0.1))
                .left
                    flex 0 0 px2rem(114)
                    width px2rem(114)
                    margin-right px2rem(20)
                    border-radius 3px
                    overflow hidden
                    img 
                        height px2rem(114)
                        width px2rem(114)
                .right
                    flex 1
                    padding-top px2rem(4)
                    .food-name
                        margin-bottom px2rem(16)
                        // line-height px2rem(28)
                        font-size px2rem(28)
                        color rgb(7,17,27)
                    .description, .sell-info
                        margin-bottom px2rem(16)
                        // line-height px2rem(20)
                        font-size px2rem(20)
                        color rgb(147,153,159)
                        .sell-count
                            margin-right px2rem(24)
                    .price
                        .new
                            font-size px2rem(28)
                            color rgb(240,20,20)
                            font-weight 700
                            margin-right px2rem(16)
                        .old
                            font-size px2rem(20)
                            color rgb(147,153,159)
                .cartcontrol-wrapper
                    position absolute
                    right px2rem(0)
                    bottom px2rem(20)

</style>