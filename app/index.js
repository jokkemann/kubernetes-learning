const express = require("express");
const app = express();

const pmq = require("popular-movie-quotes");

app.listen(3000, () => {
    console.log("listening on port 3000");
});

app.get("/", (req, res) => {
    res.send(pmq.getSomeRandom(1));
});
