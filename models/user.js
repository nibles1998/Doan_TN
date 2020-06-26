const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

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
        await User.sync()
            .then(async () => {
                const user = await User.findAll({ where: { email: 'ly@gmail.com' } });
                if (user.length === 0) {
                    console.log("Admin isn't exist!");
                    const info = {
                        fullName: "GiaLy",
                        address: "387A Lê Văn Khương, phường Hiệp Thành, quận 12 TP.HCM",
                        phone: "0373016238",
                        dateOfBirth: new Date("1998/08/04").toLocaleString({ timeZone: "VN" }),
                        email: "ly@gmail.com",
                        password: bcrypt.hashSync("123", salt),
                        country: "VN",
                        description: "Ahihi Nib",
                        displayName: "MRLYKH",
                        roleId: "5cecff1d-5433-4040-9043-7acf11e7222c",
                        paymentMethod: ["Momo"]
                    };
                    await User.create(info)
                        .then(() => {
                            console.log("Admin is created!");
                        })
                        .catch((e) => {
                            throw e;
                        });
                } else {
                    console.log("Admin is exist!");
                }
            });
    },
    model: User,
    type: "postgresql"
}