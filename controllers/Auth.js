'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

const generateTokens = (userId) => {
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: '7d' });
    return { token, refreshToken };
};

const authRegisterPOST = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Пользователь уже существует' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

const authLoginPOST = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Неверные учетные данные' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Неверные учетные данные' });
        }

        const { token, refreshToken } = generateTokens(user.id);
        
        await user.update({ refreshToken });
        
        res.status(200).json({ token, refreshToken });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

const authLogoutPOST = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.userId);
        if (user) {
            await user.update({ refreshToken: null });
        }
        res.status(200).json({ message: 'Успешный выход' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

const authRefreshPOST = async (req, res) => {
    try {
        const { refresh_token } = req.body;
        
        const decoded = jwt.verify(refresh_token, REFRESH_SECRET);
        const user = await User.findByPk(decoded.userId);
        
        if (!user || user.refreshToken !== refresh_token) {
            return res.status(400).json({ message: 'Неверный или просроченный refresh_token' });
        }
        
        const { token, refreshToken } = generateTokens(user.id);
        await user.update({ refreshToken });
        
        res.status(200).json({ token, refreshToken });
    } catch (error) {
        res.status(400).json({ message: 'Неверный или просроченный refresh_token' });
    }
};

const authPassword_resetPOST = async (req, res) => {
    try {
        const { email } = req.body;
        
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        // TODO: Реализовать отправку email для сброса пароля
        res.status(200).json({ message: 'Инструкция по сбросу отправлена' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

const authPassword_resetConfirmPOST = async (req, res) => {
    try {
        const { token, new_password } = req.body;
        
        // TODO: Реализовать проверку токена сброса пароля
        // TODO: Обновить пароль пользователя
        
        res.status(200).json({ message: 'Пароль успешно изменен' });
    } catch (error) {
        res.status(400).json({ message: 'Неверный или просроченный токен' });
    }
};

module.exports = {
    authRegisterPOST,
    authLoginPOST,
    authLogoutPOST,
    authRefreshPOST,
    authPassword_resetPOST,
    authPassword_resetConfirmPOST
};
