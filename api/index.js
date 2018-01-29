'use strict';

//////////////////////////////////////////////////////////////////////////
/////////////////     API Catalogue for db store   //////////////////////
/////////////////    server side 'in memory' db    //////////////////////
////////////////////////////////////////////////////////////////////////

const clone =     require('clone')
const uuidv1 =    require('uuid/v1');

const dbMember = require('./members')


////////////////////////////////////
//////  client db functions  //////
//////////////////////////////////
const getClient = (token) => {
  let data = clientDB[token]
  if (data == null) {
    data = clientDB[token] = clone(clients)
  }
  return data
}

///////////////////////////////////////////////////////////
/////// REFACTOR CONNECT GET PROFILE TO MONGO ////////////
/////////////////////////////////////////////////////////
const getMembers = (token, cb) => {
  console.log("ENTERED getMembers")

  // need a model design - some kind of an org code
  //let data = getClient(token)
  async function thread() {
    let result = await dbMember.get()
    return result
  }

  thread().then((result) => {
    cb(result)
  }).catch((err) => {
    console.log("ERROR IN Add Member PROCESSING")
    console.log(err)
  })
}


///////////////////////////////////////////////////////////
/////// REFACTOR CONNECT Update Member in Mongo   ////////
/////////////////////////////////////////////////////////

const updateMember = (token, contact, cb) => {

  // need a model design - some kind of an org code
  //let data = getClient(token)
  async function thread(contact) {
    let result = await dbMember.update(contact)
    return result
  }

  thread(contact).then((profileArray) => {
    cb(profileArray)
  }).catch((err) => {
    console.log("ERROR IN updateProfile PROCESSING")
    console.log(err)
  })
}

function updateRecord(data, contact){
  return new Promise((resolve, reject) => {
    let newarr = data.map((c) => {
    if (c.id == contact.id) return contact
    return c
    })
    resolve(newarr)
  })
}

///////////////////////////////////////////////////
// REFACTOR - Add new member
/////////////////////////////////////////////////
const addMember = (token, contact, cb) => {

  console.log("ENTERED addMember")
  // need a model design - some kind of an org code
  //let data = getClient(token)

  // async await function to drive synchronous processing of db update
  async function thread(contact) {
    let result = await dbMember.put(contact)
    return result
  }

  thread(contact).then((result) => {
    cb(result)
  }).catch((err) => {
    console.log("ERROR IN Add Member PROCESSING")
    console.log(err)
  })
}


///////////////////////////////////////////////////////////
/////// REFACTOR CONNECT Delete Member in Mongo //////////
/////////////////////////////////////////////////////////
const deleteMember = (token, id, cb) => {
  console.log("ENTERED deleteMember")

  // need a model design - some kind of an org code
  //let data = getClient(token)
  async function thread(id) {
    let result = await dbMember.delete(id)
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
  addMember,
  deleteMember,
  getMembers,
  updateMember
}
