'use strict';


/**
 * Удалить чат
 *
 * chat_id String 
 * authorization String 
 * no response value expected for this operation
 **/
exports.chatsChat_idDELETE = function(chat_id,authorization) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Получить список чатов пользователя
 *
 * authorization String 
 * returns List
 **/
exports.chatsGET = function(authorization) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "name" : "name",
  "chat_id" : "chat_id"
}, {
  "name" : "name",
  "chat_id" : "chat_id"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Создать новый чат
 *
 * body Chats_body 
 * authorization String 
 * no response value expected for this operation
 **/
exports.chatsPOST = function(body,authorization) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

