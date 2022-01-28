const {getData, draw}		= require("./handlers");
const express 				= require("express");
const TYPES					= require("./socnetTypes");
const fetch 				= require("node-fetch-commonjs");
const fs 					= require("fs");

let app = express();

// Want to know what's on the home page? 
// Basically nothing, so I redirect you to the github repository
app.get("/", (req, res) => res.redirect("https://github.com/judgementdev/my-socnets-username"))

// Here we use the same handler `draw`, declarated in handlers.js file 
app.get("/username", draw);

app.listen(process.env.PORT || 3000);
