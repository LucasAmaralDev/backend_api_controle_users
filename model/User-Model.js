const { DataTypes } = require('sequelize') ;

const { sequelize } = require('../database/config');

const UserModel = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    dateExpiration: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    ipHD: {
        type: DataTypes.STRING,
        allowNull: true
    }
  });

  UserModel.sync();

module.exports = { UserModel };