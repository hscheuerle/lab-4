const { MongoClient } = require("mongodb");

const mongoClient = () => (req, res, next) => {
    // FIXED set req.db to promise, not the resolve variable
    req.database = MongoClient.connect(
        "mongodb://localhost:27017",
        { useNewUrlParser: true }
    )
        .then(client => client.db("lab4"))
        .catch(reason => {
            throw Error(reason);
        });
    next();
};

module.exports = {
    mongoClient
};
