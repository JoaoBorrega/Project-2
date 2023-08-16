// starter code in routes/games.routes.js
const router = require("express").Router();

// Require Profile model
const User = require('../models/User.model.js')


//GET route for games details
router.get('/profile', async (req, res) => {
    try{
        const user = req.session.currentUser;

        let chosenProfile = await User.findById(user._id)
        
        // await chosenProfile.populate('mode');

        res.render('profile/profile', chosenProfile)
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