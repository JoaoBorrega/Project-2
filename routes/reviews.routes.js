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

        // update the Review with new review that was created
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

        const gameUpdate = await Game.findByIdAndUpdate(
            removedReview.game,
            { $pull: { reviews: reviewId } }
        );

        await User.findByIdAndUpdate(removedReview.author, {
            $pull: {reviews: removedReview._id}
        })

        res.redirect('/reviews');
    }
    catch(error){
        console.log(error);
    }
});

// add Reviews
router.post("/addReviews/:gameId",async (req, res)=>{
    try {
        const {gameId} = req.params;
        const user = req.session.currentUser

        await User.findByIdAndUpdate(user._id, {$push: {reviews: gameId}})

        res.redirect(`/reviews`);

    } catch (error) {
        console.log(error)
    }
})
/*
// Remove reviews
router.post("/removeReviews/:reviewId",async (req, res)=>{
    const {reviewId} = req.params;
    try {
        const user = req.session.currentUser

        await User.findByIdAndUpdate(user._id, {
            $pull: {reviews: reviewId}})

        res.redirect(`/reviews`);
    } catch (error) {
        console.log(error)
    }
})
*/
router.get('/reviews', async (req, res) => {
    try {
        const user = req.session.currentUser
        if(user){
            // Find the user by their ID and populate their reviews
            const userInfo = await User.findById(user._id).populate('reviews')
            // Populate the 'reviews' field within each review
            await userInfo.populate('reviews')
            
            // Render the 'reviews/reviews' template with the reviews and usertitle
            res.render('reviews/reviews', { reviews: userInfo.reviews,usertitle: userInfo.usertitle })
        }
        else{
            res.redirect('/')
        }
        
        
    } catch (error) {
        console.log(error)
    }
})
module.exports = router;
