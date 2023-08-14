const {Schema, model} = require('mongoose');

const gameSchema = new Schema({
    title: String,
    category: String,
    description: String,
    review: String,
});

module.exports = model('Game', gameSchema);