const {createCanvas, loadImage} = require("canvas");
const {getData, draw}		= require("./handlers");
const express 			= require("express");
const TYPES			= require("./socnetTypes");
const fetch 			= require("node-fetch-commonjs");
const fs 			= require("fs");


require('dotenv').config()

let app = express();

app.get("/username", draw);

app.listen(process.env.PORT || 3000);
