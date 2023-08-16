const {Schema, model} = require('mongoose');

const reviewSchema = new Schema({
    content: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


const Review = model("Review", reviewSchema);

module.exports = Review;
