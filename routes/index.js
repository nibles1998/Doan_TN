const fs = require('fs'),
    path = require('path');
const RootRoute = {};

const requireFile = function (srcPath, obj) {
    return function (app) {
        return new Promise(async (cb) => {
            let stat, curPath, rKey;
            await Promise.all(fs.readdirSync(srcPath).map((f) => {
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
            }));
            for (let [pName, gRoute] of Object.entries(obj)) {
                if (app.use && gRoute) {
                    pName = "/" + pName.replace(/\//g, "").toLowerCase();
                    app.use(pName, gRoute);
                }
            }
            cb(obj);
        })

    }
}

module.exports = {
    route: RootRoute,
    init: () => requireFile(__dirname, RootRoute)
};