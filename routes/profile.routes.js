// starter code in routes/games.routes.js
const router = require("express").Router();

// Require Profile model
const Profile = require('../models/Profile.model.js')

//GET route to display all the games in the Db
router.get('/profile', async (req,res) => {
    try{
        let allProfilesFromDb = await Profile.find();

        res.render('profile/profile-details.hbs', {profile: allProfilesFromDb})
    }
    catch(error){
        console.log(error)
    }
})

//GET route for games details
router.get('/profile/:profileId', async (req, res) => {
    try{
        const {profileId} = req.params;

        let chosenProfile = await Profile.findById(profileId)
        
        await chosenProfile.populate('mode');

        res.render('profile/profile', {chosenProfile})
    }
    catch(error){console.log(error)}
})

router.post('/profile/:profileId/favorites/:gameId', async (req, res) => {
    const { profileId, gameId } = req.params;

    try {
        const profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).send("Profile not found");
        }

        // Assuming gameId is a valid ObjectId of a Game document
        if (!profile.favoriteGames.includes(gameId)) {
            profile.favoriteGames.push(gameId);
            await profile.save();
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