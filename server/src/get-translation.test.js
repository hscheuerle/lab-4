const { getTranslation } = require("./get-translation");
const { MongoClient } = require("mongodb");

MongoClient.connect(
    "mongodb://localhost:27017",
    { useNewUrlParser: true }
)
    .then(client => client.db("lab4"))
    .then(db => db.collection("dictionary"))
    .then(col => {
        return getTranslation(
            "english",
            "italian",
            "this is my first translation",
            col
        );
    })
    .then(res => {
        console.log(res);
    })
    .catch(reason => {
        console.log(reason);
    });
