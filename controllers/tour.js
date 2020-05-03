const tourModel = require('../models').model.Tour;
const TYPETOUR = require('../models/typeTour');

const tourCtrl = {};

tourCtrl.getMany = async function (req, res, next) {
    try {
        const query = req.query;
        const whereQuery = {};
        const sortQuery = [];
        const allkeys = Object.keys(query);
        for (let index = 0; index < allkeys.length; index++) {
            const _queryKey = allkeys[index];
            if (_queryKey == "begin") {
                whereQuery.startedDate = query[_queryKey] - 0;
                continue;
            }
            if (_queryKey == "location") {
                whereQuery.location = query[_queryKey];
                continue;
            }
            if (_queryKey == "sortnamedesc") {
                if (query[_queryKey])
                    sortQuery.push(["tourName", "DESC"]);
                continue;
            }
            if (_queryKey == "sortnameasc") {
                if (query[_queryKey])
                    sortQuery.push(["tourName", "ASC"]);
                continue;
            }
            if (_queryKey == "sortpricedesc") {
                if (query[_queryKey])
                    sortQuery.push(["price", "DESC"]);
                continue;
            }
            if (_queryKey == "sortpriceasc") {
                if (query[_queryKey])
                    sortQuery.push(["price", "ASC"]);
                continue;
            }
        }

        const tour = await tourModel.findAll({
            where: whereQuery,
            oder: sortQuery,
            include: {
                model: TYPETOUR.model,
                as: "typeTours"
            }
        });
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

tourCtrl.getById = async function (req, res, next) {
    try {
        const tour = await tourModel.findByPk(req.params.id);
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

tourCtrl.createData = async function (req, res, next) {
    try {
        await tourModel.create(req.body);
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

tourCtrl.updateById = async function (req, res, next) {
    try {
        const { id } = req.params;
        if ((req.body.child + req.body.adult) > req.body.emptySeat)
            throw error;
        await tourModel.update(req.body, {
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