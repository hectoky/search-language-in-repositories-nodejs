var langaugesMap = function getLanguageMap(objectJSON){
    var languagesMap = new Map();
    for(var i=0; i<objectJSON.length>0; i++){
        // skip null value such as language
        if(objectJSON[i].language!==null){
            // Create a Map (key-> language, Value -> Number of ocurrences)
            if (languagesMap.has(objectJSON[i].language)){
                languagesMap.set(objectJSON[i].language, languagesMap.get(objectJSON[i].language)+1);  
            }else{
                languagesMap.set(objectJSON[i].language, 1);  
            }
        }
    }
    return languagesMap;
}

var languageMostUsed = function getLanguageMostUsed (languagesMap){
    result= 'And the languages more used are ';
    // Get the maximun
    var maximun=0;
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
    console.log(result);
}                   
                    


module.exports ={
    map: langaugesMap,
    language: languageMostUsed
}