const path = require("path");
const fs = require("fs").promises;

const requestListener = (req, res) => {
  const url = req.originalUrl;

  if (req.method === "GET") {
    switch (url) {
      case "/":
        fs.readFile(path.resolve("./public/index.html"), "utf8")
          .then((data) => res.send(data))
          .catch((err) =>
            res.status(500).send("Error while loading index.html")
          );
        break;

      case "/app.js":
        fs.readFile(path.resolve("public/app.js"), "utf-8")
          .then((data) => res.send(data))
          .catch((err) => res.status(500).send("Error while reading app.js"));
        break;

      case "/style.css":
        fs.readFile(path.resolve("public/style.css"), "utf-8")
          .then((data) => res.send(data))
          .catch((err) =>
            res.status(500).send("Error while reading style.css")
          );
        break;

      case "/graphLabels":
        fs.readFile(path.resolve("public/graphLabels.json"), "utf-8")
          .then((data) => res.send(data))
          .catch((err) =>
            res.status(500).send("Error while reading graphLabels")
          );
        break;

      case "/matchesPerCity":
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
        break;

      case "/matchesWonPerTeam":
        fs.readFile(
          path.resolve(
            "./src/public/output/2-number-of-matches-won-per-team.json"
          ),
          "utf-8"
        )
          .then((data) => res.send(data))
          .catch((err) =>
            res.status(500).send("Error while reading matchesWonPerTeam")
          );
        break;

      case "/redCardsPerTeamIn2014":
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
        break;

      case "/probabilityOfTopTenPlayers":
        fs.readFile(
          path.resolve(
            "./src/public/output/4-top-10-players-with-highest-probability-scoring-a-goal-in-a-match.json"
          ),
          "utf-8"
        )
          .then((data) => res.send(data))
          .catch((err) =>
            res
              .status(500)
              .send("Error while reading probabilityOfTopTenPlayers")
          );
        break;
        
      default:
        res.status(400).send("Wrong Request");
    }
  } else {
    res.status(400).send("Wrong Request");
  }
};

module.exports = requestListener;
