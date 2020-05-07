const Sequenlize = require('sequelize');
const dbInfo = require('../config/app').DATABASE;

const connectDB = async function () {
    const instanceDB = new Sequenlize(dbInfo.DATABASENAME, dbInfo.USERNAME, dbInfo.PASSWORD, {
        host: dbInfo.HOST,
        port: dbInfo.PORT,
        dialect: dbInfo.DIALECT,
        logging: false
    })
    await instanceDB.authenticate()
        .then(() => {
            console.log("Database already!");
        })
        .catch((e) => {
            throw e
        })
    return instanceDB;
}

module.exports = connectDB;