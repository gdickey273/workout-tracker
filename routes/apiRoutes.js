const router = require("express").Router();
const Workout = require("../models/workout.js");

router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts", (req, res) => {
  const newWorkout = new Workout(req.body);

  newWorkout.calculateDuration();

  Workout.create(newWorkout)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", async (req, res) => {
  console.log("I'm trying!");
  const workoutDoc = await Workout.findOne({ _id: req.params.id });

  console.log("Found it!", workoutDoc);

  workoutDoc.exercises.push(req.body);
  workoutDoc.totalDuration += req.body.duration;
  console.log("tryna update it!", workoutDoc);
  workoutDoc.save()

  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
  console.log("saved!");  
});

router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
  .sort({ "day": -1 })
  .limit(7)
  .exec((err, docs) => {
    if (err) res.status(404).json(err);
    res.status(200).json(docs);
  })
});

router.delete("/api/workouts", ({ body }, res) => {
  Workout.findByIdAndDelete(body.id);
});

module.exports = router;

