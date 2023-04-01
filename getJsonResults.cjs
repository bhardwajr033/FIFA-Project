const path = require("path");
const fs = require("fs").promises;

const getJSONfromQuery = require(path.join(__dirname, "src/server/getJSONfromQuery.js"));

//Ques 1 - Number of matches played per city
async function matchesPerCity() {
  const query = require(path.join(
    __dirname,
    "./src/server/1-number-of-matches-played-per-city.cjs"
  ));
  const writefilePath = path.join(
    __dirname,
    "./src/public/output/1-number-of-matches-played-per-city.json"
  );

  let result = await getJSONfromQuery(query);
  result = result.reduce((acc, entries) => {
    const city = entries.city;
    acc[city] = parseInt(entries.matches);
    return acc;
  }, {});

  await fs.writeFile(writefilePath, JSON.stringify(result), "utf-8");
}
matchesPerCity();

//Ques 2 - Number of matches won per team
async function matchesWonPerTeam() {
  const query = require(path.join(
    __dirname,
    "./src/server/2-number-of-matches-won-per-team.cjs"
  ));
  const writefilePath = path.join(
    __dirname,
    "./src/public/output/2-number-of-matches-won-per-team.json"
  );

  let result = await getJSONfromQuery(query);
  result = result.reduce((acc, entries) => {
    const country = entries.teamname;
    acc[country] = parseInt(entries.wins);
    return acc;
  }, {});

  await fs.writeFile(writefilePath, JSON.stringify(result), "utf-8");
}
matchesWonPerTeam();

//Ques 3 - Find number of red cards issued per team in 2014 world cup
async function redCardsPerTeamIn2014() {
  const query = require(path.join(
    __dirname,
    "./src/server/3-number-of-red-cards-issued-per-team-in-2014.cjs"
  ));
  const writefilePath = path.join(
    __dirname,
    "./src/public/output/3-red-cards-issued-per-team-in-2014.json"
  );
  let result = await getJSONfromQuery(query);
  result = result.reduce((acc, entries) => {
    const teamName = entries.teamname;
    acc[teamName] = parseInt(entries.redcards);
    return acc;
  }, {});

  await fs.writeFile(writefilePath, JSON.stringify(result), "utf-8");
}
redCardsPerTeamIn2014();

//Ques 4 - Find the top 10 players with the highest probability of scoring a goal in a match
async function probabilityOfTopTenPlayers() {
  const query = require(path.join(
    __dirname,
    "./src/server/4-top-10-players-with-highest-probability-scoring-a-goal-in-a-match.cjs"
  ));
  const writefilePath = path.join(
    __dirname,
    "./src/public/output/4-top-10-players-with-highest-probability-scoring-a-goal-in-a-match.json"
  );
  let result = await getJSONfromQuery(query);

  result = result.reduce((acc, playerStats) => {
    acc[playerStats.playername] = parseFloat(playerStats.scoringprob);
    return acc;
  }, {});

  await fs.writeFile(writefilePath, JSON.stringify(result), "utf-8");
}
probabilityOfTopTenPlayers();

module.exports = { quematchesPerCitys1: matchesPerCity, matchesWonPerTeam: matchesWonPerTeam, redCardsPerTeamIn2014: redCardsPerTeamIn2014, probabilityOfTopTenPlayers: probabilityOfTopTenPlayers };
