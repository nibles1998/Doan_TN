const tour_TypeTourModel = require('../models').model.Tour_TypeTour;

const tour_TypeTourCtrl = {};

tour_TypeTourCtrl.getMany = async function (req, res, next) {
    try {
        const query = req.query;
        const whereQuery = {};
        const allkeys = Object.keys(query);

        for (let index = 0; index < allkeys.length; index++) {
            const _queryKey = allkeys[index];
            if (_queryKey == "tourid") {
                whereQuery.tourId = [query[_queryKey]];
                continue;
            }
        }

        const tour = await tour_TypeTourModel.findAll({ where: whereQuery });
        return res.status(200).json({
            success: true,
            data: tour
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};

tour_TypeTourCtrl.getById = async function (req, res, next) {
    try {
        const tour = await tour_TypeTourModel.findByPk(req.params.id);
        return res.status(200).json({
            success: true,
            data: tour
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};

tour_TypeTourCtrl.createData = async function (req, res, next) {
    try {
        const { tourId, typeTourId } = req.body;
        const tour_TypeTour = await tour_TypeTourModel.findOne({ where: { tourId } });
        if (tour_TypeTour !== null) {
            if (tour_TypeTour.typeTourId === typeTourId) {
                return res.status(400).json({
                    success: false,
                    message: "Connect is exist!"
                });
            }
        }
        await tour_TypeTourModel.create(req.body);
        return res.status(200).json({
            success: true,
            message: "Create Tour_TypeTour successfully!"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};

tour_TypeTourCtrl.updateById = async function (req, res, next) {
    try {
        const { id } = req.params;
        const { tourId, typeTourId } = req.body;
        const tour_typeTour = await tour_TypeTourModel.findOne({ where: { tourId } });
        if (tour_typeTour.typeTourId === typeTourId) {
            return res.status(400).json({
                success: false,
                message: "Connect is exist!"
            });
        }
        await tour_TypeTourModel.update(req.body, {
            where: { id }
        });
        return res.status(200).json({
            success: true,
            message: "Update Tour_TypeTour successfully!"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};

tour_TypeTourCtrl.deleteById = async function (req, res, next) {
    try {
        const { id } = req.params;
        await tour_TypeTourModel.destroy({ where: { id } });
        return res.status(200).json({
            success: true,
            message: "Delete Tour_TypeTour successfully!"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};

module.exports = tour_TypeTourCtrl;