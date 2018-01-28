'use strict';
///////////////////////////////////////////////////////////////////////
/////////////////     ERROR HANDLING ROUTINES      ////////////////////
//////////////////////////////////////////////////////////////////////

const bodyParser =  			require('body-parser')

const error = (router) => {

	router.use(bodyParser.json());
	router.use(function(err, req, res, next) {

		function logErrors (err, req, res, next) {
		  console.log("log error triggered")
		  console.log(err.message)
			// log something
		  next(err)
		}
		function clientErrorHandler (err, req, res, next) {
		  console.log("client error triggered")
			// send something - maybe a status other than 500
		  if (req.xhr) {
		    res.status(500).send({ error: 'Something failed!' })
		  } else {
		    next(err)
		  }
		}
		function errorHandler (err, req, res, next) {
		  console.log("error handler triggered")
			// do something
		  next()
		}

 });
}

module.exports = error
