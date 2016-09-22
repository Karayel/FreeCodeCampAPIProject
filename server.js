var express = require("express")
var app = express()
var date = require('date-and-time')

app.get('/timestamp/:id', function(request, response){
    var data = request.params.id
    var res;
    if(parseInt(data) || data === "0"){
        res = {unix:parseInt(data),natural:date.format(new Date(parseInt(data) * 1000), 'MMMM DD, YYYY')};
    }else{
        if(date.isValid(data,'MMMM DD, YYYY')){
            var time = new Date(data).getTime()/100
            res = {unix:time,natural:data} 
        }else{
            res = {unix:null,natural:null}
        }
    }
   response.json(res);
});

app.get('/requestheader/whoami',function(request,response){
    var res ={ ipaddress: request.headers['x-forwarded-for'] || request.connection.remoteAddress,
               language: request.headers["accept-language"].split(",")[0],
               software: request.headers["user-agent"].match(/\((.*?)\)/)[1]
             };
   response.send(res);
})

app.use('/',express.static('public',{index:"/index.html"}));
app.use('/timestamp', express.static('public', {index:"/timestamp/index.html"}));
app.use('/requestheader', express.static('public', {index:"/requestheader/index.html"}));

app.listen(process.env.PORT || 5000);

