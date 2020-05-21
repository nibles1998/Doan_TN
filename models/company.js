const Sequelize = require('sequelize')
const Model = Sequelize.Model

class Company extends Model {
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
    companyName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isAlpha: true,
            notEmpty: true
        }
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [10],
            not: ["[a-zA-Z]"]
        }
    },
    fax: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [10],
            not: ["[a-zA-Z]"]
        }
    }

}

const options = {}

module.exports = {
    init: async (instanceDB) => {
        Company.init(attrs, { ...options, sequelize: instanceDB });
        await Company.sync();
    },
    model: Company,
    type: "postgresql"
}