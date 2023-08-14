const {Schema, model} = require('mongoose');

const gameSchema = new Schema({
    title: String,
    category: String,
    description: String,
    review: String,
    mode: [
        {
            type: Schema.Types.ObjectId,
            ref: 'type'
        }
    ],
});

module.exports = model('Game', gameSchema);