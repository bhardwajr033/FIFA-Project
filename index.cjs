const fs = require("fs");
const csv = require("csvtojson");
const path = require("path");

const worldCupMatchesPath = path.join(__dirname,"src/data/WorldCupMatches.csv");
const worldCupPlayersPath = path.join(__dirname,"src/data/WorldCupPlayers.csv");
const worldCupsPath = path.join(__dirname,"src/data/WorldCups.csv");


//Ques 1 - Number of matches played per city
csv()
    .fromFile(worldCupMatchesPath)
    .then((matches) => {
        const getNumberOfMatchesPlayedPerCity = require(path.join(__dirname, './src/server/1-number-of-matches-played-per-city.cjs'));

        let result = getNumberOfMatchesPlayedPerCity(matches.filter((match) => match.City !== ''));

        fs.writeFileSync(path.join(__dirname, './src/public/output/1-number-of-matches-played-per-city.json'), JSON.stringify(result), "utf-8");
    })


//Ques 2 - Number of matches won per team
csv()
    .fromFile(worldCupMatchesPath)
    .then((matches) => {
        const getNumberOfMatchesWonPerTeam = require(path.join(__dirname, './src/server/2-number-of-matches-won-per-team.cjs'));
        
        let result = getNumberOfMatchesWonPerTeam(matches.filter((match) => match.City !== ''));

        fs.writeFileSync(path.join(__dirname, './src/public/output/2-number-of-matches-won-per-team.json'), JSON.stringify(result), "utf-8");
    })

//Ques 3 - Find number of red cards issued per team in 2014 world cup
csv()
    .fromFile(worldCupMatchesPath)
    .then((matches) => {
        csv()
            .fromFile(worldCupPlayersPath)
            .then((players) => {

                const numberOfRedCardsIssuedPerTeamIn2014 = require(path.join(__dirname,'./src/server/3-number-of-red-cards-issued-per-team-in-2014.cjs'));

                let result = numberOfRedCardsIssuedPerTeamIn2014(matches.filter((match) => match.City !== ''),players,2014);

                fs.writeFileSync(path.join(__dirname,'./src/public/output/3-red-cards-issued-per-team-in-2014.json'), JSON.stringify(result), "utf-8");
            })
    })


//Ques 4 - Find the top 10 players with the highest probability of scoring a goal in a match
// Considering player has played atleast 5 matches.
csv()
    .fromFile(worldCupPlayersPath)
    .then((players) => {

        const top10PlayersWithHighestProbabilityScoringAGoalInAMatch = require(path.join(__dirname,'./src/server/4-top-10-players-with-highest-probability-scoring-a-goal-in-a-match.cjs'));

        let result = top10PlayersWithHighestProbabilityScoringAGoalInAMatch(players,10);

        fs.writeFileSync(path.join(__dirname,'./src/public/output/4-top-10-players-with-highest-probability-scoring-a-goal-in-a-match.json'), JSON.stringify(result) ,"utf-8");

    })