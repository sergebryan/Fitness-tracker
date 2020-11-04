const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const db = require("./models");

mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));

app.get("/api/workouts", (req, res) => {
  db.Workout.find({}).sort({ day: -1 }).limit(1)
    .then(lastWorkout => {
      res.json(lastWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/api/workouts", (req, res) => {

  db.Workout.create({
    day: new Date().setDate(new Date().getDate())
  })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });

});

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .then(workouts => {
      res.json(workouts);
    })
    .catch(err => {
      res.json(err);
    });
});

app.put("/api/workouts/:id", (req, res) => {

  let workoutId = req.params.id;
  let data = req.body;
  db.Workout.update({ _id: workoutId }, {
    $push: {
      exercises: [
        {
          "type": data.type,
          "name": data.name,
          "duration": data.duration,
          "distance": data.distance,
          "weight": data.weight,
          "reps": data.reps,
          "sets": data.sets
        }
      ]
    }
  })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });

});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'stats.html'));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'exercise.html'));
});

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`app listening at: http://localhost:${port}`);
});