const Sequelize = require('sequelize')
const Model = Sequelize.Model

class UserRole extends Model {
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
    },
    create: {
        type: Sequelize.BOOLEAN
    },
    read: {
        type: Sequelize.BOOLEAN
    },
    up: {
        type: Sequelize.BOOLEAN
    },
    del: {
        type: Sequelize.BOOLEAN
    }

}

const options = {}

module.exports = {
    init: async (instanceDB) => {
        UserRole.init(attrs, { ...options, sequelize: instanceDB });
        await UserRole.sync()
            .then(async () => {
                const roleAdmin = await UserRole.findAll({ where: { type: 'Admin' } });
                if (roleAdmin.length === 0) {
                    console.log("Role Admin isn't exist!");
                    await UserRole.create({
                        type: "Admin",
                        create: true,
                        read: true,
                        up: true,
                        del: true
                    }).then(() => {
                        console.log("Role Admin is created!");
                    });
                } else {
                    console.log("Role Admin is exist!");
                }
                const roleCustomer = await UserRole.findAll({ where: { type: 'Customer' } });
                if (roleCustomer.length === 0) {
                    console.log("Role Customer isn't exist!");
                    await UserRole.create({
                        type: "Customer",
                        create: true,
                        read: true,
                        up: true,
                        del: false
                    }).then(() => {
                        console.log("Role Customer is created!");
                    });
                } else {
                    console.log("Role Customer is exist!");
                }
            });
    },
    model: UserRole,
    type: "postgresql"
}