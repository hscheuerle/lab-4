const parseDictionary = (origin, translation, text) => {
    return text
        .split("\n")
        .map(line => line.split("\t", 2))
        .reduce((arr, pair) => {
            pair[0].split(" ; ").forEach(key => {
                arr.push({
                    [origin.trim()]: key.trim(),
                    [translation.trim()]: pair[1].trim()
                });
            });
            return arr;
        }, []);
};

module.exports = {
    parseDictionary
};
