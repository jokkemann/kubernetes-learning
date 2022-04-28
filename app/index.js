const express = require("express");
const app = express();
const os = require("os");

const pmq = require("popular-movie-quotes");

app.listen(3000, () => {
    console.log("listening on port 3000");
});

app.get("/", (req, res) => {
    console.log("In default get");
    res.send(createResponse(1));
});

app.get("/error", (req, res) => {
    console.error("Manually returning error to client");
    res.status(500).send("Error on host: " + os.hostname());
});

app.get("/error2", (req, res) => {
    console.error("Throwing error");
    throw new Error("Everything breaks!");
});

app.get("/:num", (req, res) => {
    console.log("Returning", req.params.num, "quotes");
    res.send(createResponse(req.params.num));
});

function createResponse(numQuotes = 1) {
    return {
        quotes: pmq.getSomeRandom(numQuotes),
        hostName: os.hostname()
    };
}
