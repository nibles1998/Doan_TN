const Sequelize = require('sequelize')
const Model = Sequelize.Model

class UserCompany extends Model {
    constructor(...args) {
        super(...args)
    }
};

const attrs = {
    userId: {
        primaryKey: true,
        type: Sequelize.UUID,
        validate: {
            isUUID: 4
        }
    },
    companyId: {
        primaryKey: true,
        type: Sequelize.UUID,
        validate: {
            isUUID: 4
        }
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isAlpha: true
        }
    },
    hasAdmin: {
        type: Sequelize.BOOLEAN
    },
    hasAgent: {
        type: Sequelize.BOOLEAN
    },
    roleId: {
        type: Sequelize.UUID,
        allowNull: false,
        validate: {
            isUUID: 4,
            notEmpty: true
        }
    }

}

const options = {}

module.exports = {
    init: async (instanceDB) => {
        UserCompany.init(attrs, { ...options, sequelize: instanceDB });
        await UserCompany.sync();
    },
    model: UserCompany
}