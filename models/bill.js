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
        allowNull: false,
        validate: {
            isUUID: 4
        }
    },
    tourId: {
        type: Sequelize.UUID,
        allowNull: false,
        validate: {
            isUUID: 4
        }
    },
    child: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            notEmpty: true
        }
    },
    adult: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            notEmpty: true
        }
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate: {
            isFloat: true
        }
    },
    total: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate: {
            isFloat: true
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
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    paymentMethod: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
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