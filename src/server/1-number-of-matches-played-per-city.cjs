function getNumberOfMatchesPlayedPerCity(worldCupMatches){

    if(!worldCupMatches){
        return {};
    }

    if(!Array.isArray(worldCupMatches)){
        return {};
    }

    return worldCupMatches.reduce((acc,match) => {
        acc[match.City] = acc[match.City] || 0;
        acc[match.City] += 1;
        return acc;
    },{})
}

module.exports = getNumberOfMatchesPlayedPerCity;