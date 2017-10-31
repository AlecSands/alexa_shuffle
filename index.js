/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
* This sample demonstrates a simple skill built with the Amazon Alexa Skills
* nodejs skill development kit.
* This sample supports multiple lauguages. (en-US, en-GB, de-DE).
* The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
* as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
**/

'use strict';

var note = '';
var topic = '';
var currentEvent = {};

const Alexa = require('alexa-sdk');

const request = require('request');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

// var mongoURI = process.env.MONGODB_URI;

const handlers = {
  // Add a note to the db.
  'CreateNoteIntent': function () {
    var importantThis = this;

    console.log(filledSlots);
    note = currentEvent.request.intent.slots.Note.value;
    topic = currentEvent.request.intent.slots.Topic.value;
    console.log('logging note on line 154:', note);
    console.log('logging topic on line 155:', note);

    var filledSlots = delegateSlotCollection.call(this);

    // Modify this link to your hosted server for the main Idea Shuffle application
    request.post('https://tranquil-waters-36326.herokuapp.com/topic/alexa/' + note, {form: {key: topic}}, function (error, response, body) {
      if (error) {
        console.log('error:', error);
        importantThis.emit(":tell", "Sorry, error creating this note: " + note);
      } else {
        console.log('response:', response);
        console.log('body:', body);
        importantThis.emit(":tell", "Going to create the note: " + note + "in the topic " + topic);
      }
    });
  },
  // Lists out all topics in the db.
  'GetAllTopicsIntent': function () {
    var importantThis = this;
    // Modify this link to your hosted server for the main Idea Shuffle application
    // Sends a request to the server for topics.
    request('https://tranquil-waters-36326.herokuapp.com/topic/', function (error, response, body) {
      if (error) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response); // Print the response status code if a response was received
        importantThis.emit(":tell", "Sorry, I was unable to retrieve your topics");
      } else {
        console.log('statusCode:', response); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        var newBody = JSON.parse(body);
        var message = "";
        for (var i=0; i<newBody.length; i++) {
          if (i == newBody.length-1) {
            message = message + 'and ' + newBody[i].topic + '.';
          } else {
            message = message + newBody[i].topic + ', ';
          }
        }
        importantThis.emit(":tell", "Here are all your topics: " + message);
      }
    });
  },
  'LaunchRequest': function () {
    this.emit('GetFact');
  },
  'GetNewFactIntent': function () {
    this.emit('GetFact');
  },
  'GetFact': function () {
    // Get a random space fact from the space facts list
    // Use this.t() to get corresponding language data
    const factArr = this.t('FACTS');
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];

    // Create speech output
    const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
    this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
  },
  'AMAZON.HelpIntent': function () {
    const speechOutput = this.t('HELP_MESSAGE');
    const reprompt = this.t('HELP_MESSAGE');
    this.emit(':ask', speechOutput, reprompt);
  },
  'AMAZON.CancelIntent': function () {
    this.emit(':tell', this.t('STOP_MESSAGE'));
  },
  'AMAZON.StopIntent': function () {
    this.emit(':tell', this.t('STOP_MESSAGE'));
  },
};

exports.handler = function (event, context) {
  console.log('logging event on line 203:', event);
  currentEvent = event;
  console.log('logging context on line 203:', context);
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  // To enable string internationalization (i18n) features, set a resources object.
  alexa.resources = languageStrings;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

function delegateSlotCollection(){
  console.log("in delegateSlotCollection");
  console.log("current dialogState: "+this.event.request.dialogState);
    if (this.event.request.dialogState === "STARTED") {
      console.log("in Beginning");
      var updatedIntent=this.event.request.intent;
      //optionally pre-fill slots: update the intent object with slot values for which
      //you have defaults, then return Dialog.Delegate with this updated intent
      // in the updatedIntent property
      this.emit(":delegate", updatedIntent);
    } else if (this.event.request.dialogState !== "COMPLETED") {
      console.log("in not completed");
      // return a Dialog.Delegate directive with no updatedIntent property.
      this.emit(":delegate");
    } else {
      console.log("in completed");
      console.log("returning: "+ JSON.stringify(this.event.request.intent));
      // Dialog is now complete and all required slots should be filled,
      // so call your normal intent handler.
      return this.event.request.intent;
    }
}
