const Sequelize = require('sequelize')
const Model = Sequelize.Model

class UserRole extends Model {
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
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isAlpha: true,
            notEmpty: true
        }
    },
    create: {
        type: Sequelize.BOOLEAN
    },
    read: {
        type: Sequelize.BOOLEAN
    },
    up: {
        type: Sequelize.BOOLEAN
    },
    del: {
        type: Sequelize.BOOLEAN
    }

}

const options = {}

module.exports = {
    init: async (instanceDB) => {
        UserRole.init(attrs, { ...options, sequelize: instanceDB });
        await UserRole.sync();
    },
    model: UserRole,
    type: "postgresql"
}