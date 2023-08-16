// starter code in routes/games.routes.js
const router = require("express").Router();

// all your routes here

const Game = require('../models/Game.model.js');

// Require Type model
const User = require('../models/User.model.js')

const Review = require('../models/Review.model.js')


/* REVIEWS ACTIONS */
router.post('/review/create/:gameId', async(req,res)=>{
    try{
        const {gameId} = req.params;
        const user = req.session.currentUser

        const {content} = req.body;

        const newReview = await Review.create({content});

        // update the Book with new review that was created
        const gameUpdate = await Game.findByIdAndUpdate(gameId, {$push: {reviews: newReview._id}});

        // add the review to the user
        const userUpdate = await User.findByIdAndUpdate(user._id, {$push: {reviews: newReview._id}});
        const reviewUpdate = await Review.findByIdAndUpdate(newReview._id, {$push: {author: user._id}});

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