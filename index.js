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

app.get("/matchesPerCity",(req,res)=>{
    fs.readFile('./src/public/output/1-number-of-matches-played-per-city.json','utf8')
.then(data => res.send(data));
})

app.listen(port, () => console.log(`Server is listening on port ${port}`));
