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
            if (_queryKey == "userid") {
                whereQuery.userId = query[_queryKey];
                continue;
            }
            if (_queryKey == "tourid") {
                whereQuery.tourId = query[_queryKey];
                continue;
            }
            if (_queryKey == "sortrating") {
                sortQuery["rating"] = query[_queryKey];
                continue;
            }
        }

        const review = await reviewModel.find(whereQuery).sort(sortQuery);
        return res.status(200).json({
            success: true,
            data: review
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};

reviewCtrl.getById = async function (req, res, next) {
    try {
        const review = await reviewModel.findById(req.params._id);
        return res.status(200).json({
            success: true,
            data: review
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};

reviewCtrl.createData = async function (req, res, next) {
    try {
        await reviewModel.create(req.body);
        return res.status(200).json({
            success: true,
            message: "Create Review successfully!"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};

reviewCtrl.updateById = async function (req, res, next) {
    try {
        const { _id } = req.params;
        const now = new Date().toLocaleString({ timeZone: "VN" });
        req.body.updatedAt = now;
        await reviewModel.update({ _id }, { $set: req.body }, { new: true });
        return res.status(200).json({
            success: true,
            message: "Update Review successfully!"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};

reviewCtrl.deleteById = async function (req, res, next) {
    try {
        const { _id } = req.params;
        await reviewModel.deleteOne({ _id });
        return res.status(200).json({
            success: true,
            message: "Delete Review successfully!"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};

module.exports = reviewCtrl;