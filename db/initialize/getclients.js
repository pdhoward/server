'use strict';

///////////////////////////////////////////////////////////////////////
///////           load a test data set of clients if needed    ////////
/////////////////////////////////////////////////////////////////////

const Client =              require('../schemas/Client')
const mongoose =            require('mongoose')
const testClients =         require('../data/clients')
const { g, b, gr, r, y } =  require('../../console')

const limit = 1;

function getClients () {
      Client.find({}).limit(limit).exec(function (err, collection){
          if (collection.length === 0) {
            // iterate over the set of clients for initialization and create entries
            testClients.map(function(client) {
                let newClient = new Client(client)
                newClient.save(function (err, data) {
                  if(err) {
                    console.log(err);
                    return res.status(500).json({msg: 'internal server error'});
                  }
                })
              })
            console.log(g('Test Clients Initialized in MongoDB'))
            return
          }
          else {
            console.log(g('Clients Exist in MongoDB'))
          }
        })
      }

module.exports = {
  getClients: getClients
}
