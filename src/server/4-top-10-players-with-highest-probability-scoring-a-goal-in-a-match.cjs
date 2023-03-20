function getTopNPlayersWithHighestProbabilityScoringAGoalInAMatch(worldCupPlayers,topN = 10){

    if(!worldCupPlayers){
        return {};
    }

    if(!Array.isArray(worldCupPlayers)){
        return {};
    }

    return worldCupPlayers
    .reduce((acc,player) => {
        const playerName = player['Player Name'];
        const isGoalScored = player.Event.includes('G') ? 1 : 0;

        let playerIndex = acc.findIndex(player => player.playername === playerName);

        //Intializing player Stats
        if(playerIndex === -1){
            let player = {};
            player.playername = playerName;
            player.matches = 1;
            player.matchesWithGoal = isGoalScored;
            player.scoringProb = parseFloat(((player.matchesWithGoal/player.matches)*100).toFixed(2));
            acc.push(player);
        }
        else{
            acc[playerIndex].matches += 1;
            acc[playerIndex].matchesWithGoal += isGoalScored;
            acc[playerIndex].scoringProb = parseFloat(((acc[playerIndex].matchesWithGoal/acc[playerIndex].matches)*100).toFixed(2));
        }

        return acc;

    },[]).filter(player => player.matches > 5)
    .sort((player1,player2) => {
        return player1.scoringProb >= player2.scoringProb ? 
        player1.scoringProb === player2.scoringProb ?
        0 : -1 : 1;
    })
    .slice(0,topN)
    .reduce((acc,playerStats) => {
        acc[playerStats.playername] = playerStats.scoringProb;
        return acc
    },{})
}

module.exports = getTopNPlayersWithHighestProbabilityScoringAGoalInAMatch;