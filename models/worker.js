//设计员工表模块
const mongoose = require('./build')
const Counter = require('./counter')

var Schema = mongoose.Schema

var workerSchema = new Schema({

    id:{
        type: String,
    },
    name:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        default: "000000"
    },
    sex: {
        type: String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    join_time:{
        type: Date,
        default: Date.now//不能加括号，要在实例创建时候调用
    }

})

workerSchema.pre('save', function (next) {
    let doc = this;
    Counter.findByIdAndUpdate({ _id: 'cardemo' }, { $inc: { work_id: 1 } }, { new: true, upsert: true }, function (error, counter) {
        if (error)
            return next(error);
        doc.id = counter.work_id;
        next();
    });
});

module.exports = mongoose.model('Worker', workerSchema)