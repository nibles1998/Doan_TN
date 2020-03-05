const fs = require("fs"),
    path = require("path")
const express = require('express');
const bodyParser = require('body-parser');
const App = {}, ignorePath = ["node_modules", ".git"];

const isIgnore = function (path) {
    return ignorePath.indexOf(path) !== -1;
}

const requireAll = function (srcPath, app, obj) {
    let stat, curPath, rKey;
    fs.readdirSync(srcPath).forEach((f) => {
        if (f === "index.js") {
            return;
        }
        curPath = path.join(srcPath, f);
        stat = fs.lstatSync(curPath);
        if (stat.isDirectory() && !isIgnore(f)) {
            const output = require(curPath);
            rKey = f[0].toUpperCase() + f.substr(1)
            if (typeof output === "function") {
                obj[rKey] = output(app);
                return;
            }
            obj[rKey] = output;
        }
    })
}

const startServer = async function () {
    const server = express();
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());
    server.use((req, res, next) => {
        console.log(`Request comming: ${req.url}`)
        next()
    })
    try {
        requireAll(__dirname, server, App);
        await requireDB()
        const { Config: rootConfig } = App;
        const PORT = rootConfig.App.PORT || 3000;

        server.listen(PORT, () => {
            console.log('\x1b[36m%s\x1b[0m', `Server is running on port ${PORT}`)
        });

    } catch (error) {
        console.error(error)
    }
}

startServer(); 