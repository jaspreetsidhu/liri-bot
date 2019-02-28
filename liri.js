// required libraries
require("dotenv").config();
let fs = require("fs");
let moment = require("moment");
let axios = require("axios");
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);

//pull in required variables
const spotifyTest = process.env.SPOTIFY_ID;
let command = process.argv[2];
let searchTerm = process.argv[3];

fs.appendFile("log.txt", `${command},`, err => {
  if (err) throw err;
});

switch (command) {
  case "concert-this": //bands in town
    searchForBandsInTown(searchTerm);
    break;
  case "spotify-this-song": //spotify
    spotifyThisSong(searchTerm);
    break;
  case "movie-this": // OMDB for movies
    movieThis(searchTerm);
    break;
  case "do-what-it-says": //  read commands from a file and excute the commands above
    doRandom();
    break;
}

function searchForBandsInTown(artist) {
  const queryUrl = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;
  axios
    .get(queryUrl)
    .then(({ data }) => {
      if (data[0].venue != undefined) {
        console.log(`Event Veunue: ${data[0].venue.name}`);
        console.log(`Event Location: ${data[0].venue.city}`);
        const eventDateTime = moment(data[0].datetime);
        console.log(
          `Event Date & Time: ${eventDateTime.format("dddd, MMMM Do YYYY")}`
        );
      } else {
        console.log("No results found.");
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function spotifyThisSong(song) {
  spotify
    .search({ type: "track", query: song })
    .then(({ tracks }) => {
      if (tracks.total === 0) {
        errorConditionForSpotify();
      } else {
        console.log(`Artist: ${tracks.items[0].artists[0].name}`);
        console.log(`Track: ${tracks.items[0].name}`);
        console.log(`Preview URL: ${tracks.items[0].preview_url}`);
        console.log(`Album: ${tracks.items[0].album.name}`);
      }
    })
    .catch(error => {
      console.log(error);
      console.log(
        "No Results found. Showing results for 'The Sign' by Ace of Base"
      );
    });
}

function errorConditionForSpotify() {
  spotify
    .search({ type: "track", query: "The Sign" })
    .then(({ tracks }) => {
      for (let i = 0; i < tracks.items.length; i++) {
        if (tracks.items[i].artists[0].name === "Ace of Base") {
          console.log(`Artist: ${tracks.items[i].artists[0].name}`);
          console.log(`Track: ${tracks.items[i].name}`);
          console.log(`Preview URL: ${tracks.items[i].preview_url}`);
          console.log(`Album: ${tracks.items[i].album.name}`);
          i = tracks.items.length;
        }
      }
    })
    .catch(error => {
      console.log(error);
      console.log("No Results found. ");
    });
}

function movieThis(movie) {
  axios
    .get(
      `http://www.omdbapi.com/?t=${movie}&y=&plot=short&tomatoes=true&apikey=trilogy`
    )
    .then(
      ({ data }) => {
        //console.log(response.data);
        if (data.Title != undefined) {
          console.log(`Title: ${data.Title}`);
          console.log(`Year: ${data.Year}`);
          console.log(`imdbRating:: ${data.imdbRating}`);
          console.log(`Title: ${data.Title}`);
          console.log(`Country:: ${data.Country}`);
          console.log(`Language:: ${data.Language}`);
          console.log(`Plot: ${data.Plot}`);
          console.log(`Actors: ${data.Actors}`);
          console.log(`RottenTomatoes: ${data.tomatoRating}`);
        } else {
          movieThis("Mr. Nobody");
        }
      }
      // if response is empty call the api again with the "default" movie
    )
    .catch(error => {
      console.log(error);
      console.log("No Results found. ");
    });
}

function doRandom() {
  fs.readFile("random.txt", "utf8", (error, data) => {
    const dataArr = data.split(",");
    spotifyThisSong(dataArr[1]);
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
  });
}
