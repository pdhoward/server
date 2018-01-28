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
const db = process.env.MONGODB_URI || setup.db.uri;
//const db = process.env.MONGODB_URI || keys.testdb.uri;
require('./db/mongoose')(db);

//////////////////////////////////////////////////////////////////////////
////////////////////  Register Middleware       /////////////////////////
////////////////////////////////////////////////////////////////////////
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'));
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
const errs =     express.Router();
const help =     express.Router();

require('../routes/auth')(auth);
require('../routes/sms')(sms);
require('../routes/web')(web);
require('../routes/error')(errs);
require('../routes/help')(help);


//////////////////////////////////////////////////////////////////////////
///////////////////////////// API CATALOGUE /////////////////////////////
////////////////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
  const help = `
  <pre>
    Test Server Platform

    Use an Authorization header to work with your own data:
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})
    Endpoints vary by dbstore being modeled. Check the code for details

    &copy2016 xio all rights reserved
  </pre>
  `

  res.send(help)
})



///////////////////////////////////////////////////
//      Simple authorization test
/////////////////////////////////////////////////
app.use((req, res, next) => {
  const token = req.get('Authorization')
  if (token) {
    req.token = token
    next()
  } else {
    console.log("Temp Workaround on Server Auth" )
    req.token = "123456"
    next()

  }
})

///////////////////////////////////////////////////
// Administrative Management
/////////////////////////////////////////////////
app.use('/admin', adminRoute)

///////////////////////////////////////////////////
//  APIs - MongoSB Store
/////////////////////////////////////////////////

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

// add a new member from chat widget
app.post('/chat', bodyParser.json(), (req, res) => {
  console.log("this worked")
  console.log(req.body)
  //res.send(req.body)
  if (req.body) {
    api.addMemberFromChat(req.token, req.body, function(response){
      res.status(200).send(response)
      })
    }
    else {
      res.status(403).send({
        error: 'Please provide all required data'
      })
    }
})

///////////////////////////////////////////////////
// State Machine
/////////////////////////////////////////////////
var Example = require("./db/schemas/exampleModel.js");

const machineRoute =     express.Router();
require('./routes/machine/design1')(machineRoute);

app.get("/machine", machineRoute )

app.post("/submit", function(req, res) {

  req.body.array = ["item1", "item2", "item3"];
  req.body.boolean = false;

  var content = new Example(req.body);

  content.save(function(error, doc) {
    if (error) {
      res.send(error);
    }
    else {
      res.send(doc);
    }
  });
});


// spin up http server
app.listen(port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', port)
})
