//设计汽车组件表
const mongoose = require('./build')
const Counter = require('./counter')

var Schema = mongoose.Schema

var partSchema = new Schema({
    id:{
        type: String,
    },
    type:{
        type: String,
        required: true
    },
    modelString: {
        type: String,
        required:true
    },
    price: {
        type: String,
        required:true
    }
})

partSchema.pre('save', function (next) {
    let doc = this;
    Counter.findByIdAndUpdate({ _id: 'cardemo' }, { $inc: { part_id: 1 } }, { new: true, upsert: true }, function (error, counter) {
        if (error)
            return next(error);
        doc.id = counter.part_id;
        next();
    });
});

module.exports = mongoose.model('Part', partSchema)