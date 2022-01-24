const express = require("express");

let app = express();

app.get("/username", draw);

app.listen(process.env.PORT || 3000);
