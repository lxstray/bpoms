'use strict';


/**
 * Вход в систему
 *
 * body Auth_login_body 
 * returns inline_response_200
 **/
exports.authLoginPOST = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "token" : "token"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Выход из системы
 *
 * authorization String 
 * no response value expected for this operation
 **/
exports.authLogoutPOST = function(authorization) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Подтверждение сброса пароля
 *
 * body Passwordreset_confirm_body 
 * no response value expected for this operation
 **/
exports.authPassword_resetConfirmPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Запрос на сброс пароля
 *
 * body Auth_passwordreset_body 
 * no response value expected for this operation
 **/
exports.authPassword_resetPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Обновление токена
 *
 * body Auth_refresh_body 
 * returns inline_response_200_4
 **/
exports.authRefreshPOST = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "token" : "token"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Регистрация нового пользователя
 *
 * body Auth_register_body 
 * no response value expected for this operation
 **/
exports.authRegisterPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

