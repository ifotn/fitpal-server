"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// express imports
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
// local file imports
const exercises = require('./controllers/exercises.controller');
// create new express application
const app = (0, express_1.default)();
app.use(express_1.default.json()); //bodyParser.json());
// mongoose db conn
const db = process.env.DB || '';
mongoose_1.default.connect(db, {})
    .then((res) => console.log('Connected to MongoDB'))
    .catch((err) => console.log(`Connection Error: ${err}`));
// map urls to appropriate controllers
app.use('/api/v1/exercises', exercises);
// start server.  use random port on Render server w/4000 as fallback
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Express running on port ` + port);
});
