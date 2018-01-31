'use strict';

///////////////////////////////////////////////////////////////
//////// process db http message for agents and products /////
/////////////////////////////////////////////////////////////

const bodyParser =  			require('body-parser')
const api =         			require('../apia')

const dba = (router) => {

	router.use(bodyParser.json());

	router.delete("/:id", function(req, res, next) {
 	 console.log("-------------DELETING DB MESSAGE AGENTS -----------")
	 console.log(JSON.stringify(req.params.id))
 	 api.deleteAgent(req.token, req.params.id, function(response){
 		 res.status(200).send(response)
 			 next()
 	 })
  })

	router.use(function(req, res, next) {

	console.log("------------MORE-INCOMING DB MESSAGE AGENTS -----------")
  let method = req.method

	switch(method) {
			case 'GET':
				api.getAgents(req.token, function(response){
					res.status(200).send(response)
					  next()
				})
			break;
			/*
			case 'DELETE':
				api.deleteAgent(req.token, req.params.id, function(response){
		    	res.status(200).send(response)
					  next()
			  })
			break;
			*/
			case 'POST':
			if (req.body) {
		        api.updateAgent(req.token, req.body, function(response){
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
		    api.addAgent(req.token, req.body, function(response){
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
				console.log("Default processing in dbs path")
			  next()
			break;

	}

 });

}

module.exports = dba
