const express = require("express");
const bodyParser = require("body-parser");
const { parseDictionary } = require("./parse-dictionary");
const { getTranslation } = require("./get-translation");
const { MongoClient } = require("mongodb");
const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

MongoClient.connect(
    "mongodb://localhost:27017",
    { useNewUrlParser: true }
)
    .then(client => client.db("lab4"))
    .then(db => db.collection("dictionary"))
    .then(col => {
        app.post("/translation", (req, res) => {
            // TODO: fix this
            const { origin, translation, textarea } = req.body;
            getTranslation(origin, translation, textarea, col).then(response => {
                return res.json({ response })
            });
        });

        app.post("/update", (req, res) => {
            const { origin, translation, textinput } = req.body;
            const entries = parseDictionary(origin, translation, textinput);
            col.insertMany(entries, { ordered: false }).then(record => {
                return res.json({ update: record })
            });
        });

        app.listen("5000", () => {
            console.log("listening on 5000");
        });
    })
    .catch(reason => {
        console.log(reason);
    });
