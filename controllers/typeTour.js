const typeTourModel = require('../models').model.TypeTour;

const typeTourCtrl = {};

typeTourCtrl.getMany = async function (req, res, next) {
    try {
        const query = req.query;
        const whereQuery = {};
        const allKeys = Object.keys(query);
        for (let index = 0; index < allKeys.length; index++) {
            const _queryKey = allKeys[index];
            if (_queryKey == "type") {
                whereQuery.type = query[_queryKey];
                continue;
            }
        }

        const tour = await typeTourModel.findAll({ where: whereQuery });
        return res.status(200).json({
            success: true,
            data: tour
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Error when get all TypeTour!"
        });
    }
};

typeTourCtrl.getById = async function (req, res, next) {
    try {
        const tour = await typeTourModel.findByPk(req.params.id);
        return res.status(200).json({
            success: true,
            data: tour
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Error when get TypeTour by id!"
        });
    }
};

typeTourCtrl.createData = async function (req, res, next) {
    try {
        const { type } = req.body;
        const typeTour = await typeTourModel.findOne({ where: { type } });
        if (typeTour) {
            return res.status(400).json({
                success: false,
                message: "Type is exist!"
            });
        }
        await typeTourModel.create(req.body);
        return res.status(200).json({
            success: true,
            message: "Create TypeTour successfully!"
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Error when create TypeTour!"
        });
    }
};

typeTourCtrl.updateById = async function (req, res, next) {
    try {
        const { type } = req.body;
        const typeTour = await typeTourModel.findOne({ where: { type } });
        if (typeTour) {
            return res.status(400).json({
                success: false,
                message: "Type is exist!"
            });
        }
        const { id } = req.params;
        await typeTourModel.update(req.body, {
            where: { id }
        });
        return res.status(200).json({
            success: true,
            message: "Update TypeTour successfully!"
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Error when update TypeTour!"
        });
    }
};

typeTourCtrl.deleteById = async function (req, res, next) {
    try {
        const { id } = req.params;
        await typeTourModel.destroy({ where: { id } });
        return res.status(200).json({
            success: true,
            message: "Delete TypeTour successfully!"
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Error when delete TypeTour!"
        });
    }
};

module.exports = typeTourCtrl;