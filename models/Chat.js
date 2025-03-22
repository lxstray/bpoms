const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Chat = sequelize.define('Chat', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const ChatParticipant = sequelize.define('ChatParticipant', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    }
});

Chat.belongsToMany(User, { through: ChatParticipant });
User.belongsToMany(Chat, { through: ChatParticipant });

module.exports = { Chat, ChatParticipant }; 