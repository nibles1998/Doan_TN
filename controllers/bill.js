const billModel = require('../models').model.Bill;
const tourModel = require('../models').model.Tour;
const moment = require('moment');

const billCtrl = {};

billCtrl.getMany = async function (req, res, next) {
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
            if (_queryKey == "sortprice") {
                if (query[_queryKey])
                    sortQuery["price"] = query[_queryKey];
                continue;
            }
            if (_queryKey == "sorttotal") {
                if (query[_queryKey])
                    sortQuery["total"] = query[_queryKey];
                continue;
            }
            if (_queryKey == "paied") {
                whereQuery.hasPaied = query[_queryKey];
                continue;
            }
            if (_queryKey == "cancel") {
                whereQuery.hasCancel = query[_queryKey];
                continue;
            }
            if (_queryKey == "paieddate") {
                const startDate = moment(query[_queryKey]).utc().startOf('day');
                const endDate = moment(query[_queryKey]).utc().endOf('day');
                whereQuery.paiedDate = {
                    $gte: startDate,
                    $lte: endDate
                }
                continue;
            }
            if (_queryKey == "apply") {
                const startDate = moment(query[_queryKey]).utc().startOf('day');
                const endDate = moment(query[_queryKey]).utc().endOf('day');
                whereQuery.applyDate = {
                    $gte: startDate,
                    $lte: endDate
                }
                continue;
            }
        }

        const bill = await billModel.find(whereQuery).sort(sortQuery);
        res.status(200).json({
            success: true,
            data: bill
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
};

billCtrl.getById = async function (req, res, next) {
    try {
        const bill = await billModel.findById(req.params._id);
        res.status(200).json({
            success: true,
            data: bill
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
};

billCtrl.createData = async function (req, res, next) {
    try {
        const child = req.body.child;
        const adult = req.body.adult;
        const price = req.body.price

        if (!(child !== null && child !== undefined)
            || !(adult !== null && adult !== undefined)
            || !(price !== null && price !== undefined)
        ) {
            return res.status(400).json({
                success: false,
                message: "Child or Adult or Price is required!"
            });
        }

        const total = (child * 0.8 * price) + (adult * price);
        req.body.total = total;

        if (req.body.hasPaied === true) {
            const now = moment();
            req.body.paiedDate = now;
        } else {
            const pay = Date.parse(req.body.applyDate) - 172800000;
            req.body.paiedDate = new Date(pay);
        }

        req.body.hasCancel = false;

        await billModel.create(req.body);
        res.status(200).json({
            success: true,
            message: "Create Bill successfully!"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
};

billCtrl.updateById = async function (req, res, next) {
    try {
        const { _id } = req.params;

        if (req.body.hasCancel === true) {
            const bill = await billModel.findById(_id);
            const tour = await tourModel.findByPk(bill.tourId);

            const whereQuery = {
                child: tour.child - bill.child,
                adult: tour.adult - bill.adult,
                emptySeat: tour.emptySeat + bill.child + bill.adult
            };

            await tourModel.update(whereQuery, { where: { id: bill.tourId } });
        } else {
            const child = req.body.child;
            const adult = req.body.adult;
            const price = req.body.price;

            if (!(child !== null && child !== undefined)
                || !(adult !== null && adult !== undefined)
                || !(price !== null && price !== undefined)
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Child or Adult or Price is required!"
                });
            }

            const total = (child * 0.8 * price) + (adult * price);
            req.body.total = total;

            if (req.body.hasPaied === true) {
                const now = moment();
                req.body.paiedDate = now;
                const bill = await billModel.findById(_id);
                if (bill.applyDate < now) {
                    return res.status(400).json({
                        success: false,
                        message: "You haven't paid me yet!"
                    });
                }
            }
        }

        await billModel.update({ _id }, { $set: req.body }, { new: true });
        res.status(200).json({
            success: true,
            message: "Update Bill successfully!"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
};

billCtrl.deleteById = async function (req, res, next) {
    try {
        const { _id } = req.params;
        await billModel.deleteOne({ _id });
        res.status(200).json({
            success: true,
            message: "Delete Bill successfully!"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
};

module.exports = billCtrl;