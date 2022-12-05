import cors from "cors";
import consola from "consola";
import express from "express";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser"
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import path from "path";
import flash from "connect-flash";
import headerAdder from "./middleware/header-adder";

 
// Router Imports
import userApis from "./apis/users";


// Initialize express application
const app = express();


app.use(cookieParser('keyboard kat'));
app.use(session({
  secret: 'keyboard kfasdfat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(flash());


// Adds Handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(passport.initialize());
// Import Passport middleware
require("./middleware/passport-middleware");

// Apply application middlewares
app.use(cors());
app.use(express.json());
app.use(headerAdder);
app.use('/assets', express.static(path.join(__dirname, '/public')));


//  Require routes
var homeRoutes = require('./routes/home');
var notificationRoutes = require('./routes/notifications');
var sessionRoutes = require('./routes/session');
var accountRoutes = require('./routes/account');

//  Define routes...
app.use('/', homeRoutes);
app.use('/', notificationRoutes);
app.use("/users", userApis);
app.use('/session', sessionRoutes);
app.use('/account', accountRoutes);


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

