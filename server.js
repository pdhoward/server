'use strict';
/////////////////////////////////////////////////////
////////  		prototyping server             ///////
///////         xio labs v 1.2.0            ///////
//////////////////////////////////////////////////

const express =     require('express')
const bodyParser =  require('body-parser')
const cors =        require('cors')
const logger =      require("morgan");
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
app.use(express.static('public'));
app.use('/form', express.static('public'));
app.use(cors())


///////////////////////////////////////////////////////////////////////
/////////////////// messaging alert for platform errors ///////////////
//////////////////////////////////////////////////////////////////////

// for a test, just update the from and to -- with your personal email address and update config/gmail.js
const mailObject = {
  from: '"ChaoticBots 👥" <yourcompany@gmail.com>',
  to: 'seniordev@example.com',
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
const dbc =      express.Router();
const dba =      express.Router();
const errs =     express.Router();
const help =     express.Router();
const unk =      express.Router();

require('./routes/auth')(auth);
require('./routes/sms')(sms);
require('./routes/web')(web);
require('./routes/dbc')(dbc);
require('./routes/dba')(dba);
require('./routes/error')(errs);
require('./routes/help')(help);
require('./routes/unk')(unk);

//////////////////////////////////////////////////////////////////////////
///////////////////////////// API CATALOGUE /////////////////////////////
////////////////////////////////////////////////////////////////////////

// auth test
app.use(auth)
// help
app.get('/', help)
// twilio handling
app.use('/api/sms', sms)
// web handling
app.use('/api/web', web)
// db handling for clients and sales
app.use('/api/dbc', dbc)
// db handling for agents and products
app.use('/api/dba', dba)
//unknown request - page not found - 404
app.use(unk)
// error handling
app.use(errs)

// spin up http server
app.listen(port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', port)
})
