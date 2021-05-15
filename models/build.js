//数据库的配置
const mongoose = require('mongoose')

const DB_PATH = 'mongodb://localhost/carpackdemo'//数据库的地址

mongoose.connect(DB_PATH, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose