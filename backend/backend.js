"use strict";

// Import Express, FS and CORS.
import express from "express";
import cors from "cors";
import connection from "./database.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/artists", async (request, response) => {
  connection.query("SELECT * FROM artists ORDER BY name;", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      response.json(results);
    }
  });
});

app.listen(3306, () => {
  console.log("Server is running on port 3306");
});
