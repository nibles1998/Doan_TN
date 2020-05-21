const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Review = new Schema({
    userId: String,
    tourId: String,
    comment: String,
    rating: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const model = mongoose.model("Review", Review);

module.exports = {
    type: "mongodb",
    model,
}
// tương tự đọc comment bên model Bill
// const doc = new model();
// await doc.save();