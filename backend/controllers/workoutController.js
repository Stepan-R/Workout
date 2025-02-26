const workoutModel = require('../models/workoutModel');
const WorkoutModel = require('../models/workoutModel');
const mongoose = require('mongoose');

// GET all the Workouts
const getAllWorkouts = async (req, res) => {
  const user_id = req.user._id;
  const workouts = await WorkoutModel.find({ user_id }).sort({createdAt: -1});

  res.json(workouts).status(200);
};

// GET a Workout by ID
const getWorkoutById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Could find such a workout!' });
  }

  const workout = await WorkoutModel.findById(id);

  if (!workout) {
    return res.status(404).json({ error: 'Could find such a workout!' });
  }

  res.json(workout).status(200);
}

// CREATE a new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  try {
    const user_id = req.user._id;
    const workout = await WorkoutModel.create({ title, reps, load, user_id });
    res.status(200).json(workout);
  }
  catch(error) {
    res.status(401).json({ error: error.message });
  }
};

// DELETE a Workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Could not find such a workout!' });
  }

  const workout = await workoutModel.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(400).json({ error: 'Could not find such a workout!' })
  }

  res.status(200).json('Workout is deleted!');
}

// UPDATE a Workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Could not find such a workout!' });
  }

  const workout = await workoutModel.findOneAndUpdate({ _id: id }, {
    ...req.body
  });

  if (!workout) {
    return res.status(400).json({ error: 'Could not find such a workout!' })
  }

  res.status(200).json(workout);
}

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  deleteWorkout,
  updateWorkout
};