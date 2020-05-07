const tourModel = require('../models').model.Tour;
const TYPETOUR = require('../models/typeTour');
const moment = require('moment');
const Sequelize = require('sequelize')
const tourCtrl = {};

tourCtrl.getMany = async function (req, res, next) {
    try {
        const query = req.query;
        const whereQuery = {};
        const sortQuery = [];
        const allkeys = Object.keys(query);

        // 
        for (let index = 0; index < allkeys.length; index++) {
            const _queryKey = allkeys[index];
            if (_queryKey == "begin") {
                let date = query[_queryKey];
                const startDate = moment(date).format('YYYY-MM-DD');
                const endDate = moment(date).endOf('month').format('YYYY-MM-DD');
                whereQuery.startedDate =
                {
                    [Sequelize.Op.gte]: startDate,
                    [Sequelize.Op.lte]: endDate
                };
                continue;
            }
            if (_queryKey == "location") {
                whereQuery.location = query[_queryKey];
                continue;
            }
            if (_queryKey == "sortname") {
                if (query[_queryKey])
                    sortQuery.push(["tourName", query[_queryKey]]);
                continue;
            }
            if (_queryKey == "sortprice") {
                if (query[_queryKey])
                    sortQuery.push(["price", query[_queryKey]]);
                continue;
            }
        }

        const tour = await tourModel.findAll({
            where: whereQuery,
            order: sortQuery,
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
            message: "Create Tour successfully!"
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
            message: "Update Tour successfully!"
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
            message: "Delete Tour successfully!"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
};

module.exports = tourCtrl;