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
            if (_queryKey == "userid") {
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
                    $gte: new Date(startDate).toLocaleString({ timeZone: "VN" }),
                    $lte: new Date(endDate).toLocaleString({ timeZone: "VN" })
                }
                continue;
            }
            if (_queryKey == "apply") {
                const startDate = moment(query[_queryKey]).utc().startOf('day');
                const endDate = moment(query[_queryKey]).utc().endOf('day');
                whereQuery.applyDate = {
                    $gte: new Date(startDate).toLocaleString({ timeZone: "VN" }),
                    $lte: new Date(endDate).toLocaleString({ timeZone: "VN" })
                }
                continue;
            }
        }

        const bill = await billModel.find(whereQuery).sort(sortQuery);
        return res.status(200).json({
            success: true,
            data: bill
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};

billCtrl.getById = async function (req, res, next) {
    try {
        const bill = await billModel.findById(req.params._id);
        return res.status(200).json({
            success: true,
            data: bill
        });
    } catch (error) {
        return res.status(400).json({
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
        const tour = await tourModel.findByPk(req.body.tourId);

        if (!(child !== null && child !== undefined)
            || !(adult !== null && adult !== undefined)
            || !(price !== null && price !== undefined)
        ) {
            return res.status(400).json({
                success: false,
                message: "Child or Adult or Price is required!"
            });
        }

        if (tour.emptySeat < (child + adult)) {
            return res.status(400).json({
                success: false,
                message: "Not enough empty seat!"
            });
        }

        const queryTour = {
            child: tour.child + child,
            adult: tour.adult + adult,
            emptySeat: tour.emptySeat - (child + adult)
        };

        await tourModel.update(queryTour, { where: { id: tour.id } });


        const total = (child * 0.8 * price) + (adult * price);
        req.body.total = total;

        if (req.body.hasPaied === true) {
            const now = new Date().toLocaleString({ timeZone: "VN" });
            req.body.paiedDate = now;
        } else {
            const applyDate = new Date(req.body.applyDate).toLocaleString({ timeZone: "VN" });
            const pay = Date.parse(applyDate) - 172800000;
            req.body.paiedDate = new Date(pay).toLocaleString({ timeZone: "VN" });
        }

        req.body.hasCancel = false;

        await billModel.create(req.body);
        return res.status(200).json({
            success: true,
            message: "Create Bill successfully!"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};

billCtrl.updateById = async function (req, res, next) {
    try {
        const { _id } = req.params;
        const bill = await billModel.findById(_id);
        const tour = await tourModel.findByPk(bill.tourId);

        if (bill.hasCancel) {
            return res.status(400).json({
                success: false,
                message: "Bill is reject!"
            });
        }
        if (req.body.hasCancel) {
            const queryTour = {
                child: tour.child - bill.child,
                adult: tour.adult - bill.adult,
                emptySeat: tour.emptySeat + bill.child + bill.adult
            };

            await tourModel.update(queryTour, { where: { id: bill.tourId } });
            await billModel.updateOne({ _id }, { $set: req.body }, { new: true });
        } else {
            const child = req.body.child;
            const adult = req.body.adult;
            const price = req.body.price;

            let queryTour = {
                child: tour.child,
                adult: tour.adult
            };

            let queryBill = {
                child: bill.child,
                adult: bill.adult
            };
            if (!bill.hasPaied) {
                if (req.body.hasPaied) {
                    queryBill.hasPaied = true;
                    const now = new Date().toLocaleString({ timeZone: "VN" });

                    const bill = await billModel.findById(_id);
                    if (bill.applyDate < now) {
                        return res.status(400).json({
                            success: false,
                            message: "You haven't paid me yet!"
                        });
                    }
                    queryBill.paiedDate = now;
                    await billModel.updateOne({ _id }, { $set: queryBill }, { new: true });
                    return res.status(200).json({
                        success: true,
                        message: "Update Bill successfully!"
                    });
                }

                if (child !== null && child !== undefined) {
                    if (child !== bill.child) {
                        queryTour.child = tour.child + child - bill.child;
                        queryBill.child = child;
                    }
                }

                if (adult !== null && adult !== undefined) {
                    if (adult !== bill.adult) {
                        queryTour.adult = tour.adult + adult - bill.child;
                        queryBill.adult = adult;
                    }
                }

                if (price !== null && price !== undefined) {
                    queryBill.price = price;
                    const total = (queryBill.child * 0.8 * price) + (queryBill.adult * price);
                    queryBill.total = total;
                } else {
                    const total = (queryBill.child * 0.8 * bill.price) + (queryBill.adult * bill.price);
                    queryBill.total = total;
                }

                queryTour.emptySeat = tour.emptySeat - ((queryTour.child + queryTour.adult) - (bill.child + bill.adult));

                await tourModel.update(queryTour, { where: { id: tour.id } });

            }

            const applyDate = req.body.applyDate;
            if (applyDate) {
                const now = new Date().toLocaleDateString({ timeZone: "VN" });
                if (applyDate < now) {
                    return res.status(400).json({
                        success: false,
                        message: "Apply Date is smaller than Now"
                    });
                }
            }

            const now = new Date().toLocaleString({ timeZone: "VN" });
            queryBill.updatedAt = now;
            await billModel.updateOne({ _id }, { $set: queryBill }, { new: true });
        }

        return res.status(200).json({
            success: true,
            message: "Update Bill successfully!"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};

billCtrl.deleteById = async function (req, res, next) {
    try {
        const { _id } = req.params;
        await billModel.deleteOne({ _id });
        return res.status(200).json({
            success: true,
            message: "Delete Bill successfully!"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};

module.exports = billCtrl;