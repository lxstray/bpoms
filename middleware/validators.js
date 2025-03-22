const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const registerValidation = [
    body('username').notEmpty().withMessage('Username обязателен'),
    body('email').isEmail().withMessage('Введите корректный email'),
    body('password').isLength({ min: 6 }).withMessage('Пароль должен быть не менее 6 символов'),
    validate
];

const loginValidation = [
    body('email').isEmail().withMessage('Введите корректный email'),
    body('password').notEmpty().withMessage('Пароль обязателен'),
    validate
];

const chatValidation = [
    body('name').notEmpty().withMessage('Название чата обязательно'),
    body('user_id').notEmpty().withMessage('ID пользователя обязателен'),
    validate
];

const messageValidation = [
    body('text').notEmpty().withMessage('Текст сообщения обязателен'),
    validate
];

const passwordResetValidation = [
    body('email').isEmail().withMessage('Введите корректный email'),
    validate
];

const passwordResetConfirmValidation = [
    body('token').notEmpty().withMessage('Токен обязателен'),
    body('new_password').isLength({ min: 6 }).withMessage('Новый пароль должен быть не менее 6 символов'),
    validate
];

module.exports = {
    registerValidation,
    loginValidation,
    chatValidation,
    messageValidation,
    passwordResetValidation,
    passwordResetConfirmValidation
}; 