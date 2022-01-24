const path = require("path");

require("dotenv").config();

module.exports = {
	telegram: {
		url: `https://api.telegram.org/bot${process.env.TG_TOK}/getChat?chat_id=${process.env.TG_ID}`,
		icon: path.join(__dirname, "./static/telegram.png"),
		payload: {},


	},
	discord: {
		url: `https://discord.com/api/users/${process.env.DS_ID}`,
		icon: path.join(__dirname,"./static/discord.png"),
		payload: {
			headers: {
				Authorization: `Bot ${process.env.DS_TOK}`
			}
		},
		
	}
};