"use strict";

// 
//  Backend Node.js app for musicoolio website.
//  Talks to azure database, and does cool stuff!
// 

// Import Express, FS and CORS.
import express from "express";
import cors from "cors";
import connection from "./database.js";

// Default function for printing error or returning results.
function errorResult(err, result, response) {
  if (err) {
    console.log(err);
  } else {
    response.json(result);
  }
}

const app = express();

app.use(express.json());
app.use(cors());

// Get request for artists (all, ordered by name)
app.get("/artists", async (request, response) => {
  connection.query("SELECT * FROM artists ORDER BY name;", (err, result) => {
    // print error or respond with result.
    errorResult(err, result, response);
    });
  });
