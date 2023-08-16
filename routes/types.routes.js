// starter code in routes/types.routes.js
const router = require("express").Router();

// all your routes here

const Type = require('../models/Type.model.js');


// GET route for displaying type details
router.get('/types/:id', async (req, res) => {
    try {
        const typeId = req.params.id;
        const chosenType = await Type.findById(typeId).populate('games');
        res.render('types/type-details.hbs', { chosenType });
    } catch (error) {
        console.log(error);
        res.redirect('/types');
    }
});

//GET route to display all the types in the Db
router.get('/types', async (req,res) => {
    try{
        let alltypesFromDb = await Type.find();
        console.log(alltypesFromDb)

        let strategyGames = alltypesFromDb.filter(element => element.mode === "Strategy");
        let rpgGames = alltypesFromDb.filter(element => element.mode === "RPG");
        let sportsGames = alltypesFromDb.filter(element => element.mode === "Sports");
        let actionGames = alltypesFromDb.filter(element => element.mode === "Action");

        res.render('types/types.hbs', {
            types: alltypesFromDb,
            strategyGames,
            rpgGames,
            sportsGames,
            actionGames
        });
    }
    catch(error){
        console.log(error)
    }
})


// Route for editing a type
router.get('/types/:id/edit', async (req, res) => {
    try {
        const typeId = req.params.id;
        const chosenType = await Type.findById(typeId);
        res.render('types/edit-type.hbs', { chosenType });
    } catch (error) {
        console.log(error);
        res.redirect('/types');
    }
});

// Route for updating a type
router.post('/types/:id/edit', async (req, res) => {
    try {
        const typeId = req.params.id;
        res.redirect(`/types/${typeId}`);
        
    } catch (error) {
        console.log(error);
        res.redirect('/types');
    }
});

// Route for deleting a type
router.post('/types/:id/delete', async (req, res) => {
    try {
        const typeId = req.params.id;
        // Handle the delete logic here
        res.redirect('/types');
    } catch (error) {
        console.log(error);
        res.redirect('/types');
    }
});

module.exports = router;