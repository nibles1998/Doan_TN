const userModel = require('../models').model.User;
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const userRoleModel = require('../models').model.UserRole;
const fs = require('fs');

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
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Error when get all User!"
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
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Error when get User by id!"
        });
    }
};

userCtrl.createData = async function (req, res, next) {
    try {
        let { email, password, dateOfBirth } = req.body;
        console.log("BODY:", JSON.stringify(req.body, null, 2));
        const role = await userRoleModel.findAll({ where: { type: "Customer" } });

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

        req.body.roleId = role[0].id;
        req.body.photo = '';

        await userModel.create(req.body);
        return res.status(200).json({
            success: true,
            message: "Create User successfully!"
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Error when create User!"
        });
    }
};

userCtrl.updateById = async function (req, res, next) {
    try {
        const { id } = req.params;
        const { password } = req.body;
        let { dateOfBirth } = req.body;
        const userInfo = await userModel.findByPk(id);

        if (password) {
            const hash = bcrypt.hashSync(password, salt);
            req.body.password = hash;
        }

        if (dateOfBirth) {
            dateOfBirth = new Date(dateOfBirth).toLocaleString({ timeZone: "VN" });
            req.body.dateOfBirth = dateOfBirth;
        }

        const processFile = req.file || {};
        let orgName = processFile.originalname || '';
        if (orgName !== '') {
            if (userInfo.photo !== orgName) {
                orgName = orgName.trim().replace(/ /g, '-');

                const fullPathInServer = processFile.path;
                const newFullPath = `uploads/${orgName}`;
                fs.renameSync(fullPathInServer, newFullPath);

                req.body.photo = newFullPath.split("/")[1];
            }
        }

        await userModel.update(req.body, {
            where: { id }
        });
        return res.status(200).json({
            success: true,
            message: "Update User successfully!"
        });
    } catch (error) {
        console.log("ERROR:", error);
        return res.status(400).json({
            success: false,
            message: "Error when update User!"
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
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Error when delete User!"
        });
    }
};

module.exports = userCtrl;