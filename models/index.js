//连接数据库和设计表模块
const Worker =require('./worker') 
const Admin =require('./admin') 
const Part = require('./part')
const Car = require('./car')
const Order = require('./order')

module.exports = {Worker,Admin,Part,Car,Order}
