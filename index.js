const express = require("express");
const path = require("path");
const fs = require("fs").promises;

const port = process.env.PORT || 3000;

const app = express();

const requestListener = require(path.resolve("./src/server/requestListener"));

app.use(requestListener);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
