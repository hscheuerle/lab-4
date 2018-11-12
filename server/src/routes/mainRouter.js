const { translation } = require("../middleware/translation");
const { dictionary } = require("../middleware/dictionary");
const { update } = require("../middleware/update");

const { Router } = require("express");
const router = Router();

// get available languages
router.get("/options", (req, res) => {
    const { database } = req;
    database
        .then(db => db.collection("info"))
        .then(col => col.findOne({ name: "options" }))
        .then(options => {
            return res.json({ options: options.available });
        });
});

// update dictionary collection with new dictionary file
// @param { origin, destination, dictionary}
router.post("/dictionary-update", [dictionary, update], (req, res) =>
    res.send(req.update)
);

// get the translation of source text
// @param { origin, destination, source }
router.post("/get-translation", translation, (req, res) =>
    res.send(req.translation)
);

module.exports = router;
