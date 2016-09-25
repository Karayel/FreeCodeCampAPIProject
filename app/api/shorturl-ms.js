module.exports = function(app,db){
    var validUrl = require('valid-url');
    var shortid = require('shortid');
    
    app.get('/shorturl/:id',function(request,response){
        var urlParam = request.params.id;
        if(urlParam === "new"){
            response.send({error:"You need to add a proper url"});
        }else{
            response.send(request.params.id);
        }
    });
    
    app.get('/shorturl/new/:url*',function(request,response){
        var urlParam = request.originalUrl;
        var url = urlParam.substring(14, urlParam.length);
        if (validUrl.isUri(url)){
            var shortURL = "https://ffc-service-mkarayel.c9users.io/shorturl/"+shortid.generate();
            var obj = {originalURl:url,shortURL:shortURL}
            saveURLtoDB(db,obj);
            response.send(obj);
        } else {
            response.send({error:"It is not a valid url."});
        }
    })
    
    function saveURLtoDB(db,obj){
        db.collection('sites').insert(obj);
    }
}