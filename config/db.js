const Sequenlize = require('sequelize');
const postgresConfig = require('./app').POSTGRES_DB;
const mongoConfig = require('./app').MONGO_DB;
const mongoose = require("mongoose");

const connectDB = async function () {
    const instanceDB = new Sequenlize(postgresConfig.DATABASENAME, postgresConfig.USERNAME, postgresConfig.PASSWORD, {
        host: postgresConfig.HOST,
        port: postgresConfig.PORT,
        dialect: postgresConfig.DIALECT,
        logging: false
    });
    await mongoose.connect(`mongodb://${mongoConfig.HOST}:${mongoConfig.PORT}/${mongoConfig.DBNAME}`, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Mongo Database already!");
        })
        .catch((e) => {
            throw e;
        });
    await instanceDB.authenticate()
        .then(() => {
            console.log("Postgres Database already!");
        })
        .catch((e) => {
            throw e;
        });
    return instanceDB;
}

module.exports = connectDB;