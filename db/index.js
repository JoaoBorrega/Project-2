// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder title was upon the creation of the app

const MONGO_URI =
  "mongodb+srv://joaoborrega18:qru1wqUQZueFv19v@cluster0.2qjxjzw.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const databasetitle = x.connections[0].title;
    console.log(`Connected to Mongo! Database title: "${databasetitle}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
