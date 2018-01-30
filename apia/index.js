'use strict';

//////////////////////////////////////////////////////////////////////////
/////////////////     API Catalogue for db store   //////////////////////
////////////////////////////////////////////////////////////////////////

const clone =     require('clone')
const uuidv1 =    require('uuid/v1');
const db =        require('./agents')


////////////////////////////////////
///////   get all agents    ////////
//////////////////////////////////
const getAgents = (token, cb) => {

  async function thread() {
    let result = await db.get()
    return result
  }

  thread().then((result) => {
    cb(result)
  }).catch((err) => {
    console.log("ERROR IN Get Agent PROCESSING")
    console.log(err)
  })
}


////////////////////////////////////
///////   update agent   //////////
//////////////////////////////////

const updateAgent = (token, contact, cb) => {

  async function thread(contact) {
    let result = await db.update(contact)
    return result
  }

  thread(contact).then((arr) => {  
    cb(arr)
  }).catch((err) => {
    console.log("ERROR IN Update Agent PROCESSING")
    console.log(err)
  })
}

////////////////////////////////////
///////   add new agent  //////////
//////////////////////////////////
const addAgent = (token, contact, cb) => {

  async function thread(contact) {
    let result = await db.put(contact)
    return result
  }

  thread(contact).then((result) => {
    cb(result)
  }).catch((err) => {
    console.log("ERROR IN Add Agent PROCESSING")
    console.log(err)
  })
}

////////////////////////////////////
///////   delete client  //////////
//////////////////////////////////
const deleteAgent = (token, id, cb) => {

  async function thread(id) {
    let result = await db.delete(id)
    return result
  }

  thread(id).then((result) => {
    cb(result)
  }).catch((err) => {
    console.log("ERROR IN DELETE Agent PROCESSING")
    console.log(err)
  })
}

/////////////////////////////////////
module.exports = {
  addAgent,
  deleteAgent,
  getAgents,
  updateAgent
}
