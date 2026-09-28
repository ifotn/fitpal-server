"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// express imports
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser")); // to read body of http POST / PUT requests
// local file imports
const exercises = require('./controllers/exercises.controller');
// create new express application
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
// map urls to appropriate controllers
app.use('/api/v1/exercises', exercises);
// start server
app.listen(4000);
// confirm server running
console.log('Express running on port 4000');
