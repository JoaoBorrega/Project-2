// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");


// Add this line to import the 'path' module
const path = require('path');


// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalize = require("./utils/capitalize");
const projectName = "gameVerse";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

/* const Type = require('./routes/types.routes');
app.use('/', Type); */

const game = require('./routes/games.routes');
app.use('/', game);

const profile = require("./routes/profile.routes");
app.use('/', profile);


/* const favoriteRoutes = require('./routes/favorites.routes');
app.use('/', favoriteRoutes); */

const reviewsRoutes = require('./routes/reviews.routes')
app.use('/', reviewsRoutes)

// Set up the views directory and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
