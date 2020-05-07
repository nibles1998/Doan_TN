const Sequelize = require('sequelize')
const Model = Sequelize.Model

class Review extends Model {
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
    tourId: {
        type: Sequelize.UUID,
        allowNull: false,
        validate: {
            isUUID: 4,
            notEmpty: true
        }
    },
    comment: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    rating: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
            isFloat: true,
            notEmpty: true
        }
    }
}

const options = {}

module.exports = {
    init: async (instanceDB) => {
        Review.init(attrs, { ...options, sequelize: instanceDB });
        await Review.sync();
    },
    model: Review
}