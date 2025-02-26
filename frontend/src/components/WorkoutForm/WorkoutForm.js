import { useState } from 'react';
import './WorkoutForm.css';
import { useWorkoutsContext } from '../../hooks/useWorkoutsContext';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function WorkoutForm() {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return <h1>You must login first!</h1>
    }

    const newWorkout = { title, load, reps };

    const response = await fetch('http://localhost:3005/api/workouts', {
      method: 'POST',
      body: JSON.stringify(newWorkout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error)
    }

    if (response.ok) {
      setTitle('');
      setLoad('');
      setReps('');
      setError(null);
      console.log(json);
      dispatch({type: 'CREATE_WORKOUTS', payload: json})
    }
  }

  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add a new Workout</h3>

      <label>Excersize Title:</label>
      <input 
        type='text' 
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <label>Load (in kg):</label>
      <input 
        type='number' 
        value={load}
        onChange={e => setLoad(e.target.value)}
      />

      <label>Reps:</label>
      <input 
        type='number' 
        value={reps}
        onChange={e => setReps(e.target.value)}
      />

      <button>Add Workout</button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}