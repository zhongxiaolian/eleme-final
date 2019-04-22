const path = require('path')
const express = require('express')
// 拿到数据
var eleData = require('./data.json')
var seller = eleData.seller
var goods = eleData.goods
var ratings = eleData.ratings

var count = 1                              // 给每个food加上id
for(let i  = 0; i<goods.length; i++){
    for(let j = 0; j<goods[i].foods.length ;j++){
        goods[i].foods[j]['id'] = count++;
    }
}


// 编写路由
var apiRoutes = express.Router()
apiRoutes.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  })
})
apiRoutes.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  })
})
apiRoutes.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  })
})

module.exports = {
    configureWebpack: config => {

        // 生产环境和开发环境通用的配置
        config.resolve.alias = {
            'components': path.join(__dirname,'src/components'),
            // 图片或者样式等资源使用别名时需要在前面加上~
            'common': path.join(__dirname,'src/common')
        }

        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
          
        } else {
            // 为开发环境修改配置...
            config.devServer = {
                before(app){
                    app.use('/api',apiRoutes);
                }                        
            }              
        }
    }
}