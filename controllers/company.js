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
        return res.status(200).json({
            success: true,
            data: company
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Error when get all Company!"
        });
    }
};

companyCtrl.getById = async function (req, res, next) {
    try {
        const company = await companyModel.findByPk(req.params.id);
        return res.status(200).json({
            success: true,
            data: company
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Error when get Company by id!"
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
        return res.status(200).json({
            success: true,
            message: "Create Company successfully!"
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Error when create Company!"
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
        return res.status(200).json({
            success: true,
            message: "Update Company successfully!"
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Error when update Company!"
        });
    }
};

companyCtrl.deleteById = async function (req, res, next) {
    try {
        const { id } = req.params;
        await companyModel.destroy({ where: { id } });
        return res.status(200).json({
            success: true,
            message: "Delete Company successfully!"
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Error when delete Company!"
        });
    }
};

module.exports = companyCtrl;