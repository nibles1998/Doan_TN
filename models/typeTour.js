const Sequelize = require('sequelize')
const Model = Sequelize.Model

class TypeTour extends Model {
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
    }
}

const options = {}

module.exports = {
    init: async (instanceDB) => {
        TypeTour.init(attrs, { ...options, sequelize: instanceDB });
        await TypeTour.sync();
    },
    model: TypeTour
}