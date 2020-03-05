const fs = require('fs'),
    path = require('path');
const RootModel = {}

const requireFile = function(srcPath, obj) {
    let stat, curPath, rKey;
    fs.readdirSync(srcPath).forEach((f) => {
        if (f === "index.js") {
            return;
        }
        curPath = path.join(srcPath, f);
        stat = fs.lstatSync(curPath);
        if (stat.isFile() && f.endsWith(".js")) {
            const output = require(curPath);
            rKey = f[0].toUpperCase() + f.substr(1, f.length - 4);
            obj[rKey] = output;
        }
    })
    return obj;
}

module.exports = requireFile(__dirname, RootModel);