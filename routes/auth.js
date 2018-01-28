'use strict';

///////////////////////////////////////////////////////
/////     Authorization (testing purposes)        ////
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
    console.log("No token detected. Assign temporary token for testing" )
    req.token = keys.token   // assign temp token
		// note for product call next(err)
    next()
  }
 });
}

module.exports = auth
