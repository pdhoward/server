'use strict';

//////////////////////////////////////////////////////
////////      process sms message             ///////
////////////////////////////////////////////////////

const bodyParser =  			require('body-parser')
const request = 					require('request')
const { getContext,
        searchAgents,
 				getAllAgents,
        getNextAction } =	require('../api')
const { initialize,
        state,
        intent,
        assessconfidence,
        machine,
        agent,
        composeresponse,
        response,
        record } =        require('../stages')

const sms = (router) => {

	router.use(bodyParser.json());
	router.use(function(req, res, next) {

	console.log("-------------Incoming SMS-----------")

  let workreq = {}
  workreq.message = Object.assign({}, req.body)

  processText(workreq).then((workObj) => {
    console.log("-------ROUTE AWAIT COMPLETED-------")
    return
  }).catch((err) => {
    console.log("SMS ROUTE - ERROR IN THREAD PROCESSING")
    console.log(err)
  })


  // wrapper for processing a text through all stages
  async function processText(msgObj) {
    const workObj = await stages(msgObj, req, res)
    console.log("--------STAGES COMPLETED-------")
    return workObj
  }

  // stages to analyze text and associated info
  async function stages(obj, req, res) {
    let stage000 =    await initialize(obj)
    let test =        await state(stage000)
    let stage200 =    await intent(stage000)
    let stage300 =    await assessconfidence(stage200)
    let test2 =       await machine(test)
    let test3 =       await agent(test2)
    let stage700 =    await composeresponse(stage300)
    // pass in the res object to close off session with twilio
    let stage900 =    await response(stage700, req, res)
    let stage950 =    await record(stage900)

     return stage950
  }

 });
}

module.exports = sms
