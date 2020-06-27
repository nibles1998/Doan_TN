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
        await TypeTour.sync()
            .then(() => {
                const typeDiscovery = await TypeTour.findAll({ where: { type: "Discovery" } });
                if (typeDiscovery.length === 0) {
                    await TypeTour.create({ type: "Discovery" });
                }
                const typeHoneyMoon = await TypeTour.findAll({ where: { type: "HoneyMoon" } });
                if (typeHoneyMoon.length === 0) {
                    await TypeTour.create({ type: "HoneyMoon" });
                }
            });
    },
    model: TypeTour,
    type: "postgresql"
}