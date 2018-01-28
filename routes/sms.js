'use strict';

//////////////////////////////////////////////////////
////////      process sms message             ///////
////////////////////////////////////////////////////

const bodyParser =  			require('body-parser')

const sms = (router) => {

	router.use(bodyParser.json());
	router.use(function(req, res, next) {

	console.log("-------------Incoming SMS-----------")
  res.json({message: "Hello from the sms route"})
 });
}

module.exports = sms
