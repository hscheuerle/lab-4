const { parseDictionary } = require('../util/parse-dictionary')

const dictionary = (req, res, next) => {
    const {
        origin, // the language with translations
        destination, // the language from translations
        dictionary // the dictionary text being parsed
    } = req.body;
    const json = parseDictionary(origin, destination, dictionary)
    req.dictionary = json
    next();
};

module.exports = { dictionary };
