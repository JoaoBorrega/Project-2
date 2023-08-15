const express = require('express');
const router = express.Router();

// Require favorites model
const Favorite = require('../models/Favorite.model.js')

// Route to display all the user's favorite games
router.get('/', async (req, res) => {
    try {
        const allFavoritesFromDb = await Favorite.find();
        res.render('favorites/favorites.hbs', { favoriteGames: allFavoritesFromDb });

    } catch (error) {
        console.log(error);
    }
});

// POST route to add a game to favorites
router.post('/', async (req, res) => {
    try {
        const { title, category, description, review, mode } = req.body;
        const newFavorite = new Favorite({ title, category, description, review, mode });
        await newFavorite.save();
        res.redirect('/favorites');
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;