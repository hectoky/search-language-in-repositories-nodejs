var utils = require('util');

var options = function generateCall(user){
   
    var url = utils.format('/users/%s/repos', user.toLowerCase());

    var options = {
        host : 'api.github.com',
        path : url, 
        method : 'GET', 
        headers : {
            'User-Agent': 'Little-Program-Testing-Github-Api',
            'Content-Type': 'application/json'
            }
    };
    return options;
}

function doCall(options){
    var https = require('https');
    var output='';
    // do the GET request
    var reqGet = https.request(options, function(res) {
        console.log("statusCode: ", res.statusCode);

        res.on('data', function(response) {    
            output += response;
        });

        res.on('error', function(e) {
            console.error(e);
        });

        res.on('end', function() {
            if (res.statusCode===200){
                var result='';
                var responseObject = JSON.parse(output);

                if (utils.isArray(responseObject)&& responseObject.length>0){
                    // Call service layer
                    var serviceImpl = require('./service');
                    serviceImpl.language(serviceImpl.map(responseObject));

                } else {// case the user not exits and reponse is an empty array
                    result = 'There is not favourite language for that user, there is not any repository';
                }
                console.log(result);   
            }else{
                console.error("Response message: "+output);
            }     
        });
    });
    reqGet.end();
}

module.exports={
    options: options,
    call: doCall
}