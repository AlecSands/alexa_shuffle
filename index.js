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

// // From DB setup
// var mongoose = require('mongoose');
//
// // Mongo Connection //
// var mongoURI = '';
// // process.env.MONGODB_URI will only be defined if you
// // are running on Heroku
// if(process.env.MONGODB_URI != undefined) {
//     // use the string value of the environment variable
//     mongoURI = process.env.MONGODB_URI;
// } else {
//     var mongoRefs = require('..modules/refs.js');
//     // use the local database server
//     mongoURI = mongoRefs.MONGODB_URI;
// }
//
// // var mongoURI = "mongodb://localhost:27017/passport";
// var mongoDB = mongoose.connect(mongoURI).connection;
//
// mongoDB.on('error', function(err){
//    if(err) {
//      console.log("MONGO ERROR: ", err);
//    }
//    res.sendStatus(500);
// });
//
// mongoDB.once('open', function(){
//    console.log("Connected to Mongo!");
// });

const Alexa = require('alexa-sdk');

const request = require('request');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
  'en': {
    translation: {
      FACTS: [
        'A year on Mercury is just 88 days long.',
        'Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.',
        'Venus rotates anti-clockwise, possibly because of a collision in the past with an asteroid.',
        'On Mars, the Sun appears about half the size as it does on Earth.',
        'Earth is the only planet not named after a god.',
        'Jupiter has the shortest day of all the planets.',
        'The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.',
        'The Sun contains 99.86% of the mass in the Solar System.',
        'The Sun is an almost perfect sphere.',
        'A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.',
        'Saturn radiates two and a half times more energy into space than it receives from the sun.',
        'The temperature inside the Sun can reach 15 million degrees Celsius.',
        'The Moon is moving approximately 3.8 cm away from our planet every year.',
      ],
      SKILL_NAME: 'Space Facts',
      GET_FACT_MESSAGE: "Here's your fact: ",
      HELP_MESSAGE: 'You can say tell me a space fact, or, you can say exit... What can I help you with?',
      HELP_REPROMPT: 'What can I help you with?',
      STOP_MESSAGE: 'Goodbye!',
    },
  },
  'en-US': {
    translation: {
      FACTS: [
        'A year on Mercury is just 88 days long.',
        'Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.',
        'Venus rotates counter-clockwise, possibly because of a collision in the past with an asteroid.',
        'On Mars, the Sun appears about half the size as it does on Earth.',
        'Earth is the only planet not named after a god.',
        'Jupiter has the shortest day of all the planets.',
        'The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.',
        'The Sun contains 99.86% of the mass in the Solar System.',
        'The Sun is an almost perfect sphere.',
        'A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.',
        'Saturn radiates two and a half times more energy into space than it receives from the sun.',
        'The temperature inside the Sun can reach 15 million degrees Celsius.',
        'The Moon is moving approximately 3.8 cm away from our planet every year.',
      ],
      SKILL_NAME: 'American Space Facts',
    },
  },
  'en-GB': {
    translation: {
      FACTS: [
        'A year on Mercury is just 88 days long.',
        'Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.',
        'Venus rotates anti-clockwise, possibly because of a collision in the past with an asteroid.',
        'On Mars, the Sun appears about half the size as it does on Earth.',
        'Earth is the only planet not named after a god.',
        'Jupiter has the shortest day of all the planets.',
        'The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.',
        'The Sun contains 99.86% of the mass in the Solar System.',
        'The Sun is an almost perfect sphere.',
        'A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.',
        'Saturn radiates two and a half times more energy into space than it receives from the sun.',
        'The temperature inside the Sun can reach 15 million degrees Celsius.',
        'The Moon is moving approximately 3.8 cm away from our planet every year.',
      ],
      SKILL_NAME: 'British Space Facts',
    },
  },
  'de': {
    translation: {
      FACTS: [
        'Ein Jahr dauert auf dem Merkur nur 88 Tage.',
        'Die Venus ist zwar weiter von der Sonne entfernt, hat aber höhere Temperaturen als Merkur.',
        'Venus dreht sich entgegen dem Uhrzeigersinn, möglicherweise aufgrund eines früheren Zusammenstoßes mit einem Asteroiden.',
        'Auf dem Mars erscheint die Sonne nur halb so groß wie auf der Erde.',
        'Die Erde ist der einzige Planet, der nicht nach einem Gott benannt ist.',
        'Jupiter hat den kürzesten Tag aller Planeten.',
        'Die Milchstraßengalaxis wird in etwa 5 Milliarden Jahren mit der Andromeda-Galaxis zusammenstoßen.',
        'Die Sonne macht rund 99,86 % der Masse im Sonnensystem aus.',
        'Die Sonne ist eine fast perfekte Kugel.',
        'Eine Sonnenfinsternis kann alle ein bis zwei Jahre eintreten. Sie ist daher ein seltenes Ereignis.',
        'Der Saturn strahlt zweieinhalb mal mehr Energie in den Weltraum aus als er von der Sonne erhält.',
        'Die Temperatur in der Sonne kann 15 Millionen Grad Celsius erreichen.',
        'Der Mond entfernt sich von unserem Planeten etwa 3,8 cm pro Jahr.',
      ],
      SKILL_NAME: 'Weltraumwissen auf Deutsch',
      GET_FACT_MESSAGE: 'Hier sind deine Fakten: ',
      HELP_MESSAGE: 'Du kannst sagen, „Nenne mir einen Fakt über den Weltraum“, oder du kannst „Beenden“ sagen... Wie kann ich dir helfen?',
      HELP_REPROMPT: 'Wie kann ich dir helfen?',
      STOP_MESSAGE: 'Auf Wiedersehen!',
    },
  },
};

// var mongoURI = process.env.MONGODB_URI;

const handlers = {
  'GetAllTopicsIntent': function () {
    var importantThis = this;
    request('https://tranquil-waters-36326.herokuapp.com/topic/', function (error, response, body) {
      if (error) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response); // Print the response status code if a response was received
        importantThis.emit(":tell", "did not get a response.");
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
        console.log(message);
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
    request('https://tranquil-waters-36326.herokuapp.com/topic/', function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
    });
    // request.post({url:'http://service.com/upload', formData: formData}, function optionalCallback(err, httpResponse, body) {
    //   if (err) {
    //     return console.error('upload failed:', err);
    //   }
    //   console.log('Upload successful!  Server responded with:', body);
    // });

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
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  // To enable string internationalization (i18n) features, set a resources object.
  alexa.resources = languageStrings;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
