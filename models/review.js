const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Review = new Schema({
    _id: String,
    userId: String,
    tourId: String,
    comment: String,
    rating: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const model = mongoose.model("Review", Review);
const doc = new model();
await doc.save();