function top10PlayersWithHighestProbabilityScoringAGoalInAMatch(worldCupPlayers,topN){
    let playersProbScoringGoal = {};
    let playerStats = [];

    if(!Array.isArray(worldCupPlayers)){
        return playersProbScoringGoal;
    }

    function updatePlayerStats(playerName,isGoalScored){
        let playerIndex = playerStats.findIndex(player => player.playername === playerName);

        if(playerIndex === -1){
            let player = {};
            player.playername = playerName;
            player.matches = 1;
            player.totalGoals = isGoalScored;
            player.scoringProb = parseFloat(((player.totalGoals/player.matches)*100).toFixed(2));
            playerStats.push(player);
        }
        else{
            playerStats[playerIndex].matches += 1;
            playerStats[playerIndex].totalGoals += isGoalScored;
            playerStats[playerIndex].scoringProb = parseFloat(((playerStats[playerIndex].totalGoals/playerStats[playerIndex].matches)*100).toFixed(2));
        }
    }

    for(let players of worldCupPlayers){
        if(!players.Event){
            continue;
        }

        const events = players.Event.split(' ');

        let playerName = players['Player Name'];
        let isGoalScored = 0;

        for(let event of events){
            if(event.startsWith('G')){
                playerName = players['Player Name'];
                isGoalScored=1;
            }
        }

        if(playerName){
            updatePlayerStats(playerName,isGoalScored);
        }
    }

    function sortByProbDecending(player1,player2){
        if(player1.scoringProb > player2.scoringProb){
            return -1;
        }
        if(player1.scoringProb < player2.scoringProb){
            return 1;
        }
        return 0;
    }

    let playerStatsAtleast5matches = playerStats.filter(player => player.matches > 5);

    playerStatsAtleast5matches.sort(sortByProbDecending);
    
    for(let index=0;index<topN;index++){
        playersProbScoringGoal[playerStatsAtleast5matches[index].playername] = playerStatsAtleast5matches[index].scoringProb;
    }

    return playersProbScoringGoal;
}

module.exports = top10PlayersWithHighestProbabilityScoringAGoalInAMatch;