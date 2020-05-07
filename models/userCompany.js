const Sequelize = require('sequelize')
const Model = Sequelize.Model

class UserCompany extends Model {
    constructor(...args) {
        super(...args)
    }
};

const attrs = {
    id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        validate: {
            isUUID: 4
        }
    },
    userId: {
        type: Sequelize.UUID,
        allowNull: false,
        validate: {
            isUUID: 4,
            notEmpty: true
        }
    },
    companyId: {
        type: Sequelize.UUID,
        allowNull: false,
        validate: {
            isUUID: 4,
            notEmpty: true
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