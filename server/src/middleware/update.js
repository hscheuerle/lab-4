const assert = require("assert");

const update = (req, res, next) => {
    // ! dont confuse with req.body.dictionary! which is the text posted
    const { dictionary, database } = req;
    const { origin, destination } = req.body;
    assert.ok(dictionary && database);

    database
        .then(db => db.collection("dictionary"))
        .then(col => {
            const promises = dictionary.map(diction => {
                return col.updateOne(
                    { [origin]: diction[origin] },
                    {
                        $set: {
                            [origin]: diction[origin],
                            [destination]: diction[destination]
                        }
                    },
                    { upsert: true }
                );
            });
            return Promise.all(promises);
        })
        .then(results => {
            req.update = results.reduce(
                (acc, result) => {
                    const mod = result.result.nModified === 1;
                    const ok = result.result.ok === 1;
                    acc.n += 1;
                    acc.mod += mod;
                    acc.ok += ok;
                    return acc;
                },
                {
                    n: 0,
                    mod: 0,
                    ok: 0
                }
            );
            return next();
        }) // FIXME do we return next before adding more to collection? since not in response?
        .then(() => database.then(db => db.collection("info")))
        .then(col => {
            col.updateOne(
                { name: "options" },
                {
                    $addToSet: {
                        available: { $each: [origin, destination] }
                    }
                },
                { upsert: true }
            );
        });
};

module.exports = {
    update
};
