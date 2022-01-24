const {createCanvas, loadImage} = require("canvas");
const TYPES			= require("./socnetTypes");
const fetch 			= require("node-fetch-commonjs");

require("dotenv").config();

let createImg = (txt, bg, img, color, type) => 
{
	let canvas = createCanvas(150, 50);
	let ctx = canvas.getContext('2d');
	
	ctx.fillStyle = bg;
	ctx.fillRect(0, 0, 150, 50);
	
	ctx.font = 'monospace 50pt';
	ctx.textAlign = 'center';
	ctx.fillStyle = color;
	console.log(TYPES[type].image);
	loadImage(TYPES[type].icon)
		.then(image => ctx.drawImage(image, 12.5, 50 / 4, 30,30));

	ctx.fillText(txt, 150/2, 50/2);
	
	return canvas;
	
}

let draw = async (req, res) => 
{
	let username;
        let bg = req.query.bg;
        let icon = req.query.icon;
        let color = req.query.color;
        let type = req.query.type

        let data = await getData(TYPES[type].url, TYPES[type].payload);

        if (type == "discord")
        	username = data.username + "\n#" + data.discriminator;
        else if (type == "telegram")
        	username = "t.me/\n" + data.result.username


	res.setHeader("Content-Type", "image/png");
	createImg(username, bg, icon, color, type).pngStream().pipe(res);	
}

let getData = async (url, payload) => {

	let response =  await fetch(url, payload);

	if (!response.ok) throw Error(response.status);

	let data = await response.json();

        return await data;
}

module.exports = {draw, getData};