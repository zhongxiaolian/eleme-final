import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cartList: [
        ]
    },
    getters: {
        cartList: (state) => {
            return state.cartList;
        },
        getFoodCountById: (state) => (id)=>{
            let food = state.cartList.find((food)=>{
                return food.id === id;
            })
            if(food && food.count){
                return food.count
            }else{
                return 0
            }
        }
    },
    mutations: {
        add(state, food){
            let result = state.cartList.find((item)=>{
                return food.id === item.id
            })
            if(result){
                result.count = result.count + 1;
            }else{
                Vue.set(food,'count',1)             // 这样才能让count属性成为响应式的
                state.cartList.push(food)
            }
            
        },
        remove(state,id){
            let result = state.cartList.find((item)=>{
                return id === item.id
            })
            if(result && result.count > 1){
                result.count = result.count -1;
            }else{
                state.cartList.forEach((item,index)=>{
                    if(item.id === id){
                        state.cartList.splice(index,1)
                    }
                })
            }
        },
        empty(state){
            state.cartList.splice(0,state.cartList.length);
        }   
    },
    actions: {
        addToCart(context,food){
            context.commit('add',food)
        },
        removeFromCart(context,id){
            context.commit('remove',id);
        },
        emptyCart(context){
            context.commit('empty');
        }
    }
})
