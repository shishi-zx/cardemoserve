const mongoose = require('./build')
const CounterSchema = mongoose.Schema({
    _id: { type: String, required: true },
    work_id: { type: Number, default: 0 },
    part_id: { type: Number, default: 0 },
    car_id: { type: Number, default: 0 },
    order_id: { type: Number, default: 0 }
});

module.exports = mongoose.model('counter', CounterSchema);