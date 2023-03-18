function top10PlayersWithHighestProbabilityScoringAGoalInAMatch(worldCupPlayers,topN = 10){

    let playersProbScoringGoal = {};
    let playerStats = [];

    if(!Array.isArray(worldCupPlayers)){
        return playersProbScoringGoal;
    }


    function updatePlayerStats(playerName,isGoalScored){
        let playerIndex = playerStats.findIndex(player => player.playername === playerName);

        //Intializing player Stats
        if(playerIndex === -1){
            let player = {};
            player.playername = playerName;
            player.matches = 1;
            player.matchesWithGoal = isGoalScored;
            player.scoringProb = parseFloat(((player.matchesWithGoal/player.matches)*100).toFixed(2));
            playerStats.push(player);
        }
        else{
            playerStats[playerIndex].matches += 1;
            playerStats[playerIndex].matchesWithGoal += isGoalScored;
            playerStats[playerIndex].scoringProb = parseFloat(((playerStats[playerIndex].matchesWithGoal/playerStats[playerIndex].matches)*100).toFixed(2));
        }
    }


    worldCupPlayers.filter(({Event}) => Event !== '')
    .map((player) => {
        const events = player.Event.split(' ');
        let playerName = player['Player Name'];
        let isGoalScored = 0;

        events.map((event_in_match) => {
            if(event_in_match.startsWith('G')){
                isGoalScored = 1;
            }
        });
        updatePlayerStats(playerName,isGoalScored);
    });


    playerStats.filter(player => player.matches > 5)
    .sort((player1,player2) => {
        return player1.scoringProb >= player2.scoringProb ? 
        player1.scoringProb === player2.scoringProb ?
        0 : -1 : 1;
    })
    .slice(0,topN)
    .map((playerStatsAtleast5matches) => {
        playersProbScoringGoal[playerStatsAtleast5matches.playername] = playerStatsAtleast5matches.scoringProb;
    });

    return playersProbScoringGoal;
}

module.exports = top10PlayersWithHighestProbabilityScoringAGoalInAMatch;