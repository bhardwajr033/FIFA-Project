const path = require("path");
const fs = require("fs").promises;

const requestListener = (req, res) => {
  const url = req.originalUrl;

  if (url === "/" && req.method === "GET") {
    fs.readFile(path.resolve("./public/index.html"), "utf8")
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send("Error while loading index.html"));
  } else if (url === "/app.js" && req.method === "GET") {
    fs.readFile(path.resolve("public/app.js"), "utf-8")
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send("Error while reading app.js"));
  } else if (url === "/style.css" && req.method === "GET") {
    fs.readFile(path.resolve("public/style.css"), "utf-8")
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send("Error while reading style.css"));
  } else if (url === "/graphLabels" && req.method === "GET") {
    fs.readFile(path.resolve("public/graphLabels.json"), "utf-8")
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send("Error while reading graphLabels"));
  } else if (url === "/matchesPerCity" && req.method === "GET") {
    fs.readFile(
      path.resolve(
        "./src/public/output/1-number-of-matches-played-per-city.json"
      ),
      "utf-8"
    )
      .then((data) => res.send(data))
      .catch((err) =>
        res.status(500).send("Error while reading matchesPerCity")
      );
  } else if (url === "/matchesWonPerTeam" && req.method === "GET") {
    fs.readFile(
      path.resolve("./src/public/output/2-number-of-matches-won-per-team.json"),
      "utf-8"
    )
      .then((data) => res.send(data))
      .catch((err) =>
        res.status(500).send("Error while reading matchesWonPerTeam")
      );
  } else if (url === "/redCardsPerTeamIn2014" && req.method === "GET") {
    fs.readFile(
      path.resolve(
        "./src/public/output/3-red-cards-issued-per-team-in-2014.json"
      ),
      "utf-8"
    )
      .then((data) => res.send(data))
      .catch((err) =>
        res.status(500).send("Error while reading redCardsPerTeamIn2014")
      );
  } else if (url === "/probabilityOfTopTenPlayers" && req.method === "GET") {
    fs.readFile(
      path.resolve(
        "./src/public/output/4-top-10-players-with-highest-probability-scoring-a-goal-in-a-match.json"
      ),
      "utf-8"
    )
      .then((data) => res.send(data))
      .catch((err) =>
        res.status(500).send("Error while reading probabilityOfTopTenPlayers")
      );
  } else {
    res.status(400).send("Wrong Request");
  }
};

module.exports = requestListener;
