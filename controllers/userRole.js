const userRoleModel = require('../models').model.UserRole;

const userRoleCtrl = {};

userRoleCtrl.getMany = async function (req, res, next) {
    try {
        const query = req.query;
        const whereQuery = {};
        const allKeys = Object.keys(query);
        for (let index = 0; index < allKeys.length; index++) {
            const _queryKey = allKeys[index];
            if (_queryKey == "type") {
                whereQuery.type = query[_queryKey];
                continue;
            }
        }

        const userRole = await userRoleModel.findAll({ where: whereQuery });
        return res.status(200).json({
            success: true,
            data: userRole
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};

userRoleCtrl.getById = async function (req, res, next) {
    try {
        const userRole = await userRoleModel.findByPk(req.params.id);
        return res.status(200).json({
            success: true,
            data: userRole
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};

userRoleCtrl.createData = async function (req, res, next) {
    try {
        await userRoleModel.create(req.body);
        return res.status(200).json({
            success: true,
            message: "Create UserRole successfully!"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};

userRoleCtrl.updateById = async function (req, res, next) {
    try {
        const { id } = req.params;
        await userRoleModel.update(req.body, {
            where: { id }
        });
        return res.status(200).json({
            success: true,
            message: "Update UserRole successfully!"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};

userRoleCtrl.deleteById = async function (req, res, next) {
    try {
        const { id } = req.params;
        await userRoleModel.destroy({ where: { id } });
        return res.status(200).json({
            success: true,
            message: "Delete UserRole successfully!"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        });
    }
};

module.exports = userRoleCtrl;