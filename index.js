const express = require("express");
const path = require("path");
const fs = require("fs").promises;

const port = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

app.get("/app.js", (req, res) => {
  res.sendFile(path.resolve("public/app.js"));
});

app.get("/style.css", (req, res) => {
    res.sendFile(path.resolve("public/style.css"));
});

app.get("/graphLabels", (req,res)=>{
    fs.readFile('./public/graphLabels.json','utf8')
    .then(data => res.send(data)); 
})

app.get("/matchesPerCity",(req,res)=>{
    fs.readFile('./src/public/output/1-number-of-matches-played-per-city.json','utf8')
.then(data => res.send(data));
})

app.get("/matchesWonPerTeam",(req,res)=>{
    fs.readFile('./src/public/output/2-number-of-matches-won-per-team.json','utf8')
.then(data => res.send(data));
})

app.get("/redCardsPerTeamIn2014",(req,res)=>{
    fs.readFile('./src/public/output/3-red-cards-issued-per-team-in-2014.json','utf8')
.then(data => res.send(data));
})

app.get("/probabilityOfTopTenPlayers",(req,res)=>{
    fs.readFile('./src/public/output/4-top-10-players-with-highest-probability-scoring-a-goal-in-a-match.json','utf8')
.then(data => res.send(data));
})

app.listen(port, () => console.log(`Server is listening on port ${port}`));
