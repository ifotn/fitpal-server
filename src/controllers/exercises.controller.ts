// express imports
import express, { Request, Response, Router } from "express";

// create router to map url requests to correct methods
const router: Router = express.Router();

// mock data for CRUD
interface Exercise {
    id: number,
    name: string
};

let exercises = [
    { id: 1, name: 'Squats' },
    { id: 2, name: 'Rope Jumping' },
    { id: 3, name: 'Jogging' },
    { id: 4, name: 'Volleyball' }
];

/* GET: /api/v1/exercises => fetch all exercises */
router.get('/', (req: Request, res: Response) => {
    return res.status(200).json(exercises);
});

/* POST: /api/v1/exercises => create new exercise */
router.post('/', (req: Request,  res: Response) => {
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