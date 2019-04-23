import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cartList: []
    },
    mutations: {
        add(state, food){
            state.cartList.push(food)
        }   
    },
    actions: {
        add(context,food){
            context.commit('add',food)
        }
    }
})
