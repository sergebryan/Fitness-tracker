const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
    day: {
        type: Date,
    },
    exercises: [
        {
            type: {
                type: String,
            },
            name: {
                type: String,
            },
            duration: {
                type: Number,
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            },
            distance: {
                type: Number
            }
        }
    ]
},
    {
        toJSON: {
            virtuals: true
        }
    }
);

WorkoutSchema.virtual("totalDuration").get(function() {
    return this.exercises.reduce((sum, exercise) => sum + exercise.duration, 0)
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = { Workout };