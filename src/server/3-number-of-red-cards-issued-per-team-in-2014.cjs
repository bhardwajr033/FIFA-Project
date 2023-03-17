function numberOfRedCardsIssuedPerTeamIn2014(worldCupMatches,worldCupPlayers,year){
    
    let redCardsIssuedPerTeamIn2014 = {};

    if(!Array.isArray(worldCupMatches) || !Array.isArray(worldCupPlayers)){
        return redCardsIssuedPerTeamIn2014;
    }

    function UpdateRedCardPerTeam(teamName){
        if(!redCardsIssuedPerTeamIn2014[teamName]){
            redCardsIssuedPerTeamIn2014[teamName] = 1;
        }
        else{
            redCardsIssuedPerTeamIn2014[teamName]+=1;
        }
    }

    function getTeamName(matchID,teamInitials){
        const match =  worldCupMatches.find(matches => matches.MatchID === matchID);

        if(match.Year !== year.toString()){
            return null;
        }

        if(match['Home Team Initials'] === teamInitials){
            return match['Home Team Name'];
        }
        else{
            return match['Away Team Name'];
        }
    }
    
    for(let players of worldCupPlayers){
        if(players.Event == ''){
            continue;
        }
        const events = players.Event.split(' ');

        for(let event of events){
            if(event.startsWith("R") || event.startsWith("YR")){
                const teamName = getTeamName(players.MatchID,players['Team Initials']);
                if(teamName){
                    UpdateRedCardPerTeam(teamName);
                }
            }
        }
    }

    return redCardsIssuedPerTeamIn2014;
}

module.exports = numberOfRedCardsIssuedPerTeamIn2014;