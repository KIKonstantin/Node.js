const express = require("express");
const catalogController = require("./catalogController");
const createController = require("./createContoller");
const app = express();

app.use(express.static('static'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/img", (req, res) => {
    res.sendFile(__dirname + "/cat.jpg");
});

app.use("/catalog", catalogController);
app.use("/create", createController);

app.get("/data", (req, res) => {
    res.json([{
            name: "Peter",
            age: 25,
        },
        {
            name: "John",
            age: 44,
        },
    ]);
});

app.all("*", (req, res) => {
    res
        .status(404)
        .send(
            "404 Bro this page isn't founded. Try going somewhare else. Maybe go to mainata si"
        );
});

app.listen(3000);