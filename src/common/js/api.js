import axios from 'axios';

export function getFoodById(id){
    return new Promise((resolve,reject)=>{
        axios.get('/api/goods').then((response)=>{
            let data = response.data;
            let goods = null;
            let food = null;
            if(data.errno === 0){
                goods = data.data;
                for(let i=0;i<goods.length;i++){
                    for(let j=0;j<goods[i].foods.length;j++){
                        if(parseInt(id) === goods[i].foods[j].id){
                            food = goods[i].foods[j]
                        }
                    }
                }
                resolve(food);
            }else{
                reject();
            }
        })       
    })
}

export function getSellerRatings(){
    return new Promise((resolve,reject)=>{
        axios.get('/api/ratings').then((response)=>{
            let data = response.data;
            if(data.errno === 0){
                resolve(data.data);
            }
        })
    })
}