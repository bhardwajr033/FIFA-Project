function numberOfMatchesPlayedPerCity(worldCupMatches){
    let matchesPerCity = {};

    if(!Array.isArray(worldCupMatches)){
        return matchesPerCity;
    }
    
    for(let matches of worldCupMatches){
        if(matches.City === ""){
            continue;
        }
        if(!matchesPerCity[matches.City]){
            matchesPerCity[matches.City]=1;
        }
        else{
            matchesPerCity[matches.City]+=1;
        }
    }
    return matchesPerCity;
}

module.exports = numberOfMatchesPlayedPerCity;