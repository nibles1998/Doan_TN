const fs = require('fs'),
    path = require('path');
const RootModel = {}

const requireFile = async function(srcPath, obj) {
    let stat, curPath, rKey;
    const config = await require('../config');
    const instanceDB = await config.Db();
    fs.readdirSync(srcPath).forEach(async (f) => {
        if (f === "index.js") {
            return;
        }
        curPath = path.join(srcPath, f);
        stat = fs.lstatSync(curPath);
        if (stat.isFile() && f.endsWith(".js")) {
            const output = await require(curPath);
            await output.init(instanceDB);
            rKey = f[0].toUpperCase() + f.substr(1, f.length - 4);
            obj[rKey] = output.model;
        }
    })
    return obj;
}

module.exports = requireFile(__dirname, RootModel);