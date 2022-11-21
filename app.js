import cors from "cors";
import consola from "consola";
import express from "express";
import { engine } from 'express-handlebars';
import mongoose from "mongoose";
import passport from "passport";

// Router Imports
import userApis from "./apis/users";

// Import Passport middleware
require("./middleware/passport-middleware");

// Initialize express application
const app = express();

// Adds Handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');


// Apply application middlewares
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

//  Require routes
var homeRoutes = require('./routes/home');
var notificationRoutes = require('./routes/notifications');
var sessionRoutes = require('./routes/session');


//  Define routes...
app.use('/', homeRoutes);
app.use('/', notificationRoutes);
app.use('/session', sessionRoutes);
app.use("/users", userApis);


// Import application constants.
import { DB, PORT } from "./constants";
const main = async () => {
  try {
    // Connect with the database.
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    consola.success("Database connected ...")
    // Start application listening for request from server.
    app.listen(PORT, () => consola.success(`Server started on port ${PORT}`));
  } catch (err) {
    consola.error(`Unable to start the server \n${err.message}`);
  }
};

main();

