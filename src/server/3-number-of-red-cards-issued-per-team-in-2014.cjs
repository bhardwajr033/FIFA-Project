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

    worldCupPlayers.filter(({City}) => City !== '')
    .map((player) => {
        const events = player.Event.split(' ');
        events.map((event_in_match) => {
            if(event_in_match.startsWith("R") || event_in_match.startsWith("SY")){
                const teamName = getTeamName(player.MatchID,player['Team Initials']);
                if(teamName){
                    UpdateRedCardPerTeam(teamName);
                }
            }
        });
    });

    return redCardsIssuedPerTeamIn2014;
}

module.exports = numberOfRedCardsIssuedPerTeamIn2014;