// starter code in routes/games.routes.js
const router = require("express").Router();

// all your routes here

const Game = require('../models/Game.model.js');

// Require Type model
const Profile = require('../models/Profile.model.js')

const Review = require('../models/Game.model.js')


/* REVIEWS ACTIONS */
router.post('/review/create/:gameId', async(req,res)=>{
    try{
        const {gameId} = req.params;

        const {content, author} = req.body;

        const newReview = await Review.create({content, author});

        // update the Book with new review that was created
        const gameUpdate = await Game.findByIdAndUpdate(gameId, {$push: {reviews: newReview._id}});

        // add the review to the user
        const userUpdate = await User.findByIdAndUpdate(author, {$push: {reviews: newReview._id}});

        res.redirect(`/games/${gameId}`);

    }
    catch(error){
        console.log(error);
    }
});

router.post('/review/delete/:reviewId', async (req,res)=>{
    const {reviewId} = req.params; 
    try{
        const removedReview = await Review.findByIdAndRemove(reviewId);

        await User.findByIdAndUpdate(removedReview.author, {
            $pull: {reviews: removedReview._id}
        })

        res.redirect('/games');
    }
    catch(error){
        console.log(error);
    }
});

module.exports = router;