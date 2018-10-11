var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var input = process.argv;
input.splice(0,2);
console.log(input);
var acceptedCommands = [`concert-this`, `spotify-this-song`, `movie-this`, `do-what-it-says`];

//Will run if() statement on load, and execute the api calls
if(input[0]===acceptedCommands[0]){
    //this is the bandsintown api call
    var queryURL = `https://rest.bandsintown.com/artists/${input[1]}/events?app_id=codingbootcamp`;
    
}