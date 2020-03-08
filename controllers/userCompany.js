const userCompanyModel = require('../models').model.UserCompany;

const userCompanyCtrl = {};

userCompanyCtrl.getMany = async function (req, res, next) {
    try {
        const user = await userCompanyModel.findAll();
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

userCompanyCtrl.getById = async function (req, res, next) {
    try {
        const user = await userCompanyModel.findByPk(req.params.id);
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

userCompanyCtrl.createData = async function (req, res, next) {
    try {
        const user = await userCompanyModel.create(req.body);
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

userCompanyCtrl.updateById = async function (req, res, next) {
    try {
        const { id } = req.params;
        const user = await userCompanyModel.update(req.body, {
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

userCompanyCtrl.deleteById = async function (req, res, next) {
    try {
        const { id } = req.params;
        await userCompanyModel.destroy({ where: { id } });
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

module.exports = userCompanyCtrl;