# Idea Shuffle - Solo Project (Alexa Skill Portion)

Web application link: https://tranquil-waters-36326.herokuapp.com/#/home

Idea Shuffle is a full-stack web application developed to upgrade the efficiency and convenience of brainstorming sessions.  Brainstorming sessions are displayed as idea webs to clarify the evolving organization of ideas for users.  To add ideas, users either interact with an Amazon Echo custom skill or click on nodes in the idea web.  This readme describes the steps to set up the Alexa Skill for the application.  Follow the instructions below to get this portion of the application up and running.

## Built With

Alexa Skills Kit, AWS Lambda, Node.JS, Request, Javascript, and JSON.

## Getting Started

- Clone the repository to your local computer
- Run 'npm install' and 'npm start' in terminal
- Create an AWS Lambda function through the AWS console
- Modify the paths in the [index.js](index.js) to reference your hosted server for the main Idea Shuffle application
- Upload a zip file to the the AWS Lambda function with all the files in this repository except for [intents_prompts.json](intents_prompts.json)
- Create a new Alexa Skill through the Amazon developer console
- Create new intents and prompts under the interaction model which match the [intents_prompts.json](intents_prompts.json) file.
- Enable the skill for testing and then load it onto your Amazon Echo

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- You have and Amazon and Amazon Developer account
- You have already setup of the server for the main [Idea Shuffle](https://github.com/AlecSands/idea_shuffle) application

<!-- ## Screen Shots

![](screenshots/ideashuffle.gif) -->

## Documentation

The scope document that was used to guide the development of this web application can be found [here](https://docs.google.com/document/d/1gFspUJHuTq6Q1Px7u029CLwlKXO_vt_5K79j6dG_xvk/edit?usp=sharing).

### Completed Features

- [x] Users can retrieve a list of all the current topics from the database and have it read to them
- [x] Users can add ideas to the database from the Echo
- [x] Interaction model is set to a dialogue model to retrieve multiple pieces of information

### Next Steps

- [ ] Add more more options for how the user interacts with the existing brainstorming ideas
- [ ] Add feature so users can hear what all the ideas in the current topi are

## Authors

* Alec Sands
