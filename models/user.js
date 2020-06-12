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
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [10],
            not: ["[a-zA-Z]"]
        }
    },
    dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isAlpha: true,
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    displayName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isAlpha: true,
            notEmpty: true
        }
    },
    roleId: {
        type: Sequelize.UUID,
        allowNull: false,
        validate: {
            isUUID: 4,
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
        User.init(attrs, { ...options, sequelize: instanceDB });
        await User.sync();
    },
    model: User,
    type: "postgresql"
}