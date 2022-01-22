const express = require("express");
const fetch = require("node-fetch-commonjs");

require('dotenv').config()

let app = express();

app.get("/username/discord", async (req, res) => {
	let response = await fetch("https://discord.com/api/users/638809622236626974", {
		headers: {
			Authorization: `Bot ${process.env.DS_TOK}`
		}
	}); 

	if (!response.ok) throw new Error(response.status);

	let data = await response.json();

	res.send(await data.username + '#' + await data.discriminator);	
})

app.get("/username/telegram", async (req, res) => {
	let response =  await fetch(`https://api.telegram.org/bot${process.env.TG_TOK}/getChat?chat_id=1060084171`)

	if (!response.ok) throw Error(response.status);

	let data =  await response.json();

	res.send('@' + data.result.username);
})

app.listen(3000);