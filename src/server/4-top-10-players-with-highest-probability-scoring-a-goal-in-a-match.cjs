function top10PlayersWithHighestProbabilityScoringAGoalInAMatch(worldCupPlayers,topN){
    let playersProbScoringGoal = {};
    let playerStats = [];

    if(!Array.isArray(worldCupPlayers)){
        return playersProbScoringGoal;
    }

    function updatePlayerStats(playerName,goalCount){
        let playerIndex = playerStats.findIndex(player => player.playername === playerName);

        if(playerIndex === -1){
            let player = {};
            player.playername = playerName;
            player.matches = 1;
            player.totalGoals = goalCount;
            player.scoringProb = ((player.totalGoals/player.matches)*100).toFixed(2);
            playerStats.push(player);
        }
        else{
            playerStats[playerIndex].matches += 1;
            playerStats[playerIndex].totalGoals += goalCount;
            playerStats[playerIndex].scoringProb = ((playerStats[playerIndex].totalGoals/playerStats[playerIndex].matches)*100).toFixed(2);
        }
    }

    for(let players of worldCupPlayers){
        if(!players.Event){
            continue;
        }

        const events = players.Event.split(' ');

        let playerName;
        let goalCount = 0;

        for(let event of events){
            if(event.startsWith('G')){
                playerName = players['Player Name'];
                goalCount+=1;
            }
        }

        if(playerName && goalCount){
            updatePlayerStats(playerName,goalCount);
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

    playerStats.sort(sortByProbDecending);
    
    for(let index=0;index<topN;index++){
        playersProbScoringGoal[playerStats[index].playername] = playerStats[index].scoringProb;
    }

    return playersProbScoringGoal;
}

module.exports = top10PlayersWithHighestProbabilityScoringAGoalInAMatch;