// express imports
import express, { Application } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser"; // to read body of http POST / PUT requests

// local file imports
const exercises = require('./controllers/exercises.controller');

// create new express application
const app: Application = express();
app.use(express.json()); //bodyParser.json());

// mongoose db conn
const db: string = process.env.DB || '';

mongoose.connect(db,  {})
    .then((res) => console.log('Connected to MongoDB'))
    .catch((err) => console.log(`Connection Error: ${err}`));

// map urls to appropriate controllers
app.use('/api/v1/exercises', exercises);

// start server.  use random port on Render server w/4000 as fallback
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Express running on port ` + port);
});

