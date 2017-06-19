var db = require('../config/dataAccessAdapter').GetDB();
var sites = db.collection('sites');

module.exports = {

    add: function (obj,callback){
        sites.findOne( {originalURL : obj.originalURL}, function(err, result){
            if(err != null)
                return callback(err,null);

            if (result === null) {
                sites.insert(obj, function (err,data) {
                    return callback(err,data)
                });
            }

            return callback(null,result);

        });

    },

    getSite : function(url,index,callback) {
        // 0 -> original 1 -> short
        var query;
        if(index === 0){
            query = {originalURL : url};
        }else if(index === 1){
            query = {shortURL : url};
        }

        sites.findOne( query, function(err, result){
            if(err != null)
                return callback(err,null);

            callback(null,result);
        });

    }

}
