const {Schema, model} = require('mongoose');

const typeSchema = new Schema({
    title: String,
    category: String,
    description: String,
    review: String,
    mode: {
        type: String,
        enum: ['RPG', 'Action', 'Sports', 'Strategy']
    },
});

module.exports = model('Type', typeSchema);