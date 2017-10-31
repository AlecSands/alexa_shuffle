# Idea Shuffle - Solo Project (Alexa Skill Portion)

Web application link: https://tranquil-waters-36326.herokuapp.com/#/home

Idea Shuffle is a full-stack web application developed to upgrade the efficiency and convenience of brainstorming sessions.  Brainstorming sessions are displayed as idea webs to clarify the evolving organization of ideas for users.  To add ideas, users either interact with an Amazon Echo custom skill or click on nodes in the idea web.  This readme describes the steps to set up the Alexa Skill for the application.  Follow the instructions below to get this portion of the application up and running.

## Built With

Alexa Skills Kit, AWS Lambda, Node.JS, Request, Javascript, and JSON.

## Getting Started

- Clone the repository to your local computer
- Run 'npm install' and 'npm start' in terminal
- Create an AWS Lambda function through the AWS console
- Upload a zip file to the the AWS Lambda function with all the files in this repository except for [intents_prompts.json](intents_prompts.json)
- Create a new Alexa Skill through the Amazon developer console
- Create new intents and prompts under the interaction model which match the [intents_prompts.json] file.

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- An Amazon Web Service (AWS) server will be required for the Alexa portion of the app.
- An Amazon Developer account will be required to create the skill with intents and slots.


## Screen Shots

![](screenshots/ideashuffle.gif)

## Documentation

The scope document that was used to guide the development of this web application can be found [here](https://docs.google.com/document/d/1gFspUJHuTq6Q1Px7u029CLwlKXO_vt_5K79j6dG_xvk/edit?usp=sharing).

### Completed Features

High level list of items completed.

- [x] User sign in using passport
- [x] Add feature to select and add topics
- [x] Enable users to add comments
- [x] Enable users to shuffle comments
- [x] Enable users to delete comments
- [x] Display all categories as accordions
- [x] Add drag and drop functionality to reorganize comments and categories. (stretch goal)
- [x] Implement D3 to display the structure visually (stretch goal)
- [x] Add angular material styling
- [x] Call IBM Watson API to analyze the tone of the current brainstorming session

### Next Steps

Features that you would like to add at some point in the future.

- [ ] Modify the D3 graphic to display the results of the IBM Watson API call.

<!-- ## Deployment

Add additional notes about how to deploy this on a live system -->

## Authors

* Alec Sands
