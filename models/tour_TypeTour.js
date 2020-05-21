const Sequelize = require('sequelize')
const Model = Sequelize.Model
const Tour = require('../models/tour');
const TypeTour = require('../models/typeTour');

class Tour_TypeTour extends Model {
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
    tourId: {
        type: Sequelize.UUID,
        allowNull: false,
        validate: {
            isUUID: 4,
            notEmpty: true
        }
    },
    typeTourId: {
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

        try {
            const model = await Tour_TypeTour.init(attrs, { ...options, sequelize: instanceDB })
            Tour.model.belongsToMany(TypeTour.model, {
                as: "typeTours",
                through: "Tour_TypeTours",
                foreignKey: "tourId",
                otherKey: "typeTourId"
            });
            TypeTour.model.belongsToMany(Tour.model, {
                as: "tours",
                through: "Tour_TypeTours",
                foreignKey: "typeTourId",
                otherKey: "tourId"
            });
            await model.sync()

        } catch (err) {
            console.error(err);
        }

    },
    model: Tour_TypeTour,
    type: "postgresql"
}