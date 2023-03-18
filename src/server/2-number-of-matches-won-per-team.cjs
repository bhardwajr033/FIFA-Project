function numberOfMatchesWonPerTeam(worldCupMatches){

    let matchesWonPerTeam = {};

    if(!Array.isArray(worldCupMatches)){
        return matchesWonPerTeam;
    }


    worldCupMatches.filter(({City}) => City !== '')
    .map((match) => {
        matchesWonPerTeam[match['Home Team Name']] = 0;
        matchesWonPerTeam[match['Away Team Name']] = 0;
    });


    function getWinTeamFromPenalties(winCondition,matches){
        if(winCondition === ' '){
            return
        }
        let homeTeamGoals = winCondition.split(' ');
        homeTeamGoals = parseInt(homeTeamGoals[homeTeamGoals.length - 4][1]);

        let awayTeamGoals = winCondition.split(' ');
        awayTeamGoals = parseInt(awayTeamGoals[awayTeamGoals.length - 2][0]);

        if(homeTeamGoals > awayTeamGoals){
            return matches['Home Team Name'];
        }
        if(homeTeamGoals < awayTeamGoals){
            return matches['Away Team Name'];
        }
        return;
    }

    
    worldCupMatches.filter(({City}) => City !== '')
    .map((match) => {
        let homeTeamGoals = parseInt(match['Home Team Goals']);
        let awayTeamGoals = parseInt(match['Away Team Goals']);

        return homeTeamGoals >= awayTeamGoals ? homeTeamGoals === awayTeamGoals ?
        getWinTeamFromPenalties(match['Win conditions'],match):
        match['Home Team Name'] : match['Away Team Name'];
        
    }).
    map((teamName) => {
        if(teamName){
        matchesWonPerTeam[teamName]+=1;
    }});

    
    return matchesWonPerTeam;
}

module.exports = numberOfMatchesWonPerTeam;