'use strict';

var utils = require('../utils/writer.js');
const { Chat, ChatParticipant } = require('../models/Chat');
const User = require('../models/User');

const chatsGET = async (req, res) => {
    try {
        const userChats = await Chat.findAll({
            include: [{
                model: User,
                where: { id: req.user.userId },
                through: { attributes: [] }
            }]
        });
        
        res.status(200).json(userChats.map(chat => ({
            chat_id: chat.id,
            name: chat.name
        })));
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

const chatsPOST = async (req, res) => {
    try {
        const { name, user_id } = req.body;
        
        const targetUser = await User.findByPk(user_id);
        if (!targetUser) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        const chat = await Chat.create({ name });
        await ChatParticipant.bulkCreate([
            { ChatId: chat.id, UserId: req.user.userId },
            { ChatId: chat.id, UserId: user_id }
        ]);
        
        res.status(201).json({
            chat_id: chat.id,
            name: chat.name
        });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

const chatsChat_idDELETE = async (req, res) => {
    try {
        const chatId = req.params.chat_id;
        
        const chat = await Chat.findOne({
            include: [{
                model: User,
                where: { id: req.user.userId },
                through: { attributes: [] }
            }],
            where: { id: chatId }
        });
        
        if (!chat) {
            return res.status(404).json({ message: 'Чат не найден' });
        }
        
        await chat.destroy();
        
        res.status(200).json({ message: 'Чат удален' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

module.exports = {
    chatsGET,
    chatsPOST,
    chatsChat_idDELETE
};
