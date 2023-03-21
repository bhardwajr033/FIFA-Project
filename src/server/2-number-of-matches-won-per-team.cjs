function getNumberOfMatchesWonPerTeam(worldCupMatches){

    if(!worldCupMatches){
        return {};
    }

    if(!Array.isArray(worldCupMatches)){
        return {};
    }

    const homeTeamName = 'Home Team Name';
    const awayTeamName = 'Away Team Name';
    const homeGoalsString = 'Home Team Goals';
    const awayGoalsString = 'Away Team Goals';


    return worldCupMatches.reduce((acc,match) => {

        acc[match[homeTeamName]] = acc[match[homeTeamName]] || 0;
        acc[match[awayTeamName]] = acc[match[awayTeamName]] || 0;

        const homeTeamGoals = parseInt(match[homeGoalsString]);
        const awayTeamGoals = parseInt(match[awayGoalsString]);

        let winTeamName;

        if(homeTeamGoals > awayTeamGoals){
            winTeamName = match[homeTeamName];
        }
        else if(homeTeamGoals < awayTeamGoals){
            winTeamName = match[awayTeamName];
        }
        else{
            winTeamName = getWinTeamFromPenalties(match);
        }

        if(winTeamName){
            acc[winTeamName]+=1;
        }

        return acc;
    },{})
}

function getWinTeamFromPenalties(match){
    const winCondition = match['Win conditions'];

    if(winCondition === ' '){
        return
    }

    const homeTeamNameGoals = parseInt(winCondition.replace(/[^0-9]/g,'')[0]);
    const awayTeamNameGoals = parseInt(winCondition.replace(/[^0-9]/g,'')[1]);

    if(homeTeamNameGoals > awayTeamNameGoals){
        return match['Home Team Name'];
    }
    if(homeTeamNameGoals < awayTeamNameGoals){
        return match['Away Team Name'];
    }
    return
}

module.exports = getNumberOfMatchesWonPerTeam;