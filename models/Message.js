const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const { Chat } = require('./Chat');

const Message = sequelize.define('Message', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

Message.belongsTo(User, { as: 'sender' });
Message.belongsTo(Chat);
Chat.hasMany(Message);

module.exports = Message; 