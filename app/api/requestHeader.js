// REQUEST HEADER MICROSERVICE MODULE
module.exports = {
    whoami : function (request,callback) {
        var res = {
            IPAddress: this.getIPAddress(request),
            Language: this.getLanguage(request),
            Software: this.getSoftware(request)
        };

        callback(res);
    },

    getIPAddress : function(request){
        return request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    },

    getLanguage : function(request){
        return request.headers["accept-language"].split(",")[0];
    },

    getSoftware : function(request){
        return request.headers["user-agent"].match(/\((.*?)\)/)[1];
    }
}