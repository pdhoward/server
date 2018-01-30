'use strict';

//////////////////////////////////////////////////////
////////      process web http message        ///////
////////////////////////////////////////////////////

const bodyParser =  			require('body-parser')

const unk = (router) => {

	router.use(bodyParser.json());
	router.use(function(req, res, next) {

	if (res.headersSent) return next()   // exit if path located successfully

	console.log("--------Send 404 Message--------")
	res.status(404)
  res.json({message: "Oops! Page or API not found"})
  next()
 });
}

module.exports = unk
