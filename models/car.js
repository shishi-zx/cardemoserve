//设计汽车表
const mongoose = require('./build')
const Counter = require('./counter')

var Schema = mongoose.Schema

var carSchema = new Schema({
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
    size:{
        type:String,
        required:true
    },
    price: {
        type: String,
        required:true
    }
})

carSchema.pre('save', function (next) {
    let doc = this;
    Counter.findByIdAndUpdate({ _id: 'cardemo' }, { $inc: { car_id: 1 } }, { new: true, upsert: true }, function (error, counter) {
        if (error)
            return next(error);
        doc.id = counter.car_id;
        next();
    });
});

module.exports = mongoose.model('Car', carSchema)