const natural = require("natural");

const getTranslation = async (origin, translation, textarea, col) => {
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(textarea);
    let chunks = "";
    for (const token of tokens) {
        const doc = await col.findOne(
            { [origin.trim()]: token },
            { projection: { _id: 0, [translation]: 1 } }
        );
        if (doc) {
            chunks += doc[translation] + " ";
        } else {
            chunks += `(${token})'`;
        }
    }
    return chunks;
};

module.exports = {
    getTranslation
};
