const parseDictionary = text => {
    return text
        .split("\n")
        .map(line => line.split("\t", 2))
        .reduce((map, pair) => {
            pair[0].split(" ; ").forEach(key => {
                map[key.replace(/[.]/g, '_')] = pair[1];
            });
            return map;
        }, {});
};

module.exports = {
    parseDictionary
};
