const userModel = require('../models').model.User;
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/app');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const userCtrl = {};

userCtrl.getMany = async function (req, res, next) {
    try {
        const query = req.query;
        const whereQuery = {};
        const allKeys = Object.keys(query);
        for (let index = 0; index < allKeys.length; index++) {
            const _queryKey = allKeys[index];
            if (_queryKey == "name") {
                whereQuery.fullName = query[_queryKey];
                continue;
            }
            if (_queryKey == "email") {
                whereQuery.email = query[_queryKey];
                continue;
            }
        }
        const user = await userModel.findAll({ where: whereQuery });
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
};

userCtrl.getById = async function (req, res, next) {
    try {
        const user = await userModel.findByPk(req.params.id);
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
};

userCtrl.createData = async function (req, res, next) {
    try {
        let { password } = req.body;
        const hash = bcrypt.hashSync(password, salt);
        req.body.password = hash;
        await userModel.create(req.body);
        res.status(200).json({
            success: true,
            message: "Create User successfully!"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
};

userCtrl.updateById = async function (req, res, next) {
    try {
        const { id } = req.params;
        await userModel.update(req.body, {
            where: { id }
        });
        res.status(200).json({
            success: true,
            message: "Update User successfully!"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
};

userCtrl.deleteById = async function (req, res, next) {
    try {
        const { id } = req.params;
        await userModel.destroy({ where: { id } });
        res.status(200).json({
            success: true,
            message: "Delete User successfully!"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
};

userCtrl.getToken = async function (req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({
            where: { email }
        });

        if (!user) {
            res.status(400).json({
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
            res.status(200).json({
                success: true,
                userId: user.id,
                roleId: user.roleId,
                token
            });
            next();
        } else {
            res.status(400).json({
                success: false,
                message: "Sai mật khẩu!"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Lỗi lấy Token!"
        });
    }
};

userCtrl.authenticateJWT = async function (req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, JWT_KEY, (err, user) => {
                if (err) {
                    res.status(403).json({
                        success: false,
                        message: "Bạn không có quyền truy cập!"
                    });
                }

                req.user = user;
                next();
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Lỗi quá trình xác thực!"
        });
    }
};

module.exports = userCtrl;