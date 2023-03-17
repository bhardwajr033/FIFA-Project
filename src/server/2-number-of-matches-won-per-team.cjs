function numberOfMatchesWonPerTeam(worldCupMatches){
    let matchesWonPerTeam = {};

    if(!Array.isArray(worldCupMatches)){
        return matchesWonPerTeam;
    }

    for(let matches of worldCupMatches){
        if(matches['Home Team Name'] === ''){
            continue;
        }
        matchesWonPerTeam[matches['Home Team Name']] = 0;
        matchesWonPerTeam[matches['Away Team Name']] = 0;
    }

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

    for(let matches of worldCupMatches){
        if(matches['Home Team Name'] === ''){
            //Ignoring Missing Values
            continue;
        }

        let winTeam;

        const homeTeamGoals = parseInt(matches['Home Team Goals']);
        const awayTeamGoals = parseInt(matches['Away Team Goals']);
        
        if(homeTeamGoals > awayTeamGoals){
            winTeam = matches['Home Team Name'];
        }
        else if(homeTeamGoals < awayTeamGoals){
            winTeam = matches['Away Team Name'];
        }
        else if(homeTeamGoals === awayTeamGoals){
            winTeam = getWinTeamFromPenalties(matches['Win conditions'],matches);
        }

        if(winTeam){
            matchesWonPerTeam[winTeam]+=1;
        }
    }
    
    return matchesWonPerTeam;
}

module.exports = numberOfMatchesWonPerTeam;