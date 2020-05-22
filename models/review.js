const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Review = new Schema({
    userId: String,
    tourId: String,
    comment: { type: String, min: 1, max: 500 },
    rating: { type: Number, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const model = mongoose.model("Review", Review);

module.exports = {
    type: "mongodb",
    model,
}