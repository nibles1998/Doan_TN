const userModel = require('../models').model.User;
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
        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};

userCtrl.getById = async function (req, res, next) {
    try {
        const user = await userModel.findByPk(req.params.id);
        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};

userCtrl.createData = async function (req, res, next) {
    try {
        let { email, password, dateOfBirth } = req.body;

        const user = await userModel.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Email is existed!"
            });
        }
        const hash = bcrypt.hashSync(password, salt);
        req.body.password = hash;

        if (dateOfBirth) {
            dateOfBirth = new Date(dateOfBirth).toLocaleString({ timeZone: "VN" });
            req.body.dateOfBirth = dateOfBirth;
        }

        await userModel.create(req.body);
        return res.status(200).json({
            success: true,
            message: "Create User successfully!"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};

userCtrl.updateById = async function (req, res, next) {
    try {
        const { id } = req.params;
        const { password } = req.body;
        let { dateOfBirth } = req.body;

        if (password) {
            const hash = bcrypt.hashSync(password, salt);
            req.body.password = hash;
        }

        if (dateOfBirth) {
            dateOfBirth = new Date(dateOfBirth).toLocaleString({ timeZone: "VN" });
            req.body.dateOfBirth = dateOfBirth;
        }

        await userModel.update(req.body, {
            where: { id }
        });
        return res.status(200).json({
            success: true,
            message: "Update User successfully!"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};

userCtrl.deleteById = async function (req, res, next) {
    try {
        const { id } = req.params;
        await userModel.destroy({ where: { id } });
        return res.status(200).json({
            success: true,
            message: "Delete User successfully!"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};

module.exports = userCtrl;