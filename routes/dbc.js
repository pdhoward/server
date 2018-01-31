'use strict';

///////////////////////////////////////////////////////////////
//////// process db http message for clients and sales ///////
/////////////////////////////////////////////////////////////

const bodyParser =  			require('body-parser')
const api =         			require('../api')

const dbc = (router) => {

	router.use(bodyParser.json());
	router.delete("/:id", function(req, res, next) {
 	 console.log("-----------DB Clients ROUTE -----------")
 	 api.deleteClient(req.token, req.params.id, function(response){
 		 res.status(200).send(response)
		 next()
 	  })
   })

	router.get('/', function(req, res, next) {
		 console.log("-----------DB Clients ROUTE -----------")
		api.getClients(req.token, function(response){
			res.status(200).send(response)
			next()
			})
		})

	 router.post('/', function(req, res, next) {
		  console.log("-----------DB Clients ROUTE -----------")
			if (req.body) {
		     api.updateClient(req.token, req.body, function(response){
		       res.status(200).send(response)
					 next()
		      })
		    }
		    else {
					let err = new Error('Error Post DBA - Please Provide All Required Data')
		      res.status(403).send(err.message)
					next(err)
		   }
		 })

	 router.put('/', function(req, res, next) {
		  console.log("-----------DB AGENTS ROUTE -----------")
			if (req.body) {
		     api.addClient(req.token, req.body, function(response) {
		       res.status(200).send(response)
					 next()
		      })
		    }
		    else {
					let err = new Error('Error Put DBA - Please Provide All Required Data')
		      res.status(403).send(err.message)
					next(err)
		   }
		 })

}

module.exports = dbc
