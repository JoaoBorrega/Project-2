const {Schema, model} = require('mongoose');

const profileSchema = new Schema({
    username: String,
    email: String,
    password: String,
    review: String,
    favoriteGames: [{
        type: String,
        ref: 'Game'
    }]
});


module.exports = model('Profile', profileSchema);