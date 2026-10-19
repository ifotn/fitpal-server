import mongoose, { Schema } from "mongoose";

interface IExercise {
    name: string;
    duration: number;
    intensity: string;
    date: Date;
    sets: ISet[]; // child data array: 1 exercise can have many sets
}

// child data for strength-training (mostly) sets
interface ISet {
    setCount: number;
    reps: number;
    weight: number;
    units: string;
    rest: number;
}

const setSchema = new Schema({
    setCount: {
        type: Number,
        required: [true, 'Set Count is required']
    },
    reps: {
        type: Number,
        required: [true, 'Reps are required']
    },
    weight: {
        type: Number,
        min: 0
    },
    units: {
        type: String,
        enum: ['KG', 'LB']
    },
    rest: {
        type: Number,
        min: 0
    }
})

// define model including validation
const exerciseSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    duration: {
        type: Number,
        min: 1
    },
    intensity: {
        type: String,
        enum: ['Low', 'Medium', 'High']
    },
    date: {
        type: Date,
        default: Date.now
    },
    sets: [setSchema]
});

// create model, inheriting from mongoose and make public
const Exercise = mongoose.model<IExercise>('Exercise', exerciseSchema);
export default Exercise;