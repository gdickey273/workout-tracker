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
  // Workout.updateOne(
  //   { _id: req.params.id},
  //   { 
  //     $push: { exercises: req.body },
  //     $set: { totalDuration: totalDuration ? totalDuration + req.body.duration : req.body.duration}
  //   }
  //   )
  //   
});

module.exports = router;

