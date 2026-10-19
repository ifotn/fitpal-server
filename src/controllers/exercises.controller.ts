// express imports
import express, { Request, Response, Router } from "express";

// model import for CRUD
import Exercise from "../models/exercise.model.js";
import {readdirSync} from "node:fs";

// create router to map url requests to correct methods
const router: Router = express.Router();

/**
 * @swagger
 * /api/v1/exercises:
 *   get:
 *     tags:
 *     - Exercise
 *     summary: Retrieve all exercises
 *     responses:
 *       200:
 *         description: A list of exercises
 *       404:
 *         description: No exercises found
 */
router.get('/', async (req: Request, res: Response) => {
    // check request for optional "querystring" (url query) e.g. ?name=yoga
    // this does a case-sensitive full match (not partial)
    const filter = req.query;

    // use Model to retrieve exercise documents from mongodb.  may or may not have a filter
    const exercises = await Exercise.find(filter);

    if (exercises.length === 0) return res.status(404).json({ err: 'No exercises found' });

    return res.status(200).json(exercises);
});

/**
 * @swagger
 * /api/v1/exercises/{id}:
 *   get:
 *     tags:
 *     - Exercise
 *     summary: Find exercise by id
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Returns selected exercise
 *       404:
 *         description: Not Found
 */
router.get('/:id', async (req: Request, res: Response) => {
    const exercise = await Exercise.findById(req.params.id);

    if (exercise == null) return res.status(404).json({ err: 'Exercise Not Found' });

    return res.status(200).json(exercise);
});

/**
 * @swagger
 * /api/v1/exercises:
 *   post:
 *     tags:
 *     - Exercise
 *     summary: add new exercise from POST body
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *               duration:
 *                 type: integer
 *                 required: true
 *               intensity:
 *                 type: string
 *                 required: true
 *     responses:
 *       201:
 *         description: Exercise created
 *       400:
 *         description: Bad request
 */
router.post('/', async (req: Request,  res: Response) => {
    // validate request body
    if (!req.body) {
        return res.status(400).json({ err: 'Invalid Request Body' });
    }

    // use model to add new Exercise to db
    await Exercise.create(req.body);

    // send response back
    return res.status(201).json(); // 201: resource created
});

/**
 * @swagger
 * /api/v1/exercises/{id}:
 *   put:
 *     tags:
 *     - Exercise
 *     summary: updated selected exercise from request body
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *         type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *               duration:
 *                 type: integer
 *                 required: true
 *               intensity:
 *                 type: string
 *                 required: true
 *     responses:
 *       204:
 *         description: Exercise updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */
router.put('/:id', async (req: Request,  res: Response) => {
    // search array for id in url param
    const exercise = await Exercise.findById(req.params.id);

    if (exercise == null) {
        return res.status(404).json({ err: 'Exercise Not Found' });
    }

    exercise.set(req.body);
    await exercise.save(req.body);
    return res.status(204).json({ msg: 'Exercise Updated' });
});

/**
 * @swagger
 * /api/v1/exercises/{id}:
 *   delete:
 *     tags:
 *     - Exercise
 *     summary: Delete selected exercise
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *         type: string
 *         required: true
 *     responses:
 *       204:
 *         description: Deletes selected exercise
 *       404:
 *         description: Not Found
 */
router.delete('/:id', async (req: Request, res: Response) => {
    const exercise = await Exercise.findById(req.params.id);

    if (exercise == null) return res.status(404).json({ err: 'Exercise Not Found' });

    await exercise.deleteOne({ _id: req.params.id });
    return res.status(204).json({ msg: 'Exercise Deleted' });
});

/**
 * @swagger
 * /api/v1/exercises/{id}/sets:
 *   post:
 *     tags:
 *     - Exercise, Set
 *     summary: updated selected exercise to add child set document
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *         type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               setCount:
 *                 type: integer
 *                 required: true
 *               reps:
 *                 type: integer
 *                 required: true
 *               weight:
 *                 type: integer
 *                 min: 0
 *               units:
 *                 type: string
 *               rest:
 *                 type: integer
 *                 min: 0
 *     responses:
 *       201:
 *         description: Child set added
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */
router.post('/:id/sets', async (req: Request,  res: Response) => {
   // fetch selected exercise by id in url param (like for PUT / GET / DELETE)
   const exercise = await Exercise.findById(req.params.id);

   if (exercise == null) return res.status(404).json({ err: 'Exercise Not Found' });

   //console.log(req.body);

   try {
       // use the JS "spread" operator to destructure an array into separate properties ...
       // then add the set as a child object to the current exercise document
        exercise.sets.push({
            ...req.body
        });

        // commit change to db using mongoose
        await exercise.save();

        return res.status(201).json(exercise);  // 201: Resource created
   }
   catch (error) {
       // 400: Bad Request
       return res.status(400).json({ error: JSON.stringify(error) });
   }
});

// make router public so other files can access it
export default router;