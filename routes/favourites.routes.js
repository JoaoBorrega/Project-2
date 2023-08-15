const router = require("express").Router();
const Profile = require("../models/Profile.model.js");

// Require favourites model
const Favourite = require('../models/Favourite.model.js')

//GET route to display all the games in the Db
router.get('/favourites', async (req,res) => {
    try{
        let allFavouritesFromDb = await Profile.find();

        res.render('favourites/favourites.hbs', {profile: allFavouritesFromDb})
    }
    catch(error){
        console.log(error)
    }
})

//GET route for games details
router.get('/favourites/:favouritesId', async (req, res) => {
    try{
        const {Favourite} = req.params;

        let chosenFavourite = await Favourite.findById(favouritesId)
        
        await chosenFavourite.populate('mode');

        res.render('favourites/favourites', {chosenFavourite})
    }
    catch(error){console.log(error)}
})

router.post('/favourites/:favouritesId/favorites/:gameId', async (req, res) => {
    const { favouritesId, gameId } = req.params;

    try {
        const favourites = await Favourite.findById(favouritesId);
        if (!favourites) {
            return res.status(404).send("Favourites not found");
        }

        // Assuming gameId is a valid ObjectId of a Game document
        if (!favourites.favoriteGames.includes(gameId)) {
            favourites.favoriteGames.push(gameId);
            await favourites.save();
            return res.redirect(`/profile/${profileId}`);
        } else {
            return res.status(400).send("Game already in favorites");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
});

module.exports = router;