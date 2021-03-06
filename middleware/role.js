const authenticate = require('../middleware/authenticate');

const role = {};

role.checkRole = function (roleType, roleOption) {
    return async function (req, res, next) {
        const userRole = req.role;
        if (!userRole.type) {
            return res.status(403).json({
                success: false,
                message: "You do not have access!"
            });
        }
        
        if (roleType.length > 0 && roleType !== null && roleType !== undefined) {
            let checkType = false;
            for (let role of roleType) {
                if (role === userRole.type) {
                    checkType = true;
                }
            }

            if (!checkType) {
                return res.status(400).json({
                    success: false,
                    message: "You do not have access!"
                });
            }
        }
        const roleKey = Object.keys(roleOption);
        if (roleKey.length > 0 && roleOption !== null && roleOption !== undefined) {
            let checkOption = true;
            for (let item of roleKey) {
                if (userRole[item] !== roleOption[item]) {
                    checkOption = false;
                    return res.status(400).json({
                        success: false,
                        message: "You have not granted access!"
                    });
                }
            }
        }
        next();
    };
};

role.checkRoleQuery = function (queries, roleType, roleOption) {
    return async function (req, res, next) {
        const query = req.query;
        const allKey = Object.keys(query);

        if (allKey.length > 0) {
            for (let item of queries) {
                if (query[item]) {
                    await authenticate.authenticateJWT(req, res, next);

                    if (res.headersSent === true) {
                        return next(false)
                    };

                    await role.checkRole(roleType, roleOption)(req, res, next);
                }
            }
            return next();
        } else {
            return next();
        }
    };
};

module.exports = role;