
'use strict';

//////////////////////////////////////////////////////////////////////////
///////////////////////////// Mongodb Functions /////////////////////////
////////////////////////////////////////////////////////////////////////
const Member =     require('../db/schemas/Client')

module.exports = {

  get: function() {

    return new Promise((resolve, reject) => {
      Member.find({}, function(err, response) {
          if (err) {
            if (err.error !== 'not_found') {
              resolve(err)
            } else {
              reject(err)
            }};
          resolve(response);
        });
       })
      },

  put: function(params) {

    let member = new Member(params);
    return new Promise((resolve, reject) => {
        member.save(function (err, response) {
          if (err) {
            console.log("Error When Saving Client")
            reject(err)
          }
          resolve(response)
    })
   })
  },

  update: function(contact) {
    return new Promise((resolve, reject) => {
    Member.findOneAndUpdate({id: contact.id}, contact, function (err, response) {
      if (err) {
        console.log(r("Error When Updating Member"))
        reject(err)
      }
      resolve(response);
      })
    })
  },

  delete: function(id) {    
    return new Promise((resolve, reject) => {
      Member.remove({id: id}, function(err, response) {
          if (err) {
            if (err.error !== 'not_found') {
              resolve(err)
            } else {
              reject(err)
            }};
          resolve(response);
        });
      })
    }

  // A mongoose pattern for a more sophisticated search
  // Retrieve users from db in the same geographic area as the active user.
  // The param being passed has context and user id  properties set to
  // current active user. But note that this search excludes the active user
  // from the search results
/*
  fetch: function(params, callback) {

      botdb.find({ $and: [ {'context.longitude': {$eq: params.context.longitude} },
                           {'context.latitude': {$eq: params.context.latitude} },
                           {'userID': {$ne: params.user} } ] },
              function(err, results) {

                return callback(err, results);
              });


    }
*/
};
