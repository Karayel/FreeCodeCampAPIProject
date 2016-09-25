// REQUEST HEADER MICROSERVICE MODULE
module.exports = function(app){
    app.get('/requestheader/whoami',function(request,response){
        var res ={ ipaddress: request.headers['x-forwarded-for'] || request.connection.remoteAddress,
                   language: request.headers["accept-language"].split(",")[0],
                   software: request.headers["user-agent"].match(/\((.*?)\)/)[1]
                 };
        response.send(res);
    })
}