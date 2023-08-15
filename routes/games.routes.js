// starter code in routes/games.routes.js
const router = require("express").Router();

// all your routes here

const Game = require('../models/Game.model.js');

// Require Type model
const Type = require('../models/Type.model.js')


// Get routes to display all the games in the db:

router.get('/games/create', async (req,res) => {
    try{
        let allTypesFromDb = await Type.find()
        res.render('games/new-game.hbs', {types: allTypesFromDb})
    }
    catch(error){console.log(error)}
})

router.post('/games/create', async (req,res)=>{
    try{
        const {title, category, description, review, mode} = req.body;
        await Game.create({title, category, description, review, mode})
        res.redirect('/games');
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

        let chosenGame = await Game.findById(gameId).populate('mode');

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

        let allTypesFromDb = await Type.find()

        res.render('games/edit-game', {game: chosenGame, types: allTypesFromDb})

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

// Add to favourites

router.post('/games/addFavs/:gameId/', async (req, res) => {
    const {gameId} = req.params;
    const currentUser = req.session.currentUser;
    try{
        await User.findById(currentUser);
        await User.findByIdAndUpdate(currentUser._id, {$push: {favourites:gameId}})
        res.redirect('/favourites')
    }
 catch (error) {
    console.log(error);
  }
}) 
// Delete from favourites

router.post('/games/delFavs/:gameId/', async (req, res) => {
    const {gameId} = req.params;
    const currentUser = req.session.currentUser;
    try{
        await User.findById(currentUser);
        await User.findByIdAndUpdate(currentUser._id, {$pull: {favourites:gameId}})
        res.redirect('/favourites')
    }
 catch (error) {
    console.log(error);
  }
}) 



module.exports = router;