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
    ownerId: {
        type: Sequelize.UUID,
        validate: {
            isUUID: 4,
            allowNull: false
        }
    },
    companyName: {
        type: Sequelize.STRING,
        validate: {
            notNull: false,
            isAlpha: true
        }
    },
    address: {
        type: Sequelize.STRING,
        validate: {
            allowNull: false
        }
    },
    phone: {
        type: Sequelize.STRING,
        validate: {
            notNull: false,
            len: [10],
            not: ["[a-zA-Z"]
        }
    },
    fax: {
        type: Sequelize.STRING,
        validate: {
            notNull: false,
            len: [10],
            not: ["[a-zA-Z"]
        }
    }

}

const options = {}

module.exports = {
    init: async (instanceDB) => {
        Company.init(attrs, { ...options, sequelize: instanceDB });
        await Company.sync();
    },
    model: Company
}