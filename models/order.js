//设计订单表
const mongoose = require('./build')
const Counter = require('./counter')

var Schema = mongoose.Schema

var orderSchema = new Schema({
    id:{
        type: String,
    },
    type:{
        type: String,
        required: true
    },
    good:{
        type: String,
        required: true
    },
    goodNum: {
        type: String,
        required:true
    },
    price: {
        type: String,
        required:true
    },
    state:{
        type: String,
        default: '0'
    }
})

orderSchema.pre('save', function (next) {
    let doc = this;
    Counter.findByIdAndUpdate({ _id: 'cardemo' }, { $inc: { order_id: 1 } }, { new: true, upsert: true }, function (error, counter) {
        if (error)
            return next(error);
        doc.id = counter.order_id;
        next();
    });
});

module.exports = mongoose.model('Order', orderSchema)