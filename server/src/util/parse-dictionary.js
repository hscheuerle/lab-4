const parseDictionary = (origin, translation, text) => {
    return text
        .split("\n")
        .filter(line => !(line.startsWith("#") || line === ""))
        .map(line => line.split("\t", 3))
        .reduce((arr, pair) => {
            pair[0].split(";").forEach(key => {
                pair[1].split(";").forEach(val => {
                    arr.push({
                        [origin.trim()]: key.trim(),
                        [translation.trim()]: val.trim()
                    });
                });
            });
            return arr;
        }, []);
};

module.exports = {
    parseDictionary
};
