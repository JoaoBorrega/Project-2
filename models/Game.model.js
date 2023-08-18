const {Schema, model} = require('mongoose');

const gameSchema = new Schema({
    title: String,
    category: String,
    description: String,
    review: String,
    mode: {
        type: String,
        enum: ['RPG', 'Action', 'Sports', 'Strategy']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
         type: Schema.Types.ObjectId, 
         ref: 'Review'
        }
     ],
     image: String,
     imageURL: String
});

module.exports = model('Game', gameSchema);