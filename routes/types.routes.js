// starter code in routes/types.routes.js
const router = require("express").Router();

// all your routes here

const Type = require('../models/Type.model.js');


// Get routes to display all the types in the db:

router.get('/types/create', async (req,res) => {
    res.render('types/new-type.hbs');
});

// Post rout to submit info about the created types
router.post('/types/create', async (req,res) => {
    try {
        // Object destructuring with req.body
        // There's always a match between an input's name and a req.body property's name
        const {title, category, description, mode} = req.body;

        await Type.create({title, category, description, mode});
        res.redirect('/types');
    }
    catch (error) {
        console.log(error);
        res.render('types/new-type.hbs')
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
module.exports = router;