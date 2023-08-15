const {Schema, model} = require('mongoose');

const favoritesSchema = new Schema({
    title: String,
    category: String,
    description: String,
    review: String,
    mode: {
        type: String,
        enum: ['RPG', 'Action', 'Sports', 'Strategy']
    },
});

module.exports = model('Favorite', favoritesSchema);