var https = require('https');
var utils = require('util');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question('Enter a user to search in the Github respositories ', (answer) => {

    var url = utils.format('/users/%s/repos',answer);

    var options = {
        host : 'api.github.com',
        path : url, 
        method : 'GET', 
        headers : {
            'User-Agent': 'Little-Program-Testing-Github-Api',
            'Content-Type': 'application/json'
            }
    };
    
    //console.log('Options prepared:');
    //console.log(options);


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
            // console.log("Response body:");
            // console.log(responseObject);
                if (utils.isArray(responseObject)&& responseObject.length>0){
                    
                    var languagesMap = new Map();
                    for(var i=0; i<responseObject.length>0; i++){
                        // skip null value such as language
                        if(responseObject[i].language!==null){
                            if (languagesMap.has(responseObject[i].language)){
                                languagesMap.set(responseObject[i].language, languagesMap.get(responseObject[i].language)+1);  
                            }else{
                                languagesMap.set(responseObject[i].language, 1);  
                            }
                        }
                    }
                    // Get the maximun
                    var maximun=0;
                    result= 'And the languages more used are ';
                    for (let value of languagesMap.values()) {
                        if (value > maximun){ maximun=value};
                    }
                    // Print and take the language with more coincidences
                    if (maximun === 0){ // all the respositories have null value in the langauges
                        result= 'All the respositories have null value in the languages. There is not favourite language';
                    } else{
                        for (let entry of languagesMap.entries()) {
                            console.log('Language: '+entry[0] +' -- Ocurrences: '+  entry[1]);
                            if (entry[1]===maximun){
                                result = result +' '+ entry[0] ;
                            }
                        }
                    }
                    

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
  rl.close();
});