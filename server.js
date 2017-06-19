var express = require("express");
var app = express();

var routes = require("./app/routes/index.js")(app,express);

app.listen(process.env.PORT || 5000);

