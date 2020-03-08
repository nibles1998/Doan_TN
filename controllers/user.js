const userModel = require('../models').model.User;

const userCtrl = {};

userCtrl.getMany = async function (req, res, next) {
    try {
        const user = await userModel.findAll();
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
        const user = await userModel.create(req.body);
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

userCtrl.updateById = async function (req, res, next) {
    try {
        const { id } = req.params;
        const user = await userModel.update(req.body, {
            where: { id }
        });
        res.status(200).json({
            success: true,
            message: "Update successfully!"
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
            message: "Delete successfully!"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
};

module.exports = userCtrl;