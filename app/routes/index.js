var requestHeader = require("../api/requestHeader.js");
var timestamp = require("../api/timestamp.js");
var shortURL = require("../api/shortURL.js");

// ROUTES MODULE
module.exports = function(app,express){

    //Static Pages
    app.use('/',express.static('public',{index:"/index.html"}));
    app.use('/timestamp', express.static('public', {index:"/timestamp/index.html"}));
    app.use('/requestheader', express.static('public', {index:"/requestheader/index.html"}));
    app.use('/shorturl',express.static('public', {index:"/urlshortener/index.html"}));

    // Request Header MicroService
    app.get('/requestheader/whoami',function(request,response){
        requestHeader.whoami(request,function(data){
            response.send(data);
        });

    });

    // Timestamp MicroService
    app.get('/timestamp/:id', function(request, response){
        timestamp.getTimeStamp(request,function(data){
            response.send(data);
        });
    });

    app.get('/shorturl/:id',function(request,response){
        shortURL.getURL(request,function (data) {
            response.redirect(data);
        })
    });

    app.get('/shorturl/new/:url*',function(request,response){
        shortURL.addURL(request,function (data) {
            response.send(data);
        })
    })
}