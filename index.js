const express = require("express");
const path = require("path");

const port = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

app.get("/app.js", (req, res) => {
  res.sendFile(path.resolve("public/app.js"));
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
