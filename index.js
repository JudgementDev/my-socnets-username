const express = require("express");
const fetch = require("node-fetch-commonjs");
const {createCanvas} = require("canvas");

require('dotenv').config()

let app = express();

let createImg = (txt, bg) => {
	let canvas = createCanvas(150, 50);
	let ctx = canvas.getContext('2d');
	
	ctx.fillStyle = bg;
	ctx.fillRect(0, 0, 150, 50);
	
	ctx.font = 'monospace 50pt';
	ctx.textAlign = 'center';
	ctx.fillStyle = 'white';
	
	ctx.fillText(txt, 150/2, 50/2);
	
	return canvas;
	
}

let draw = async (req, res) => {
        let text = req.query.text;
        let bg = req.query.bg;
        
        let response = await fetch(text);
        if(!response.ok) throw new Error(response.ok);

        let data = await response.text();

        
	res.setHeader("Content-Type", "image/png");
	createImg(data, bg).pngStream().pipe(res);	
}

app.get("/username/discord", draw)

app.get("/username/telegram", async (req, res) => {
        let text = req.query.text;
        let bg = req.query.bg;
        
        let response = await fetch(text);
        if(!response.ok) throw new Error(response.ok);

        let data = await response.text();

        
	res.setHeader("Content-Type", "image/png");
	createImg(data, bg).pngStream().pipe(res);
})

app.get("/username/text/telegram", async (req, res) => {
        let response =  await fetch(`https://api.telegram.org/bot${process.env.TG_TOK}/getChat?chat_id=1060084171`)

	if (!response.ok) throw Error(response.status);

	let data =  await response.json();

        res.send(data.result.username);
})

app.get("/username/text/discord", async (req, res) => {
        let response = await fetch("https://discord.com/api/users/638809622236626974", {
		headers: {
			Authorization: `Bot ${process.env.DS_TOK}`
		}
	}); 

	if (!response.ok) throw new Error(response.status);

	let data = await response.json();

        res.send(data.username + "#" + data.discriminator);
})

app.listen(process.env.PORT || 3000);
