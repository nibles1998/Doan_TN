const Sequenlize = require('sequelize');
const dbInfo = require('../config/app').DATABASE;
const mongoConfig = require('./app').MONGO_DB;
const mongoose = require("mongoose");

const connectDB = async function () {
    const instanceDB = new Sequenlize(dbInfo.DATABASENAME, dbInfo.USERNAME, dbInfo.PASSWORD, {
        host: dbInfo.HOST,
        port: dbInfo.PORT,
        dialect: dbInfo.DIALECT,
        logging: false
    })
    await mongoose.connect(`mongodb://${mongoConfig.HOST}:${mongoConfig.PORT}/${mongoConfig.DBNAME}`, {useNewUrlParser: true, useUnifiedTopology: true});
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