const Sequenlize = require('sequelize');

const connectDB = async function () {
    const instanceDB = new Sequenlize('projectFinal', 'root', 'nibles1504', {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
        logging: false
    })
    await instanceDB.authenticate()
        .then(() => {
            console.log("Connected DB")
        })
        .catch((e) => {
            throw e
        })
    return instanceDB;
}

module.exports = connectDB;