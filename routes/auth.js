'use strict';

///////////////////////////////////////////////////////
/////     Authorization (placeholder - refactor)  ////
/////////////////////////////////////////////////////

const bodyParser =  			require('body-parser')
const keys =          		require('../config').init();

const auth = (router) => {
	router.use(bodyParser.json());
	router.use(function(req, res, next) {

	console.log("-------------AUTHORIZATION   -----------")
	const token = req.get('Authorization')
  if (token) {
    req.token = token
    next()
  } else {
    console.log("Temp Workaround on Server Auth" )
    req.token = keys.token   // assign temp token
		//console.log('reminder - need JWT authorization')
    //let err = new Error('Not Authorized')
		//next(err)
    next()
  }
 });
}

module.exports = auth
