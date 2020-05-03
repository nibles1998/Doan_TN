const typeTourModel = require('../models').model.TypeTour;

const typeTourCtrl = {};

typeTourCtrl.getMany = async function (req, res, next) {
    try {
        const tour = await typeTourModel.findAll();
        res.status(200).json({
            success: true,
            data: tour
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
};

typeTourCtrl.getById = async function (req, res, next) {
    try {
        const tour = await typeTourModel.findByPk(req.params.id);
        res.status(200).json({
            success: true,
            data: tour
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
};

typeTourCtrl.createData = async function (req, res, next) {
    try {
        await typeTourModel.create(req.body);
        res.status(200).json({
            success: true,
            message: "Create successfully!"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
};

typeTourCtrl.updateById = async function (req, res, next) {
    try {
        const { id } = req.params;
        await typeTourModel.update(req.body, {
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

typeTourCtrl.deleteById = async function (req, res, next) {
    try {
        const { id } = req.params;
        await typeTourModel.destroy({ where: { id } });
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

module.exports = typeTourCtrl;