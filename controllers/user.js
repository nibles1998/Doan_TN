const userModel = require('../models').model.User;

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

module.exports = userCtrl;