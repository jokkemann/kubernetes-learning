const express = require("express");
const app = express();
const os = require("os");

const pmq = require("popular-movie-quotes");

app.listen(3000, () => {
    console.log("listening on port 3000");
});

app.get("/", (req, res) => {
    res.send(createResponse(1));
});

app.get("/:num", (req, res) => {
   res.send(createResponse(req.params.num));
});

function createResponse(numQuotes = 1) {
    return {
        quotes: pmq.getSomeRandom(numQuotes),
        hostName: os.hostname()
    };
}
