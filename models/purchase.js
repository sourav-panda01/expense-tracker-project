const Sequelize=require('sequelize')
const sequelize = require('../util/database');

const Purchase = sequelize.define('purchase', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    paymentid: Sequelize.STRING,
    purchaseid: Sequelize.STRING,
    Status: Sequelize.STRING
})

module.exports = Purchase;