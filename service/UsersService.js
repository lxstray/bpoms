'use strict';


/**
 * Получить список пользователей
 *
 * authorization String 
 * returns List
 **/
exports.usersGET = function(authorization) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "user_id" : "user_id",
  "username" : "username"
}, {
  "user_id" : "user_id",
  "username" : "username"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Получить данные пользователя
 *
 * user_id String 
 * authorization String 
 * returns inline_response_200_3
 **/
exports.usersUser_idGET = function(user_id,authorization) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "user_id" : "user_id",
  "username" : "username"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

