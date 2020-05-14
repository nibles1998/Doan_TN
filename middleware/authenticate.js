const userModel = require('../models').model.User;
const userRoleModel = require('../models').model.UserRole;
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/app');
const bcrypt = require('bcrypt');

const JWT_Authenticate = {};

JWT_Authenticate.getToken = async function (req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Không tìm thấy User!"
            });
        }

        const isMatched = bcrypt.compareSync(password, user.password);

        if (isMatched) {
            const token = jwt.sign({
                id: user.id,
                role: user.roleId
            }, JWT_KEY);
            return res.status(200).json({
                success: true,
                userId: user.id,
                roleId: user.roleId,
                token
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Sai mật khẩu!"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Lỗi lấy Token!"
        });
    }
};

JWT_Authenticate.authenticateJWT = async function (req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            await jwt.verify(token, JWT_KEY, async (err, user) => {
                if (err) {
                    return res.status(403).json({
                        success: false,
                        message: "Bạn không có quyền truy cập!"
                    });
                }

                const userInfo = await userModel.findByPk(user.id);
                const userRoleInfo = await userRoleModel.findByPk(user.role);
                req.user = userInfo;
                req.role = userRoleInfo;
                next();
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Lỗi quá trình xác thực!"
        });
    }
};

module.exports = JWT_Authenticate;