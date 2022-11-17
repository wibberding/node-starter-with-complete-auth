import cors from "cors";
import consola from "consola";
import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";

// Router Exports
import userApis from "./apis/users";

// Initialize express application
const app = express();

// Apply application middlewares
app.use(cors());
app.use(json({ type: 'application/json' }));

// Routes
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

