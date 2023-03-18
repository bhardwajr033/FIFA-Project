function numberOfMatchesPlayedPerCity(worldCupMatches){
    let matchesPerCity = {};

    if(!Array.isArray(worldCupMatches)){
        return matchesPerCity;
    }

    worldCupMatches.filter(({City}) => City !== '').map(({City}) => !matchesPerCity[City] ? matchesPerCity[City] = 1 : matchesPerCity[City]+=1);
    
    return matchesPerCity;
}

module.exports = numberOfMatchesPlayedPerCity;