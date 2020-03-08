const companyModel = require('../models').model.Company;

const companyCtrl = {};

companyCtrl.getMany = async function (req, res, next) {
    try {
        const user = await companyModel.findAll();
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

companyCtrl.getById = async function (req, res, next) {
    try {
        const user = await companyModel.findByPk(req.params.id);
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

companyCtrl.createData = async function (req, res, next) {
    try {
        const user = await companyModel.create(req.body);
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

companyCtrl.updateById = async function (req, res, next) {
    try {
        const { id } = req.params;
        const user = await companyModel.update(req.body, {
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

companyCtrl.deleteById = async function (req, res, next) {
    try {
        const { id } = req.params;
        await companyModel.destroy({ where: { id } });
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

module.exports = companyCtrl;