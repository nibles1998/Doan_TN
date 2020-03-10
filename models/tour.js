const Sequelize = require('sequelize')
const Model = Sequelize.Model

class Tour extends Model {
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
    displayTourId: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    tourName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    tourTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isInt: true
        }
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isAlpha: true,
            notEmpty: true
        }
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate: {
            isFloat: true,
            notEmpty: true
        }
    },
    startedDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    endDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    note: {
        type: Sequelize.STRING,
    },
    companyId: {
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
        Tour.init(attrs, { ...options, sequelize: instanceDB });
        await Tour.sync();
    },
    model: Tour
}