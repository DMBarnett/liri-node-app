var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var moment = require("moment");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var input = process.argv;
var request = require("request");
input.splice(0,2);
console.log(input);
var acceptedCommands = [`concert-this`, `spotify-this-song`, `movie-this`, `do-what-it-says`];

//Will run if() statement on load, and execute the api calls
function liriFunc(inner){
    if(inner[0]===acceptedCommands[0]){
        //this is the bandsintown api call
        var name = inner.slice(1).join("");
        console.log(name)
        var queryURL = `https://rest.bandsintown.com/artists/${name}/events?app_id=codingbootcamp`;
        console.log(queryURL);
        request(queryURL, function(error, response, body){
            if(error){
                return console.log(error);
            }
            var work = JSON.parse(body);
            work.forEach(inner => {
                console.log(inner.venue.name);
                console.log(inner.venue.city+ ", "+inner.venue.region);
                var working = inner.datetime
                console.log(moment(working).format("MM/DD/YYYY"));
                
                console.log("\n-----------\n");
            });
            //console.log(work[0].venue.name)
        })
    }else if(inner[0]===acceptedCommands[1]){
        if(!inner[1]){
            inner[1] = "The Sign";
        }

        var name = inner.slice(1).join(" ");

        spotify.search({type: "track", query: name}, function(err, data){
            if(err){
                return console.log(err);
            }
            var work = data.tracks.items[0];

            console.log(`
            The artist is ${work.artists[0].name}.
            The song is called ${work.name}.
            The song is on the album ${work.album.name}.
            Follow this link to hear the song: ${work.preview_url}.
            `);
        })

    }else if(inner[0]===acceptedCommands[2]){
        var name = ""
        if(!inner[1]){
            inner[1] = "Mr. Nobody";
        }
        if(inner[2]){
            for(var i = 1; i<inner.length; i++){
                name+=(" "+inner[i]);
            }
        }else{
            name = inner[1];
        }
        console.log(name);
        var queryURL = `http://www.omdbapi.com/?t=${name}&y=&plot=short&apikey=trilogy`
        
        request(queryURL, function(error, response, body){
            if(error){
                return console.log(error);
            }
            var working = JSON.parse(body);
            console.log(`
                The movie is called ${working.Title}.
                It came out in ${working.Year}.
                IMDB rated it ${working.imdbRating}.
                Rotton Tomatoes rated it ${working.Ratings[1].Value}.
                The movie was produced in ${working.Country}.
                The languages of the film are ${working.Language}.
                The film featured ${working.Actors}.
                Film Plot: ${working.Plot}
            `)
        })
    }else if(inner[0]===acceptedCommands[3]){
        var work = "";
        fs.readFile("random.txt", "utf8", function(err, data){
            if(err){
                return console.log(err);
            }
            work = data;
            console.log(work);
            working = work.split(",");
            liriFunc(working);
        })
    }
}

liriFunc(input);