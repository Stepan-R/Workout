import { useEffect } from 'react';
import { WorkoutCard } from '../components/WorkoutCard/WorkoutCard';
import './Home.css';
import WorkoutForm from '../components/WorkoutForm/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

export function HomePage() {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('http://localhost:3005/api/workouts', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        throw new Error('Something went wrong...');
      }

      const json = await response.json();

      dispatch({type: 'SET_WORKOUTS', payload: json});
    }

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className='home'>
      <div className='workouts'>
        {workouts && workouts.map((workout) => (
          <WorkoutCard key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}