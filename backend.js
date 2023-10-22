"use strict";

//
//  Backend Node.js app for musicoolio website.
//  Talks to azure database, and does cool stuff!
//

// Import Express, FS and CORS.
import express, { query } from "express";
import cors from "cors";
import connection from "./database.js";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT);

console.log("Hej! Det kører");

app.get("/", (req, res) => res.json({ message: "It works!" }));

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
app.delete("/artists/:id", async (request, response) => {
  const id = request.params.id;
  const query = "DELETE FROM artists WHERE artistId=?;";
  const values = [id];

  connection.query(query, values, (error, results) => {
    errorResult(error, results, response);
  });
});
app.post("/artists", async (request, response) => {
  const reqBody = request.body;
  connection.query(
    "INSERT INTO artists(name, birthdate, activeSince, labels, website, genres, shortDescription, image) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
    [
      reqBody.name,
      reqBody.birthdate,
      reqBody.activeSince,
      reqBody.labels,
      reqBody.website,
      reqBody.genres,
      reqBody.shortDescription,
      reqBody.image,
    ],
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
app.get("/artists/random", async (request, response) => {
  connection.query(
    "SELECT * FROM artists ORDER BY RAND() LIMIT 1",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        response.json(result[0]);
      }
    }
  );
});
app.post("/artists/:artistId/addAlbum/:albumId", async (request, response) => {
  const artistId = request.params.artistId;
  const albumId = request.params.albumId;
  connection.query(
    "INSERT INTO artists_albums (artistId, albumId) VALUES (?, ?)",
    [artistId, albumId],
    (err, result) => {
      // print error or respond with result.
      errorResult(err, result, response);
    }
  );
});
/* ---------- Routes for Albums ---------- */

app.get("/albums", async (request, response) => {
  connection.query("SELECT * FROM albums ORDER BY title;", (err, result) => {
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
    "INSERT INTO albums(title, releaseDate, albumArt, artistName) VALUES(?, ?, ?, ?)",
    [reqBody.title, reqBody.releaseDate, reqBody.albumArt, reqBody.artistName],
    async (err, result) => {
      // print error or respond with result.
      if (err) {
        errorResult(err, result, response);
      } else {
        const albumId = result.insertId;

        connection.query(
          "SELECT artistId FROM artists WHERE name = ?",
          [reqBody.artistName],
          (err, artistResult) => {
            if (err) {
              errorResult(err, result, response);
            } else if (artistResult.length === 0) {
              console.log(artistResult);
              console.log("Could not find Artist");
            } else {
              const artistId = artistResult[0].artistId;

              connection.query(
                "INSERT INTO artists_albums(artistId, albumId) VALUES(?, ?)",
                [artistId, albumId],
                (err, result) => {
                  errorResult(err, result, response);
                }
              );
            }
          }
        );
      }
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
app.post("/albums/:albumId/addTrack/:trackId", async (request, response) => {
  const albumId = request.params.albumId;
  const trackId = request.params.trackId;
  connection.query(
    "INSERT INTO albums_tracks (albumId, trackId) VALUES (?, ?)",
    [albumId, trackId],
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
    "INSERT INTO tracks(title, releaseDate, duration, trackNo, artistName) VALUES(?, ?, ?, ?, ?)",
    [
      reqBody.title,
      reqBody.releaseDate,
      reqBody.duration,
      reqBody.trackNo,
      reqBody.artistName,
    ],
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
app.post("/tracks/:trackId/addArtist/:artistId", async (request, response) => {
  const trackId = request.params.trackId;
  const artistId = request.params.artistId;
  connection.query(
    "INSERT INTO track_artists(trackId, artistId) VALUES (?, ?)",
    [trackId, artistId],
    (err, result) => {
      // print error or respond with result.
      errorResult(err, result, response);
    }
  );
});

/* ---------- Search ---------- */

app.get("/:table/search/:column/:searchValue", async (request, response) => {
  const table = request.params.table;
  const column = request.params.column;
  const searchValue = `%${request.params.searchValue}%`;
  const query = `SELECT * FROM ${table} WHERE ${column} LIKE ?`;
  connection.query(query, [searchValue], (err, result) => {
    // print error or respond with result.
    errorResult(err, result, response);
  });
});
