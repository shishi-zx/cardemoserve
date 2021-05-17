//数据库的配置
const mongoose = require('mongoose')

const DB_PATH = 'mongodb://root:root@localhost:27017/carpackdemo?authSource=admin'//数据库的地址
// const DB_PATH = 'mongodb://39.106.194.73:27017/carpackdemo'//数据库的地址

mongoose.connect(DB_PATH, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose