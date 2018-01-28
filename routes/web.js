'use strict';

//////////////////////////////////////////////////////
////////      process web http message        ///////
////////////////////////////////////////////////////

const bodyParser =  			require('body-parser')

const web = (router) => {

	router.use(bodyParser.json());
	router.use(function(req, res, next) {

	console.log("-------------INCOMING WEB MESSAGE -----------")
  res.json({message: "Hello from the web route"})
  next()
 });
}

module.exports = web
