'use strict';

const express = require('express');
const OpenApiValidator = require('express-openapi-validator');
const path = require('path');
const YAML = require('yamljs');
require('dotenv').config();

const authMiddleware = require('./middleware/auth');
const serverInfo = require('./middleware/server-info');
const validators = require('./middleware/validators');
const authController = require('./controllers/Auth');
const chatsController = require('./controllers/Chats');
const messagesController = require('./controllers/Messages');
const initDatabase = require('./config/init-db');

const app = express();
const port = process.env.PORT || 3000;

const openApiSpec = YAML.load('./api/openapi.yaml');

app.use(express.json());
app.use(serverInfo);

app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK',
        timestamp: new Date().toISOString()
    });
});

app.use(
    OpenApiValidator.middleware({
        apiSpec: openApiSpec,
        validateRequests: true,
        validateResponses: true,
    })
);

app.post('/auth/register', validators.registerValidation, authController.authRegisterPOST);
app.post('/auth/login', validators.loginValidation, authController.authLoginPOST);
app.post('/auth/logout', authMiddleware, authController.authLogoutPOST);
app.post('/auth/refresh', authController.authRefreshPOST);
app.post('/auth/password-reset', validators.passwordResetValidation, authController.authPassword_resetPOST);
app.post('/auth/password-reset/confirm', validators.passwordResetConfirmValidation, authController.authPassword_resetConfirmPOST);

app.get('/chats', authMiddleware, chatsController.chatsGET);
app.post('/chats', authMiddleware, validators.chatValidation, chatsController.chatsPOST);
app.delete('/chats/:chat_id', authMiddleware, chatsController.chatsChat_idDELETE);

app.get('/chats/:chat_id/messages', authMiddleware, messagesController.chatsChat_idMessagesGET);
app.post('/chats/:chat_id/messages', authMiddleware, validators.messageValidation, messagesController.chatsChat_idMessagesPOST);
app.delete('/chats/:chat_id/messages/:message_id', authMiddleware, messagesController.chatsChat_idMessagesMessage_idDELETE);

app.use((err, req, res, next) => {
    if (err.status === 400) {
        return res.status(400).json({
            message: 'Ошибка валидации',
            errors: err.errors
        });
    }
    
    res.status(err.status || 500).json({
        message: err.message || 'Внутренняя ошибка сервера'
    });
});

initDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});

