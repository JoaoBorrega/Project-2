// starter code in routes/games.routes.js
const router = require("express").Router();

// all your routes here

const Game = require('../models/Game.model.js');
const User = require('../models/User.model.js');

const multer = require('multer');

// Get routes to display all the games in the db:

router.get('/games/create', async (req,res) => {
    try{
        let allGamesFromDb = await Game.find()
        res.render('games/new-game.hbs', {games: allGamesFromDb})
    }
    catch(error){console.log(error)}
})

router.post('/games/create', async (req,res)=>{
    try{
        const {title, category, description, mode} = req.body;
        let newGame = await Game.create({title, category, description, mode})

        res.redirect(`/games/${newGame._id}`);
    }
    catch(error){
        console.log(error)
        res.render('games/new-game.hbs')
    }
})

//GET route to display all the games in the Db
router.get('/games', async (req,res) => {
    try{
        let allGamesFromDb = await Game.find();

        res.render('games/games.hbs', {games: allGamesFromDb})
    }
    catch(error){
        console.log(error)
    }
})

//GET route for games details
router.get('/games/:gameId', async (req, res) => {
    try{
        const {gameId} = req.params;

        let chosenGame = await Game.findById(gameId).populate('reviews')
        await chosenGame.populate({
            path: "reviews",
            populate: {
                path: "author",
                model:"User"
            }
        })

        console.log(chosenGame)

        res.render('games/game-details', chosenGame)
    }
    catch(error){console.log(error)}
})

//Delete
router.post('/games/:gameId/delete', async (req, res) => {
    try{
        const {gameId} = req.params;
        await Game.findByIdAndRemove(gameId);
        res.redirect('/games')
    }
catch(error){console.log(error)}
});


//Update existing game
router.get('/games/:gameId/edit', async (req, res) => {
    try{
        const {gameId} = req.params;

        let chosenGame = await Game.findById(gameId)

        let allGamesFromDb = await Game.find()

        res.render('games/edit-game', {game: chosenGame, games: allGamesFromDb})

    }
    catch(error){
        console.log(error);
    }
})

router.post('/games/:gameId/edit', async (req, res) => {
    try{
        const {gameId} = req.params;
        const {title, category, description, review, mode} = req.body;
        await Game.findByIdAndUpdate(gameId, {title, category, description, review, mode}, {new: true});
        res.redirect(`/games/${gameId}`);
    }
    catch(error){

    }
})

// add favorites
router.post("/addFavorites/:gameId",async (req, res)=>{
    try {
        const {gameId} = req.params;
        const user = req.session.currentUser

        await User.findByIdAndUpdate(user._id, {$push: {favorites: gameId}})

        res.redirect(`/favorites`);

    } catch (error) {
        console.log(error)
    }
})

// Remove favorites
router.post("/removeFavorites/:gameId",async (req, res)=>{
    try {
        const {gameId} = req.params;
        const user = req.session.currentUser

        await User.findByIdAndUpdate(user._id, {$pull: {favorites: gameId}})
        res.redirect(`/favorites`);
    } catch (error) {
        console.log(error)
    }
})

router.get('/favorites', async (req, res) => {
    try {
        const user = req.session.currentUser

        const userInfo = await User.findById(user._id).populate('favorites')
        console.log(userInfo)

        res.render('favorites/favorites', userInfo)
        
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;