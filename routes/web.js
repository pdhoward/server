'use strict';

//////////////////////////////////////////////////////
////////      process web http message        ///////
////////////////////////////////////////////////////

const bodyParser =  			require('body-parser')
const config =          	require('../config').init()

const twilio = {
  sid: config.twilio.sid,
  token: config.twilio.token,
  tokenSecret: config.twilio.tokenSecret,
  username: config.twilio.username,
  chaotic: config.twilio.chaotic
}
const mediaConfig = {
    to: twilio.username,
    from: twilio.chaotic,
    body: "default",
    mediaUrl: "http://mercycharlotte.com/wp-content/uploads/2017/09/Guest-Messages.png"
  }
const textConfig = {
    to: twilio.username,
    from: twilio.chaotic,
    body: "more default"
  }

const web = (router) => {

	router.use(bodyParser.json());
	router.use(function(req, res, next) {

	console.log("-------------INCOMING WEB MESSAGE -----------")
  var client = require('twilio')(twilio.sid, twilio.tokenSecret);
	client.sendMessage({
				to: req.body.recipient,
				from: twilio.chaotic,
				body: 'hello world.'
			}, function (err, responseData) {
				if (!err) {
          console.log("sent message " + responseData.body + " from " + responseData.from)
					//res.json({"From": responseData.from, "Body": responseData.body});
				}
		});
  next()
 });
}

module.exports = web
