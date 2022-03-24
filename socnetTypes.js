const path = require("path");


/* I'm not so dumb as to leave the tokens in the open. 
   That's why I use .env files to store data securely. 
   Because the node.js itself does not see such files, I use the module of the same name
*/
require("dotenv").config();


/* this file stores the data of socnets 
as you can see, there is a certain structure here

name_of_socnet: {
        url:"Some endpoint of socnet API",
        icon: "Path to socnet icon",
        payload: "Body, headers, head etc. of the request
}
*/
module.exports = {
	telegram: {
		requestURL: `https://api.telegram.org/bot${process.env.TG_TOK}/method?param=arg`,
		avatarURL: `https://api.telegram.org/file/bot${process.env.TG_TOK}/`,
		icon: path.join(__dirname, "/static/telegram.png"),
		payload: {},


	},
	discord: {
		requestURL: `https://discord.com/api/users/user_id`,
		avatarURL: "https://cdn.discordapp.com/avatars/user_id/avatar_id.png",
		icon: path.join(__dirname,"/static/discord.png"),
		payload: {
			headers: {
				Authorization: `Bot ${process.env.DS_TOK}`
			}
		},
		
	}
};
