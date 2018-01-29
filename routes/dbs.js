'use strict';

//////////////////////////////////////////////////////
////////      process db http message         ///////
////////////////////////////////////////////////////

const bodyParser =  			require('body-parser')
const api =         			require('../api')

const dbs = (router) => {

	router.use(bodyParser.json());
	router.use(function(req, res, next) {

	console.log("-------------INCOMING DB MESSAGE -----------")
  let method = req.method

	switch(method) {
			case 'GET':
				api.getClients(req.token, function(response){
					res.status(200).send(response)
					  next()
				})
			break;

			case 'DELETE':
				api.deleteClient(req.token, req.params.id, function(response){
		    	res.status(200).send(response)
					  next()
			  })
			break;

			case 'POST':
			if (req.body) {
		        api.updateClient(req.token, req.body, function(response){
		          res.status(200).send(response)
							next()
		      })
		    }
		    else {
		      res.status(403).send({
		        error: 'Please provide all required data'
		      })
					next(err)
		    }
			break;

			case 'PUT':
			if (req.body) {
		    api.addClient(req.token, req.body, function(response){
		      res.status(200).send(response)
					  next()
		      })
		    }
		    else {
		      res.status(403).send({
		        error: 'Please provide all required data'
		      })
					next(err)
		    }
			break;

			default:
			console.log("Error - default processing in dbs path")
			  next(err)
			break;

	}

 });
}

module.exports = dbs
