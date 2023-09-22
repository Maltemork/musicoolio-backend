"use strict";

//
//  Backend Node.js app for musicoolio website.
//  Talks to azure database, and does cool stuff!
//

// Import Express, FS and CORS.
import express from "express";
import cors from "cors";
import connection from "./database.js";

const app = express();

app.use(express.json());
app.use(cors());

// Default function for printing error or returning results.
function errorResult(err, result, response) {
  if (err) {
    console.log(err);
  } else {
    response.json(result);
  }
}
/* ---------- Routes for Artists ---------- */
// Get request for artists (all, ordered by name)
app.get("/artists", async (request, response) => {
  connection.query("SELECT * FROM artists ORDER BY name;", (err, result) => {
    // print error or respond with result.
    errorResult(err, result, response);
  });
});
/* ---------- Routes for Albums ---------- */
app.get("/artists", async (request, response) => {
  connection.query("SELECT * FROM albums ORDER BY name;", (err, result) => {
    // print error or respond with result.
    errorResult(err, result, response);
  });
});

/* ---------- Routes for Tracks ---------- */
app.get("/artists", async (request, response) => {
  connection.query("SELECT * FROM tracks ORDER BY title;", (err, result) => {
    // print error or respond with result.
    errorResult(err, result, response);
  });
});
