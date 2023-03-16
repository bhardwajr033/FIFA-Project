const fs = require("fs");
const csv = require("csvtojson");
const path = require("path");

const worldCupMatchesPath = path.join(__dirname,"src/data/WorldCupMatches.csv");
const worldCupPlayersPath = path.join(__dirname,"src/data/WorldCupPlayers.csv");
const worldCupsPath = path.join(__dirname,"src/data/WorldCups.csv");

const numberOfMatchesPlayedPerCity = require(path.join(__dirname, './src/server/1-number-of-matches-played-per-city.cjs'));
csv()
    .fromFile(worldCupMatchesPath)
    .then((matches) => {
        let result = numberOfMatchesPlayedPerCity(matches)

        fs.writeFileSync(path.join(__dirname, './src/public/output/1-number-of-matches-played-per-city.json'), JSON.stringify(result), "utf-8")
    })