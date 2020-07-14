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
                message: "User not found!"
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
                message: "Wrong password!"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Get token is error!"
        });
    }
};

JWT_Authenticate.authenticateJWT = function (req, res, next) {
    return new Promise(() => {
        try {
            const authHeader = req.headers.authorization;

            if (authHeader) {
                const token = authHeader.split(' ')[1];
                jwt.verify(token, JWT_KEY, async (err, user) => {
                    if (err) {
                        return res.status(403).json({
                            success: false,
                            message: "You do not have access!"
                        });
                    }

                    const userInfo = await userModel.findByPk(user.id);
                    const userRoleInfo = await userRoleModel.findByPk(user.role);
                    req.user = userInfo;
                    req.role = userRoleInfo;
                    next();
                });
            } else {
                return res.status(403).json({
                    success: false,
                    message: "You have not granted access!"
                });
            }
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                success: false,
                message: "Error authentication process!"
            });
        }
    })

};

module.exports = JWT_Authenticate;