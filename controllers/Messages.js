'use strict';

var utils = require('../utils/writer.js');
const Message = require('../models/Message');
const { Chat } = require('../models/Chat');
const User = require('../models/User');


const chatsChat_idMessagesGET = async (req, res) => {
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
        
        const messages = await Message.findAll({
            where: { ChatId: chatId },
            include: [{
                model: User,
                as: 'sender',
                attributes: ['id', 'username']
            }],
            order: [['createdAt', 'ASC']]
        });
        
        res.status(200).json(messages.map(msg => ({
            message_id: msg.id,
            sender_id: msg.sender.id,
            text: msg.text,
            timestamp: msg.createdAt
        })));
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

const chatsChat_idMessagesPOST = async (req, res) => {
    try {
        const chatId = req.params.chat_id;
        const { text } = req.body;
        
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
        
        const message = await Message.create({
            text,
            ChatId: chatId,
            senderId: req.user.userId
        });
        
        const messageWithSender = await Message.findOne({
            where: { id: message.id },
            include: [{
                model: User,
                as: 'sender',
                attributes: ['id', 'username']
            }]
        });
        
        res.status(201).json({
            message_id: messageWithSender.id,
            sender_id: messageWithSender.sender.id,
            text: messageWithSender.text,
            timestamp: messageWithSender.createdAt
        });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

const chatsChat_idMessagesMessage_idDELETE = async (req, res) => {
    try {
        const { chat_id, message_id } = req.params;
        
        const message = await Message.findOne({
            where: { 
                id: message_id,
                ChatId: chat_id,
                senderId: req.user.userId
            }
        });
        
        if (!message) {
            return res.status(404).json({ message: 'Сообщение не найдено' });
        }
        
        await message.destroy();
        
        res.status(200).json({ message: 'Сообщение удалено' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

module.exports = {
    chatsChat_idMessagesGET,
    chatsChat_idMessagesPOST,
    chatsChat_idMessagesMessage_idDELETE
};
