
'use strict';

//////////////////////////////////////////////////////////////////////////
///////////////////////////// Mongodb Functions /////////////////////////
////////////////////////////////////////////////////////////////////////
const Agent =     require('../db/schemas/Agent')

module.exports = {

  get: function() {

    return new Promise((resolve, reject) => {
      Agent.find({}, function(err, response) {
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

    let Agent = new Agent(params);
    return new Promise((resolve, reject) => {
        Agent.save(function (err, response) {
          if (err) {
            console.log("Error When Saving Agent")
            reject(err)
          }
          resolve(response)
    })
   })
  },

  update: function(contact) {
    return new Promise((resolve, reject) => {
    Agent.findOneAndUpdate({id: contact.id}, contact, {upsert: true}, function (err, response) {
      if (err) {
        console.log(r("Error When Updating Agent"))
        reject(err)
      }
      resolve(response);
      })
    })
  },

  delete: function(id) {      
    return new Promise((resolve, reject) => {
      Agent.remove({id: id}, function(err, response) {
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
