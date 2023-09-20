"use strict";

// Import Express, FS and CORS.
import express from "express";
import fs from "fs/promises";
import cors from "cors";

// Define app.
const app = express();

// Use express and cors.
app.use(express.json());
app.use(cors({ credentials: true, origin: true }))


// Response when testing if server is alive.
app.get("/", (request, response) => {
    response.send("Hi there! All is well.")
})


// Get request for /artists (.json of artists)
app.get("/artists", async (request, response) => {
    // Read the JSON file.
    const data = await fs.readFile("artists.json");
    // Parse the data
    const artists = await JSON.parse(data);
    // Return the JSON data.
    return response.json(artists);
    });

// Get request for a specific artist ID.
app.get("/artists/random", async (request, response) => {
  // Read the JSON file.
  const data = await fs.readFile("artists.json");
  // Parse the data
  const artists = await JSON.parse(data);
  // Get a random object from artists array.
  const randomArtist = artists[Math.floor(Math.random()*artists.length)]; 
  // Return the random JSON object.
  return response.json(randomArtist);
});

app.get("/artists/:id", async (request, response) => {
  // Define ID.
    const id = Number(request.params.id);
    const data = await fs.readFile("artists.json");
    const artists = await JSON.parse(data);
    const result = await artists.find(artist => artist.id == id);
    response.json(result);
    });


// POST request for new Artist submission
app.post("/artists", async (request, response) => {
    // Define the body of the POST-request.
    const newArtist = request.body;
    // Give it a unique ID.
    newArtist.id = new Date().getTime();
    // Read the JSON file and define it as data.
    const data = await fs.readFile("artists.json");
    // Parse the JSON data.
    const artists = await JSON.parse(data);
    // Push new artist into the JSON data.
    artists.push(newArtist);
    // Rewrite the JSON file so that it now include the new artist.
    await fs.writeFile("artists.json", JSON.stringify(artists));
    // Respond with new JSON file.
    response.json(artists);
    console.log(`${newArtist.name} has been added to the server.`)
  });

// DELETE request for a specific artist.
app.delete("/artists/:id", async (request, response) => {
    // Find specific ID for object which needs to be deleted.
    const id = request.params.id;
    // Console.log the ID.
    console.log(`System received a request to deleted artist ID ${id}`);
    
    // Read the JSON file containing all artist.
    const data = await fs.readFile("artists.json");
    // Parse the JSON file.
    const artists = await JSON.parse(data);
    
    // Make an array with every artist who does NOT have an ID equal to the deleted ID.
    const newArtists = artists.filter(artist => artist.id != id);
    console.log(`Artist has been deleted from array.`);
  
    // Write the new array into the artists.json file.
    fs.writeFile("artists.json", JSON.stringify(newArtists));
    console.log(`Rebuilding artists.json file.`)
    
    
    // Respond with the updated artists array.
    response.json(artists);
  });

// PUT request received by server.
app.put("/artists/:id", async (request, response) => {
  // Define ID of object.
  const id = request.params.id;
  // Define where we store JSON file and read the file.
  const data = await fs.readFile("artists.json");
  // Define all artists array.
  const artists = await JSON.parse(data);
  // Find artist which needs to be sorted based on unique ID.
  let artistToUpdate = await artists.find(artist => artist.id == id);
  // Define the body of the request which will replace the values JSON file.
  const body = request.body;
  // Change the values.
  artistToUpdate.name = body.name;
  artistToUpdate.birthdate = body.birthdate;
  artistToUpdate.activeSince = body.activeSince;
  artistToUpdate.genres = body.genres;
  artistToUpdate.label = body.label;
  artistToUpdate.website = body.website;
  artistToUpdate.image = body.image;
  artistToUpdate.shortDescription = body.shortDescription;
  artistToUpdate.favorite = body.favorite;
  // Overwrite original array.
  await fs.writeFile("artists.json", JSON.stringify(artists));
  response.json();
});


// Server port 8801 listen.
app.listen(8801, () => {
console.log("Kører på http://localhost:8801");
});


  