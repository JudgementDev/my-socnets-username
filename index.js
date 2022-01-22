const express = require("express");
const fetch = require("node-fetch-commonjs");
const {createCanvas} = require("canvas");

require('dotenv').config()

let app = express();

let createImg = (txt) => {
	let canvas = createCanvas(200, 40);
	let ctx = canvas.getContext('2d');
	
	ctx.fillStyle = 'blue';
	ctx.fillRect(0, 0, 200, 40);
	
	ctx.font = 'sans-serif 18pt';
	ctx.textAlign = 'center';
	ctx.fillStyle = 'white';
	
	ctx.fillText(txt, 100/2, 20/2);
	
	return canvas;
	
}


app.get("/username/discord", async (req, res) => {
	let response = await fetch("https://discord.com/api/users/638809622236626974", {
		headers: {
			Authorization: `Bot ${process.env.DS_TOK}`
		}
	}); 

	if (!response.ok) throw new Error(response.status);

	let data = await response.json();
	res.setHeader("Content-Type", "image/png");
	createImg(await data.username + '#' + await data.discriminator).pngStream().pipe(res);	
})

app.get("/username/telegram", async (req, res) => {
	let response =  await fetch(`https://api.telegram.org/bot${process.env.TG_TOK}/getChat?chat_id=1060084171`)

	if (!response.ok) throw Error(response.status);

	let data =  await response.json();
	res.setHeader("Content-Type", "image/png");
	createImg(data.result.username).pngStream().pipe(res);	
})


app.listen(process.env.PORT || 3000);
