const reviewModel = require('../models').model.Review;

const reviewCtrl = {};

reviewCtrl.getMany = async function (req, res, next) {
    try {
        const review = await reviewModel.findAll();
        res.status(200).json({
            success: true,
            data: review
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
};

reviewCtrl.getById = async function (req, res, next) {
    try {
        const review = await reviewModel.findByPk(req.params.id);
        res.status(200).json({
            success: true,
            data: review
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
};

reviewCtrl.createData = async function (req, res, next) {
    try {
        await reviewModel.create(req.body);
        res.status(200).json({
            success: true,
            message: "Create Review successfully!"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
};

reviewCtrl.updateById = async function (req, res, next) {
    try {
        const { id } = req.params;
        await reviewModel.update(req.body, {
            where: { id }
        });
        res.status(200).json({
            success: true,
            message: "Update Review successfully!"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
};

reviewCtrl.deleteById = async function (req, res, next) {
    try {
        const { id } = req.params;
        await reviewModel.destroy({ where: { id } });
        res.status(200).json({
            success: true,
            message: "Delete Review successfully!"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
};

module.exports = reviewCtrl;