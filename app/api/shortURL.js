var validUrl = require('valid-url');
var site = require('../models/site');
var shortid = require('shortid');
var ip = require("ip");

module.exports = {

    getURL : function(request,callback){
        var url = ip.address()+":5000"+request.originalUrl;
        if(url === "new"){
            response.send({error:"You need to add a proper url"});
        }else{

            site.getSite(url,1,function(err,data){
                callback(data.originalURL);
            })

        }
    },

    addURL : function(request,callback){
        var urlParam = request.originalUrl;
        var url = urlParam.substring(14, urlParam.length);
        if (validUrl.isUri(url)){

            console.dir ( ip.address() );
            var shortURL = ip.address()+":5000/shorturl/" + shortid.generate();
            var obj = {originalURL: url, shortURL: shortURL}

            site.add(obj,function(err,data){
                if(err!= null)
                    callback({error:"Something went wrong.",data:null});
                callback({error:null,data:data});

            });
        } else {
            callback({error:"It is not a valid url.",data:null});
        }
    }

}