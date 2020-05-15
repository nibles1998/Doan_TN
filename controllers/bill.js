const billModel = require('../models').model.Bill;
const moment = require('moment');
const Sequelize = require('sequelize');

const billCtrl = {};

billCtrl.getMany = async function (req, res, next) {
    try {
        const query = req.query;
        const whereQuery = {};
        const sortQuery = [];
        const allKeys = Object.keys(query);
        for (let index = 0; index < allKeys.length; index++) {
            const _queryKey = allKeys[index];
            if (_queryKey == "sortprice") {
                if (query[_queryKey])
                    sortQuery.push(["price", query[_queryKey]]);
                continue;
            }
            if (_queryKey == "sorttotal") {
                if (query[_queryKey])
                    sortQuery.push(["total", query[_queryKey]]);
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
                    [Sequelize.Op.gte]: startDate,
                    [Sequelize.Op.lte]: endDate
                }
                continue;
            }
            if (_queryKey == "apply") {
                const startDate = moment(query[_queryKey]).utc().startOf('day');
                const endDate = moment(query[_queryKey]).utc().endOf('day');
                whereQuery.applyDate = {
                    [Sequelize.Op.gte]: startDate,
                    [Sequelize.Op.lte]: endDate
                }
                continue;
            }
        }

        const bill = await billModel.findAll({
            where: whereQuery,
            order: sortQuery
        });
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
        const bill = await billModel.findByPk(req.params.id);
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
        const total = (child * 0.8 * price) + (adult * price);
        req.body.total = total;

        if (req.body.hasPaied === true) {
            const now = moment().toNow();
            req.body.paiedDate = now;
        } else {
            req.body.paiedDate = null;
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
        const { id } = req.params;
        const child = req.body.child;
        const adult = req.body.adult;
        const price = req.body.price
        const total = (child * 0.8 * price) + (adult * price);
        req.body.total = total;

        if (req.body.hasPaied === true) {
            const now = moment().toNow();
            req.body.paiedDate = now;
            const bill = billModel.findByPk(id);
            if (bill.applyDate < now) {
                return res.status(400).json({
                    success: false,
                    message: "You haven't paid me yet!"
                });
            }
        }

        if (req.body.hasCancel === true) {
            req.body.total = total * 0.6;
        }

        await billModel.update(req.body, {
            where: { id }
        });
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
        const { id } = req.params;
        await billModel.destroy({ where: { id } });
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