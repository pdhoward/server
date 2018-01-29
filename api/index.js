'use strict';

//////////////////////////////////////////////////////////////////////////
/////////////////     API Catalogue for db store   //////////////////////
/////////////////    server side 'in memory' db    //////////////////////
////////////////////////////////////////////////////////////////////////

const clone =     require('clone')
const uuidv1 =    require('uuid/v1');
const db =        require('./members')


////////////////////////////////////
///////   get all clients ////////
//////////////////////////////////
const getClients = (token, cb) => {

  async function thread() {
    let result = await db.get()
    return result
  }

  thread().then((result) => {
    cb(result)
  }).catch((err) => {
    console.log("ERROR IN Get Client PROCESSING")
    console.log(err)
  })
}


////////////////////////////////////
///////   update client  //////////
//////////////////////////////////

const updateClient = (token, contact, cb) => {

  async function thread(contact) {
    let result = await db.update(contact)
    return result
  }

  thread(contact).then((arr) => {
    cb(arr)
  }).catch((err) => {
    console.log("ERROR IN Update Client PROCESSING")
    console.log(err)
  })
}

////////////////////////////////////
///////   add new client  //////////
//////////////////////////////////
const addClient = (token, contact, cb) => {

  async function thread(contact) {
    let result = await db.put(contact)
    return result
  }

  thread(contact).then((result) => {
    cb(result)
  }).catch((err) => {
    console.log("ERROR IN Add Member PROCESSING")
    console.log(err)
  })
}

////////////////////////////////////
///////   delete client  //////////
//////////////////////////////////
const deleteClient = (token, id, cb) => {

  async function thread(id) {
    let result = await db.delete(id)
    return result
  }

  thread(id).then((result) => {
    cb(result)
  }).catch((err) => {
    console.log("ERROR IN DELETE MEMBER PROCESSING")
    console.log(err)
  })
}

/////////////////////////////////////
module.exports = {
  addClient,
  deleteClient,
  getClients,
  updateClient
}
