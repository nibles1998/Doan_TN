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
        const roleKey = Object.keys(roleOption);
        if (roleKey.length > 0 && roleOption !== null && roleOption !== undefined) {
            let checkOption = true;
            for (let item of roleKey) {
                if (userRole[item] !== roleOption[item]) {
                    checkOption = false;
                    return res.status(400).json({
                        success: false,
                        message: "Bạn không được cấp quyền sử dụng chức năng này!"
                    });
                }
            }
        }
        next();
    }
}

module.exports = role;