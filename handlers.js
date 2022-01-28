const {createCanvas, loadImage} 	= require("canvas");
const TYPES								= require("./socnetTypes");
const fetch 							= require("node-fetch-commonjs");


/* Anyone who has worked with canvas knows what's going on here. For the rest, I'll explain
   Here the same badge is created that you see in my github profile (which with the username of discord and telegram)
*/
let createImg = (txt, bg, color, type, borderColor, borderSize) => 
{
	// here the base canvas is initialized, on which other elements will be hung later
	let canvas = createCanvas(150, 50);
	let ctx = canvas.getContext('2d');
	
	// Here the background of the canvas is defined and a rectangle of the same shape as the canvas is created.
	bg != color && bg != undefined ? ctx.fillStyle = bg : ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	// This is the text, that is, the nickname in the social network, which is passed to the function parameters (txt).
	// Color is also indicated through the parameters
	ctx.font = 'monospace 50pt';
	ctx.textAlign = 'center';
	color != bg && color != undefined ? ctx.fillStyle = color : ctx.fillStyle = "black";
	
	// here we draw a frame for our badge
	borderSize != undefined ? ctx.lineWindth = borderSize : ctx.lineWidth = 4.5;
	borderColor != bg && borderColor != undefined ? ctx.strokeStyle = borderColor : ctx.strokeStyle = borderColor;
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// The icon of the social network is already looming here, which will be displayed 
	// Pay attention to TYPES[type].icon - this is an image of a social network icon (or rather, the path to it), which is located in the social network object 
	// (see file socnetsTypes.js)
	loadImage(TYPES[type].icon)
		.then(image => ctx.drawImage(image, 12.5, 50 / 4, 30,30));
	
	// This short passage is responsible for drawing and placing text on the canvas
	ctx.fillText(txt, 150/2, 50/2);
	
	// And, finally, we return the canvas as an object
	return canvas;
	
}


/* This function is the request handler that is responsible for displaying the badge
As expected in express, the handler has two parameters - req & res. 
Simply put - req is a request, res is a response to a request. 
*/
let draw = async (req, res) => 
{
	// This variable has no value, not because it has no value, but because the value will be passed later
	let username;
	
	// Everything should be simple here - we get data from the request
   let bg = req.query.bg;
   let color = req.query.color;
   let type = req.query.type;
   let borderColor = req.query.borderColor;
   let borderSize = req.query.borderSize;
	
	// Now that's more interesting. 
	// Here we use some kind of asynchronous function that returns a value, namely the data received through the messenger API
   let data = await getData(TYPES[type].url, TYPES[type].payload);
	
	// and here is our "useless" variable, which will soon determine the fate (and value!!!)
   if (type == "discord")
      username = data.username + "\n#" + data.discriminator;
   else if (type == "telegram")
      username = "t.me/\n" + data.result.username

	// And finally, we display our image on the Internet.
	// Do not forget about the headers, otherwise the server will swear that this is not a JSON object
	// Then we create our badge, open the stream in which it will be stored and instantly transfer it to the response so that the user can admire our work :)
	res.setHeader("Content-Type", "image/png");
	createImg(username, bg, color, type, borderColor, borderSize).pngStream().pipe(res);	
}

// This function, I think, on the shelf does not need to be disassembled. Here we fetch data via messenger API using fetch/
let getData = async (url, payload) => {

	let response =  await fetch(url, payload);

	if (!response.ok) throw Error(response.status);

	let data = await response.json();

   return await data;
}

module.exports = {draw, getData};
