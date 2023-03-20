function getNumberOfRedCardsIssuedPerTeamInAYear(worldCupMatches,worldCupPlayers,year = 2014){
    
    if(!worldCupMatches || !worldCupPlayers){
        return {};
    }

    if(!Array.isArray(worldCupMatches) || !Array.isArray(worldCupPlayers)){
        return {};
    }


    const teamNamesofAYear = worldCupMatches.filter(match => match.Year === year.toString())
    .reduce((acc,match) => {
        acc[match.MatchID] = {
            homeTeamInitials : match['Home Team Initials'],
            homeTeamName : match['Home Team Name'],
            awayTeamName : match['Away Team Name']
        }
        return acc;
    },{});

    return worldCupPlayers.filter(player => player.Event.includes('R'))
    .reduce((acc,player) => {
        const match = teamNamesofAYear[player.MatchID];
        if(!match){
        }
        else if(match.homeTeamInitials === player['Team Initials']){
            acc[match.homeTeamName] = acc[match.homeTeamName] || 0;
            acc[match.homeTeamName]+=1;
        }
        else{
            acc[match.awayTeamName] = acc[match.awayTeamName] || 0;
            acc[match.awayTeamName]+=1;
        }
        return acc;
    },{})
}

module.exports = getNumberOfRedCardsIssuedPerTeamInAYear;