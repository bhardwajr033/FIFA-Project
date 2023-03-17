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
        const numberOfMatchesPlayedPerCity = require(path.join(__dirname, './src/server/1-number-of-matches-played-per-city.cjs'));

        let result = numberOfMatchesPlayedPerCity(matches);

        fs.writeFileSync(path.join(__dirname, './src/public/output/1-number-of-matches-played-per-city.json'), JSON.stringify(result), "utf-8");
    })


//Ques 2 - Number of matches won per team
csv()
    .fromFile(worldCupMatchesPath)
    .then((matches) => {
        const numberOfMatchesWonPerTeam = require(path.join(__dirname, './src/server/2-number-of-matches-won-per-team.cjs'));
        
        let result = numberOfMatchesWonPerTeam(matches);

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

                let result = numberOfRedCardsIssuedPerTeamIn2014(matches,players,2014);

                fs.writeFileSync(path.join(__dirname,'./src/public/output/3-red-cards-issued-per-team-in-2014.json'), JSON.stringify(result), "utf-8");
            })
    })