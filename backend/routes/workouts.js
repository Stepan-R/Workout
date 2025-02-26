const express = require('express');
const {
  createWorkout,
  getAllWorkouts,
  getWorkoutById,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

router.use(requireAuth);

router.get('/', getAllWorkouts);

router.get('/:id', getWorkoutById);

router.post('/', createWorkout);

router.delete('/:id', deleteWorkout)

router.patch('/:id', updateWorkout)

module.exports = router;