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
        validate: {
            allowNull: false
        }
    },
    tourName: {
        type: Sequelize.STRING,
        validate: {
            allowNull: false
        }
    },
    tourTime: {
        type: Sequelize.INTEGER,
        validate: {
            isInt: true,
            allowNull: false
        }
    },
    location: {
        type: Sequelize.STRING,
        validate: {
            isAlpha: true,
            allowNull: false
        }
    },
    price: {
        type: Sequelize.DOUBLE,
        validate: {
            isFloat: true,
            allowNull: false
        }
    },
    startedDate: {
        type: Sequelize.DATE,
        validate: {
            allowNull: false
        }
    },
    endDate: {
        type: Sequelize.DATE,
        validate: {
            allowNull: false
        }
    },
    note: {
        type: Sequelize.STRING,
    },
    companyId: {
        type: Sequelize.UUID,
        validate: {
            isUUID: 4,
            allowNull: false
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