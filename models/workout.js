const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  totalDuration: {
    type: Number,
    required: true
  },
  exercises: [{
    type: {
      type: String,
      trim: true,
      required: true
    },
    name: {
      type: String,
      trim: true,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    distance: {
      type: Number,
      required: function() { return this.type === 'cardio';}
    },
    weight: {
      type: Number,
      required: function() { return this.type === 'resistance';}
    },
    reps: {
      type: Number,
      required: function() { return this.type === 'resistance';}
    },
    sets: {
      type: Number,
      required: function() { return this.type === 'resistance';}
    }
  }]
});

workoutSchema.methods.calculateDuration = function() {
  let totalDuration = 0;

  this.exercises.forEach(exercise => {
    totalDuration += exercise.duration;
  });

  return this.totalDuration = totalDuration;
}

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;