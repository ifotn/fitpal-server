"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// express imports
const express_1 = __importDefault(require("express"));
// create router to map url requests to correct methods
const router = express_1.default.Router();
;
let exercises = [
    { id: 1, name: 'Squats' },
    { id: 2, name: 'Rope Jumping' },
    { id: 3, name: 'Jogging' },
    { id: 4, name: 'Volleyball' }
];
/* GET: /api/v1/exercises => fetch all exercises */
router.get('/', (req, res) => {
    return res.status(200).json(exercises);
});
/* POST: /api/v1/exercises => create new exercise */
router.post('/', (req, res) => {
    // validate request body
    if (!req.body) {
        return res.status(400).json({ err: 'Invalid Request Body' });
    }
    // add new exercise to array from request body
    exercises.push(req.body);
    // send response back
    return res.status(201).json(); // 201: resource created
});
// make router public so other files can access it
module.exports = router;
