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
            isUUID: 4,
            notNull: false
        }
    },
    companyId: {
        primaryKey: true,
        type: Sequelize.UUID,
        validate: {
            isUUID: 4,
            notNull: false
        }
    },
    status: {
        type: Sequelize.STRING,
        validate: {
            notNull: false,
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
        validate: {
            isUUID: 4,
            notNull: false
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