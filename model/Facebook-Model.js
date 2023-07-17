const { DataTypes } = require('sequelize');

const { sequelize } = require('../database/config');

const FacebookModel = sequelize.define('Facebook', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

FacebookModel.sync();

module.exports = { FacebookModel };