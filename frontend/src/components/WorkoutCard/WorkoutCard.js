import { useAuthContext } from '../../hooks/useAuthContext';
import { useWorkoutsContext } from '../../hooks/useWorkoutsContext';
import './WorkoutCard.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export function WorkoutCard({ workout }) {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('http://localhost:3005/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: { _id: workout._id }})
    }
  }

  return (
    <div className="workout_card">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <img src='/trash.svg' alt='trach bin' onClick={handleDelete}></img>
    </div>
  )
}