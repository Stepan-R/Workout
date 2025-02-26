require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const workoutRoute = require('./routes/workouts');
const userRoute = require('./routes/user');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/workouts', workoutRoute);
app.use('/api/user', userRoute);

mongoose.connect(process.env.MONGO)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connecting to bd and running...')
    });
  })
  .catch((error) => {
    console.log(error);
  })