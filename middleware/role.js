const role = {};

role.checkRole = function (roleType, roleOption) {
    return async function (req, res, next) {
        const userRole = req.role;
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
                    message: "Bạn không có quyền truy cập chức năng này!"
                });
            }
        }

        if (Object.keys(roleOption).length > 0 && roleOption !== null && roleOption !== undefined) {
            let checkOption = true;
            const key = Object.keys(roleOption);
            for (let item of key) {
                if (item === "create") {
                    if (roleOption[item] !== userRole.create) {
                        checkOption = false;
                    }
                }
                if (item === "read") {
                    if (roleOption[item] !== userRole.read) {
                        checkOption = false;
                    }
                }
                if (item === "update") {
                    if (roleOption[item] !== userRole.update) {
                        checkOption = false;
                    }
                }
                if (item === "delete") {
                    if (roleOption[item] !== userRole.delete) {
                        checkOption = false;
                    }
                }
            }

            if (!checkOption) {
                return res.status(400).json({
                    success: false,
                    message: "Bạn không được cấp quyền sử dụng chức năng này!"
                });
            }
        }
        next();
    }
}

module.exports = role;