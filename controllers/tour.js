const tourModel = require('../models').model.Tour;

const tourCtrl = {};

tourCtrl.getMany = async function (req, res, next) {
    try {
        const user = await tourModel.findAll();
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

tourCtrl.getById = async function (req, res, next) {
    try {
        const user = await tourModel.findByPk(req.params.id);
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

tourCtrl.createData = async function (req, res, next) {
    try {
        const user = await tourModel.create(req.body);
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

tourCtrl.updateById = async function (req, res, next) {
    try {
        const { id } = req.params;
        const user = await tourModel.update(req.body, {
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

tourCtrl.deleteById = async function (req, res, next) {
    try {
        const { id } = req.params;
        await tourModel.destroy({ where: { id } });
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

module.exports = tourCtrl;