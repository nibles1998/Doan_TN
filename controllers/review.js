const reviewModel = require('../models').model.Review;

const reviewCtrl = {};

reviewCtrl.getMany = async function (req, res, next) {
    try {
        const query = req.query;
        const whereQuery = {};
        const sortQuery = {};
        const allKeys = Object.keys(query);
        for (let index = 0; index < allKeys.length; index++) {
            const _queryKey = allKeys[index];
            if (_queryKey == "userId") {
                whereQuery.userId = query[_queryKey];
                continue;
            }
            if (_queryKey == "tourId") {
                whereQuery.tourId = query[_queryKey];
                continue;
            }
            if (_queryKey == "sortrating") {
                sortQuery["rating"] = query[_queryKey];
                continue;
            }
        }

        const review = await reviewModel.find(whereQuery).sort(sortQuery);
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
        const review = await reviewModel.findById(req.params._id);
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
        const { _id } = req.params;
        await reviewModel.update({ _id }, { $set: req.body }, { new: true });
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
        const { _id } = req.params;
        await reviewModel.deleteOne({ _id });
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