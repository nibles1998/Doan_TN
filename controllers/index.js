const fs = require('fs'),
    path = require('path');
const RootCtrl = {}

const requireFile = function (srcPath, obj) {
    return new Promise(async (cb) => {
        let stat, curPath, rKey;
        await Promise.all(fs.readdirSync(srcPath).map(async (f) => {
            if (f === "index.js") {
                return;
            }
            curPath = path.join(srcPath, f);
            stat = fs.lstatSync(curPath);
            if (stat.isFile() && f.endsWith(".js")) {
                const output = await require(curPath);
                rKey = f[0].toUpperCase() + f.substr(1, f.length - 4);
                obj[rKey] = output;
            }
        }));
        cb(obj);
    })
}

module.exports = {
    controller: RootCtrl,
    init: async () => await requireFile(__dirname, RootCtrl)
};