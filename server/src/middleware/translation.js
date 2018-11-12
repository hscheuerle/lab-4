const natural = require("natural");
const assert = require("assert");

const translation = (req, res, next) => {
    const { body, database } = req;
    assert.ok(body && database);

    // TODO origin as name w/ source is throwing user errors
    const { origin, destination, source } = req.body;
    assert.ok(origin && destination && source, `${Object.keys(body)}`);

    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(source);
    
    database
        .then(db => db.collection("dictionary"))
        .then(col => {
            const promises = tokens.map(token =>
                col
                    .findOne(
                        { [origin]: token },
                        { projection: { _id: 0, [destination]: 1 } }
                    )
                    .then(result => {
                        if (result) return result[destination];
                        else return `(${token})`;
                    })
            );
            return Promise.all(promises);
        })
        .then(results => results.join(" "))
        .then(translation => {
            req.translation = translation;
        })
        .then(() => next());
};

module.exports = {
    translation
};
