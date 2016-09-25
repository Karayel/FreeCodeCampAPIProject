// ROUTES MODULE
module.exports = function(app,express){
    app.use('/',express.static('public',{index:"/index.html"}));
    app.use('/timestamp', express.static('public', {index:"/timestamp/index.html"}));
    app.use('/requestheader', express.static('public', {index:"/requestheader/index.html"}));
    app.use('/shorturl',express.static('public', {index:"/urlshortener/index.html"}));
}