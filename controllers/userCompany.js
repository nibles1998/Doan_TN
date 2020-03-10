const userCompanyModel = require('../models').model.UserCompany;

const userCompanyCtrl = {};

userCompanyCtrl.getMany = async function (req, res, next) {
    try {
        const userCompany = await userCompanyModel.findAll();
        res.status(200).json({
            success: true,
            data: userCompany
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
};

userCompanyCtrl.getById = async function (req, res, next) {
    try {
        let [userId, companyId] = (req.params.id).split("&");
        const userCompany = await userCompanyModel.findAll({
            where: {
                userId,
                companyId
            }
        });
        res.status(200).json({
            success: true,
            data: userCompany
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
};

userCompanyCtrl.createData = async function (req, res, next) {
    try {
        const userCompany = await userCompanyModel.create(req.body);
        res.status(200).json({
            success: true,
            data: userCompany
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        });
    }
};

userCompanyCtrl.updateById = async function (req, res, next) {
    try {
        let [userId, companyId] = (req.params.id).split("&");
        await userCompanyModel.update(req.body, {
            where: {
                userId,
                companyId
            }
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

userCompanyCtrl.deleteById = async function (req, res, next) {
    try {
        let [userId,companyId] = (req.params.id).split("&");
        await userCompanyModel.destroy({
            where:{
                userId,
                companyId
        }});
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

module.exports = userCompanyCtrl;