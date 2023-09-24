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
  connection.query(
    "SELECT * FROM artists ORDER BY name;", (err, result) => {
    // print error or respond with result.
    errorResult(err, result, response);
  });
});
app.delete("/artists/:id", async (request, response) => {
  const reqArtistId = request.params.id; //.artistId?
  connection.query(
    "DELETE FROM artists WHERE artistId = ?",
    [reqArtistId],
    errorResult(err, results, response)
  );
});
app.post("/artists", async (request, response) => {
  const reqBody = request.body;
  connection.query(
    "INSERT INTO artists(name, birthdate) VALUES(?, ?)",
    [reqBody.name, reqBody.birthdate],
    (err, result) => {
      // print error or respond with result.
      errorResult(err, result, response);
    }
  );
});
app.put("/artists/:id", async (request, response) => {
  const reqArtistId = request.params.id;
  const reqBody = request.body;
  connection.query(
    "UPDATE artists SET name = ?, birthdate = ? WHERE artistId = ?",
    [reqBody.name, reqBody.birthdate, reqArtistId],
    (err, result) => {
      // print error or respond with result.
      errorResult(err, result, response);
    }
  );
});

/* ---------- Routes for Albums ---------- */

app.get("/albums", async (request, response) => {
  connection.query( 
  "SELECT * FROM albums ORDER BY name;", (err, result) => {
    // print error or respond with result.
    errorResult(err, result, response);
  });
});
app.delete("/albums/:id", async (request, response) => {
  const reqArtistId = request.params.id; //.albumId?
  connection.query(
    "DELETE FROM albums WHERE albumId = ?",
    [reqArtistId],
    errorResult(err, results, response)
  );
});
app.post("/albums", async (request, response) => {
  const reqBody = request.body;
  connection.query(
    "INSERT INTO albums(title, duration, releaseDate) VALUES(?, ?, ?)",
    [reqBody.title, reqBody.duration, reqBody.releaseDate],
    (err, result) => {
      // print error or respond with result.
      errorResult(err, result, response);
    }
  );
});
app.put("/albums/:id", async (request, response) => {
  const reqArtistId = request.params.id;
  const reqBody = request.body;
  connection.query(
    "UPDATE albums SET title = ?, duration = ?, releaseDate = ? WHERE albumId = ?",
    [reqBody.title, reqBody.duration, reqBody.releaseDate, reqArtistId],
    (err, result) => {
      // print error or respond with result.
      errorResult(err, result, response);
    }
  );
});

/* ---------- Routes for Tracks ---------- */

app.get("/tracks", async (request, response) => {
  connection.query("SELECT * FROM tracks ORDER BY title;", (err, result) => {
    // print error or respond with result.
    errorResult(err, result, response);
  });
});
app.delete("/tracks/:id", async (request, response) => {
  const reqArtistId = request.params.id; //.trackId?
  connection.query(
    "DELETE FROM tracks WHERE trackId = ?",
    [reqArtistId],
    errorResult(err, results, response)
  );
});
app.post("/tracks", async (request, response) => {
  const reqBody = request.body;
  connection.query(
    "INSERT INTO tracks(title, duration, releaseDate) VALUES(?, ?, ?)",
    [reqBody.title, reqBody.duration, reqBody.releaseDate],
    (err, result) => {
      // print error or respond with result.
      errorResult(err, result, response);
    }
  );
});
app.put("/tracks/:id", async (request, response) => {
  const reqArtistId = request.params.id;
  const reqBody = request.body;
  connection.query(
    "UPDATE tracks SET title = ?, duration = ?, releaseDate = ? WHERE artistId = ?",
    [reqBody.title, reqBody.duration, reqBody.releaseDate, reqArtistId],
    (err, result) => {
      // print error or respond with result.
      errorResult(err, result, response);
    }
  );
});