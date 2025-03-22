'use strict';


/**
 * Получить список сообщений чата
 *
 * chat_id String 
 * authorization String 
 * returns List
 **/
exports.chatsChat_idMessagesGET = function(chat_id,authorization) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "message_id" : "message_id",
  "text" : "text",
  "sender_id" : "sender_id",
  "timestamp" : "2000-01-23T04:56:07.000+00:00"
}, {
  "message_id" : "message_id",
  "text" : "text",
  "sender_id" : "sender_id",
  "timestamp" : "2000-01-23T04:56:07.000+00:00"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Удалить сообщение
 *
 * chat_id String 
 * message_id String 
 * authorization String 
 * no response value expected for this operation
 **/
exports.chatsChat_idMessagesMessage_idDELETE = function(chat_id,message_id,authorization) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Отправить сообщение в чат
 *
 * body Chat_id_messages_body 
 * chat_id String 
 * authorization String 
 * no response value expected for this operation
 **/
exports.chatsChat_idMessagesPOST = function(body,chat_id,authorization) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

