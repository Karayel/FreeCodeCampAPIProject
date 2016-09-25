//TIMESTAMP MICROSERVICE MODULE
module.exports = function(app){
    
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
    
    
    
}