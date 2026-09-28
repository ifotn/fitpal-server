// express imports
import express, { Application } from "express";
import bodyParser from "body-parser"; // to read body of http POST / PUT requests

// local file imports
const exercises = require('./controllers/exercises.controller');

// create new express application
const app: Application = express();
app.use(bodyParser.json());

// map urls to appropriate controllers
app.use('/api/v1/exercises', exercises);

// start server
app.listen(4000);

// confirm server running
console.log('Express running on port 4000');