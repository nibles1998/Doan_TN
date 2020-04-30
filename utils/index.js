function verifyInput(obj, arr) {
    let arrayAll = Object.entries(obj);
    let allKeyKeep = Object.keys(obj);
    let allValKeep = [];
    let newObj = {};

    let arrayRemove = [];
    let arrayRequire = [];

    for (let key of arr) {
        if (key.indexOf("-") > 0) {
            let str = key.replace("-", "");
            arrayRemove.push(str);
        }
        if (key.indexOf("!") > 0) {
            let str = key.replace("!", "");
            arrayRequire.push(str);
        }
    }

    for (let key of arrayRequire) {
        if (allKeyKeep.indexOf(key) < 0) {
            throw new Error("Require input has " + key);
        }
    }

    for (let key of allKeyKeep) {
        for (let item of arrayRemove) {
            if (key === item) {
                allKeyKeep.splice(allKeyKeep.indexOf(key), 1);
            }
        }
    }

    for (let key of arrayRemove) {
        if (allKeyKeep.indexOf(key) > 0) {
            throw new Error("Object not require " + key);
        }
    }

    for (let index of arrayAll) {
        for (let item of allKeyKeep) {
            if (index[0] === item) {
                allValKeep.push(index[1]);
            }
        }
    }

    for (let i = 0; i < allKeyKeep.length; i++) {
        newObj[allKeyKeep[i]] = allValKeep[i];
    }

    return newObj;
};

function refactorBody(arr) {
    return function (req, res, next) {
        try {
            verifyInput(req.body, arr);
            next();
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.toString()
            });
        }
    }
};

module.exports = refactorBody;