const Sequelize = require('sequelize')
const Model = Sequelize.Model

class Bill extends Model {
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
        validate: {
            isUUID: 4,
            notNull: false
        }
    },
    tourId: {
        type: Sequelize.UUID,
        validate: {
            isUUID: 4,
            notNull: false
        }
    },
    price: {
        type: Sequelize.DOUBLE,
        validate: {
            isFloat: true,
            notNull: false
        }
    },
    hasPaied: {
        type: Sequelize.BOOLEAN,
    },
    hasCancel: {
        type: Sequelize.BOOLEAN,
    },
    paiedDate: {
        type: Sequelize.DATE,
        validate: {
            notNull: false
        }
    },
    paymentMethod: {
        type: Sequelize.STRING,
        get: function () {
            return JSON.parse(this.getDataValue("paymentMethod"));
        },
        set: function (val) {
            return this.setDataValue("paymentMethod", JSON.stringify(val));
        }
    }
}

const options = {}

module.exports = {
    init: async (instanceDB) => {

        Bill.init(attrs, { ...options, sequelize: instanceDB });
        await Bill.sync();
    },
    model: Bill
}