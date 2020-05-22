const companyModel = require('../models').model.Company;

const companyCtrl = {};

companyCtrl.getMany = async function (req, res, next) {
    try {
        const query = req.query;
        const whereQuery = {};
        const allKeys = Object.keys(query);
        for (let index = 0; index < allKeys.length; index++) {
            const _queryKey = allKeys[index];
            if (_queryKey == "name") {
                whereQuery.companyName = query[_queryKey];
                continue;
            }
        }
        
        const company = await companyModel.findAll({ where: whereQuery });
        res.status(200).json({
            success: true,
            data: company
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
};

companyCtrl.getById = async function (req, res, next) {
    try {
        const company = await companyModel.findByPk(req.params.id);
        res.status(200).json({
            success: true,
            data: company
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
};

companyCtrl.createData = async function (req, res, next) {
    try {
        const { companyName } = req.body;
        const company = await companyModel.findOne({ where: { companyName } });
        if (company) {
            return res.status({
                success: false,
                message: "Company is exist!"
            });
        }
        await companyModel.create(req.body);
        res.status(200).json({
            success: true,
            message: "Create Company successfully!"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
};

companyCtrl.updateById = async function (req, res, next) {
    try {
        const { id } = req.params;
        const { companyName } = req.body;
        const company = await companyModel.findOne({ where: { companyName } });
        if (company) {
            return res.status({
                success: false,
                message: "Company is exist!"
            });
        }
        await companyModel.update(req.body, {
            where: { id }
        });
        res.status(200).json({
            success: true,
            message: "Update Company successfully!"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
};

companyCtrl.deleteById = async function (req, res, next) {
    try {
        const { id } = req.params;
        await companyModel.destroy({ where: { id } });
        res.status(200).json({
            success: true,
            message: "Delete Company successfully!"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
};

module.exports = companyCtrl;