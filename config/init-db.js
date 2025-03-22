const sequelize = require('./database');
const User = require('../models/User');
const { Chat, ChatParticipant } = require('../models/Chat');
const Message = require('../models/Message');

const initDatabase = async () => {
    try {
        await sequelize.sync({ force: false, alter: true });
        console.log('База данных успешно инициализирована');
    } catch (error) {
        console.error('Ошибка при инициализации базы данных:', error);
        process.exit(1);
    }
};

module.exports = initDatabase; 