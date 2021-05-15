//设计员工表模块
const mongoose = require('./build')

var Schema = mongoose.Schema

var adminSchema = new Schema({
    admin:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


module.exports = mongoose.model('Admin', adminSchema)