const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bill = new Schema({
    userId: String,
    tourId: String,
    child: Number,
    adult: Number,
    price: Number,
    total: Number,
    hasPaied: Boolean,
    hasCancel: Boolean,
    paiedDate: Date,
    applyDate: Date,
    paymentMethod: Array,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const model = mongoose.model("Bill", Bill);

module.exports = {
    type: "mongodb",
    model,
}