function numberOfMatchesWonPerTeam(worldCupMatches){
    let matchesWonPerTeam = {};

    if(!Array.isArray(worldCupMatches)){
        return matchesWonPerTeam;
    }

    function updateMatchesWonPerTeam(winTeam){
        if(!matchesWonPerTeam[winTeam]){
            matchesWonPerTeam[winTeam] = 1;
        }
        else{
            matchesWonPerTeam[winTeam]+=1;
        }
    }

    for(let matches of worldCupMatches){
        if(matches.Year === ''){
            //Ignoring Missing Values
            continue;
        }

        let winTeam;
        const homeTeamGoals = parseInt(matches['Home Team Goals']);
        const awayTeamGoals = parseInt(matches['Away Team Goals']);
        
        if(homeTeamGoals>awayTeamGoals){
            winTeam = matches['Home Team Name'];
        }
        else if(homeTeamGoals<awayTeamGoals){
            winTeam = matches['Away Team Name'];
        }
        else{
            // Taking first word of penalties score are given in win conditions as France win on penalties (3 - 4)
            winTeam = matches['Win conditions'].split(' ')[0];
        }

        updateMatchesWonPerTeam(winTeam);

    }
    
    return matchesWonPerTeam;
}

module.exports = numberOfMatchesWonPerTeam;