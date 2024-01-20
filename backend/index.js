import express from "express";
import mongoose from "mongoose";
import bookRoutes from "./routes/booksRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: ".././config.env" });
const PORT = process.env.PORT || 2000;
const App = express();

//Middleware for parsing request post body
App.use(express.urlencoded({ extended: true }));
App.use(express.json());

//Middleware
App.use(cors());

App.get("/", (req, res) => {
  res.send("Nothing!");
});

//Middleware
App.use("/Books", bookRoutes);

mongoose
  .connect(process.env.dbUrl)
  .then(() => {
    App.listen(PORT, () => {
      console.log(`running on ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
