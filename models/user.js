const Sequelize = require('sequelize')
const Model = Sequelize.Model

class User extends Model {
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
    fullName: {
        type: Sequelize.STRING,
        validate: {
            isAlpha: true,
            allowNull: false
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
            allowNull: false,
            len: [10],
            not: ["[a-zA-Z]"]
        }
    },
    age: {
        type: Sequelize.INTEGER,
        validate: {
            isInt: true,
            allowNull: false
        }
    },
    country: {
        type: Sequelize.STRING,
        validate: {
            isAlpha: true,
            allowNull: false
        }
    },
    passport: {
        type: Sequelize.STRING,
        validate: {
            allowNull: false
        }
    },
    displayName: {
        type: Sequelize.STRING,
        validate: {
            isAlpha: true,
            allowNull: false
        }
    },
    type: {
        type: Sequelize.STRING,
        validate: {
            isAlpha: true,
            allowNull: false
        }
    },
    paymentMethod: {
        type: Sequelize.STRING,
        get: function(){
            return JSON.parse(this.getDataValue("paymentMethod"));
        },
        set: function(val){
            return this.setDataValue("paymentMethod",JSON.stringify(val));
        }
    }
}
const options = {}

module.exports = {
    init: async (instanceDB) => {
        User.init(attrs, { ...options, sequelize: instanceDB });
        await User.sync();
    },
    model: User
}