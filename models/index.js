const fs = require('fs'),
    path = require('path');
const RootModel = {}

const requireFile = function (srcPath, obj) {
    return new Promise(async (cb) => {
        let stat, curPath, rKey;
        const config = await require('../config').init();
        const instanceDB = await config.Db();
        const files = fs.readdirSync(srcPath);
        await Promise.all(
            files.map(async (f) => {
                if (f === "index.js") {
                    return;
                }
                curPath = path.join(srcPath, f);
                stat = fs.lstatSync(curPath);
                if (stat.isFile() && f.endsWith(".js")) {
                    const output = await require(curPath);
                    if (output.type == "postgresql") {
                        await output.init(instanceDB);
                    }
                    rKey = f[0].toUpperCase() + f.substr(1, f.length - 4);
                    obj[rKey] = output.model;
                }
            })
        );
        cb(obj);
    })
}

module.exports = {
    model: RootModel,
    init: async () => await requireFile(__dirname, RootModel)
};