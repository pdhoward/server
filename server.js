'use strict';
/////////////////////////////////////////////////////
////////  		prototyping server             ///////
///////         xio labs v 1.2.0            ///////
//////////////////////////////////////////////////

const express =     require('express')
const bodyParser =  require('body-parser')
const cors =        require('cors')
const logger =      require("morgan");
const api =         require('./api')
const setup =       require('./config').init();
const transport =   require('./config/gmail')

const app =  express();

const port =        setup.port;

//////////////////////////////////////////////////////////////////////////
////////////////// db config to capture messages   //////////////////////
////////////////////////////////////////////////////////////////////////

//const db = process.env.MONGODB_URI || setup.db.uri;
const db = process.env.MONGODB_URI || setup.testdb.uri;
require('./db/mongoose')(db);

//////////////////////////////////////////////////////////////////////////
////////////////////  Register Middleware       /////////////////////////
////////////////////////////////////////////////////////////////////////
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/form', express.static('public'));
app.use(cors())

///////////////////////////////////////////////////////////////////////
/////////////////// messaging alert for platform errors ///////////////
//////////////////////////////////////////////////////////////////////

// for a test, just update the from and to -- with your personal email. Update config/gmail.js
const mailObject = {
  from: '"ChaoticBots 👥" <yourcompany@gmail.com>',
  to: 'seniordev@gmail.com',
  subject: 'Platform Error',
  text: ''
}
process.on('uncaughtException', function (er) {
    console.error(er.stack)
    mailObject.text = er.stack;
    transport.sendMail(mailObject, function (er) {
       if (er) console.error(er)
       process.exit(1)
    })
  })

//////////////////////////////////////////////////////
////////// Register and Config Routes ///////////////
////////////////////////////////////////////////////

const sms =      express.Router();
const web =      express.Router();
const auth =     express.Router();
const dbs =      express.Router();
const errs =     express.Router();
const help =     express.Router();

require('./routes/auth')(auth);
require('./routes/sms')(sms);
require('./routes/web')(web);
require('./routes/dbs')(dbs);
require('./routes/error')(errs);
require('./routes/help')(help);


//////////////////////////////////////////////////////////////////////////
///////////////////////////// API CATALOGUE /////////////////////////////
////////////////////////////////////////////////////////////////////////

// auth test
app.use(auth)
// error handling
app.use(errs)
// help
app.get('/', help)
// twilio handling
app.use('/api/sms', sms)
// web handling
app.use('/api/web', web)
// db handling
app.use('/api/db', dbs)


///////////////////////////////////////////////////
//  APIs - MongoSB Store
/////////////////////////////////////////////////
/*
app.get('/api', bodyParser.json(), (req, res) => {
  api.getMembers(req.token, function(response){
    res.status(200).send(response)
  })
})

// remove member -- update to set a boolean flag instead
app.delete('/api/:id', (req, res) => {
  api.deleteMember(req.token, req.params.id, function(response){
    res.status(200).send(response)
  })
})

// add new member
app.post('/api', bodyParser.json(), (req, res) => {
  if (req.body) {
    api.addMember(req.token, req.body, function(response){
      res.status(200).send(response)
      })
    }
    else {
      res.status(403).send({
        error: 'Please provide all required data'
      })
    }
})

// update member
app.post('/api/updateMember', bodyParser.json(), (req, res) => {
  if (req.body) {
        api.updateMember(req.token, req.body, function(response){
          res.status(200).send(response)
      })
    }
    else {
      res.status(403).send({
        error: 'Please provide all required data'
      })
    }
})

*/
// spin up http server
app.listen(port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', port)
})
