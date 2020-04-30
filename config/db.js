const Sequenlize = require('sequelize');

const connectDB = async function () {
    const instanceDB = new Sequenlize('demonode', 'postgres', 'nibles1504', {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
        logging: false
    })
    await instanceDB.authenticate()
        .then(() => {
            console.log("Connected DB");
        })
        .catch((e) => {
            throw e
        })
    return instanceDB;
}

module.exports = connectDB;