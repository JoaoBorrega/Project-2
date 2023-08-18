const {Schema, model} = require('mongoose');

const reviewSchema = new Schema({
    content: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    game: {
        type: Schema.Types.ObjectId,
        ref: 'Game'
    },
});

const Review = model("Review", reviewSchema);

module.exports = Review;
