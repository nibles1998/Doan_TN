const tour_TypeTourModel = require('../models').model.Tour_TypeTour;

const tour_TypeTourCtrl = {};

tour_TypeTourCtrl.getMany = async function (req, res, next) {
    try {
        const tour = await tour_TypeTourModel.findAll({});
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

tour_TypeTourCtrl.getById = async function (req, res, next) {
    try {
        const tour = await tour_TypeTourModel.findByPk(req.params.id);
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

tour_TypeTourCtrl.createData = async function (req, res, next) {
    try {
        await tour_TypeTourModel.create(req.body);
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

tour_TypeTourCtrl.updateById = async function (req, res, next) {
    try {
        const { id } = req.params;
        await tour_TypeTourModel.update(req.body, {
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

tour_TypeTourCtrl.deleteById = async function (req, res, next) {
    try {
        const { id } = req.params;
        await tour_TypeTourModel.destroy({ where: { id } });
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

module.exports = tour_TypeTourCtrl;