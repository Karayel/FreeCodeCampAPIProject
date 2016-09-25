var express = require("express")
var routes = require("./app/routes/index.js")
var requestHeader = require("./app/api/requestheader-ms.js") 
var timestamp = require("./app/api/timestamp-ms.js")
var shortUrl = require("./app/api/shorturl-ms.js")
var MongoClient = require('mongodb').MongoClient;

var app = express()


// Connection URL
var url = 'mongodb://localhost:27017/ffc-service';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  if (err)
    console.log(err)
  try{
    console.log("Connected successfully to server");
    db.createCollection("sites");
    console.log(db.getCollectionNames())
    shortUrl(app,db)
  
    db.close();
  }catch(err){
      console.log(err);
  }
});

requestHeader(app)
timestamp(app)

routes(app,express);

app.listen(process.env.PORT || 5000);

