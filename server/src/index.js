const express = require("express");
const bodyParser = require("body-parser");
const { parseDictionary } = require("./parse-dictionary");
const { MongoClient } = require("mongodb");
const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

MongoClient.connect(
    "mongodb://localhost:27017",
    { useNewUrlParser: true }
)
    .then(client => client.db("lab4"))
    .then(db => db.collection("dictionaries"))
    .then(col => {
        app.post("/translation", (req, res) => {
            const { origin, translation, textarea } = req.body;
            col.findOne({ _id: `${origin}-${translation}` }).then(doc => {
                res.json({ found: doc.map[textarea] });
            })
        });

        app.post("/update", (req, res) => {
            const { origin, translation, textinput } = req.body;
            const map = parseDictionary(textinput);
            // change method?
            col.insertOne({ _id: `${origin}-${translation}`, map }).then(
                status => {
                    res.json({ update: status });
                }
            );
        });

        app.listen("5000", () => {
            console.log("listening on 5000");
        });
    })
    .catch(reason => {
        console.log(reason);
    });
