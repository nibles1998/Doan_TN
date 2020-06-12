const tourModel = require('../models').model.Tour;
const TYPETOUR = require('../models/typeTour');
const moment = require('moment');
const Sequelize = require('sequelize');
const fs = require('fs');
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
            if (_queryKey == "code") {
                whereQuery.tourCode = query[_queryKey];
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
            if (_queryKey == "companyid") {
                whereQuery.companyId = query[_queryKey];
                continue;
            }
            if (_queryKey == "time") {
                whereQuery.time = [query[_queryKey]];
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

tourCtrl.getById = async function (req, res, next) {
    try {
        const tour = await tourModel.findByPk(req.params.id, {
            include: {
                model: TYPETOUR.model,
                as: "typeTours"
            }
        });
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

tourCtrl.createData = async function (req, res, next) {
    try {
        const { tourCode, seat, time } = req.body;
        let { startedDate, endDate } = req.body;
        const tourInfo = await tourModel.findOne({ where: { tourCode } });

        if (tourInfo) {
            return res.status(400).json({
                success: false,
                message: "TourCode is exist!"
            });
        }

        if (time) {
            if (time < 3) {
                return res.status(400).json({
                    success: false,
                    message: "Time greater than or equal to 3"
                });
            }
        } else {
            req.body.time = 3;
        }

        req.body.emptySeat = seat;
        req.body.child = 0;
        req.body.adult = 0;

        startedDate = new Date(startedDate);
        endDate = new Date(endDate);

        req.body.startedDate = startedDate.toLocaleString({ timeZone: "VN" });
        req.body.endDate = endDate.toLocaleString({ timeZone: "VN" });

        const processFile = req.file || {};
        let orgName = processFile.originalname || '';
        orgName = orgName.trim().replace(/ /g, '-');

        const fullPathInServer = processFile.path;
        const newFullPath = `uploads/${orgName}`;
        fs.renameSync(fullPathInServer, newFullPath);

        req.body.photo = newFullPath.split("/")[1];

        if (endDate.getTime() < startedDate.getTime()) {
            return res.status(400).json({
                success: false,
                message: "endDate is smaller than startedDate!"
            });
        }

        const tour = await tourModel.create(req.body);
        return res.status(200).json({
            success: true,
            data: tour,
            message: "Create Tour successfully!"
        });
    } catch (error) {
        console.log("error: ", error);
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};

tourCtrl.updateById = async function (req, res, next) {
    try {
        const { id } = req.params;
        const { tourCode, seat, child, adult, time } = req.body;
        let { startedDate, endDate } = req.body;
        const tourInfo = await tourModel.findByPk(id);
        if (tourCode) {
            const code = await tourModel.findOne({ where: { tourCode } });
            if (code) {
                return res.status(400).json({
                    success: false,
                    message: "TourCode is exist!"
                });
            }
        }

        if (time) {
            if (time < 3) {
                return res.status(400).json({
                    success: false,
                    message: "Time greater than or equal to 3"
                });
            }
        }

        if (seat) {
            if (seat < (tourInfo.child + tourInfo.adult + tourInfo.emptySeat)) {
                return res.status(400).json({
                    success: false,
                    message: "Wrong number of seats!"
                });
            } else {
                req.body.emptySeat = seat - (tourInfo.child + tourInfo.adult);
            }
        }

        if (child && adult) {
            if ((child + adult) > tourInfo.emptySeat) {
                return res.status(400).json({
                    success: false,
                    message: "Not enough emptySeat!"
                });
            }
        }

        const processFile = req.file || {};
        let orgName = processFile.originalname || '';
        if (orgName !== '') {
            if (tourInfo.photo !== orgName) {
                orgName = orgName.trim().replace(/ /g, '-');

                const fullPathInServer = processFile.path;
                const newFullPath = `uploads/${orgName}`;
                fs.renameSync(fullPathInServer, newFullPath);

                req.body.photo = newFullPath.split("/")[1];
            }
        }

        if (endDate || startedDate) {
            startedDate = new Date(startedDate);
            endDate = new Date(endDate);

            req.body.startedDate = startedDate.toLocaleString({ timeZone: "VN" });;
            req.body.endDate = endDate.toLocaleString({ timeZone: "VN" });;

            if (endDate) {
                if (endDate.getTime() <= (tourInfo.startedDate).getTime()) {
                    return res.status(400).json({
                        success: false,
                        message: "endDate input is smaller than startedDate!"
                    });
                }
            }

            if (startedDate) {
                if ((tourInfo.endDate).getTime() <= startedDate.getTime()) {
                    return res.status(400).json({
                        success: false,
                        message: "endDate is smaller than startedDate input!"
                    });
                }
            }

        }

        const tour = await tourModel.update(req.body, {
            where: { id }
        });
        return res.status(200).json({
            success: true,
            data: tour,
            message: "Update Tour successfully!"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};

tourCtrl.deleteById = async function (req, res, next) {
    try {
        const { id } = req.params;
        await tourModel.destroy({ where: { id } });
        return res.status(200).json({
            success: true,
            message: "Delete Tour successfully!"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};

module.exports = tourCtrl;