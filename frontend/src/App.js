import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header/Header';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { HomePage } from './pages/Home';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path='/' element={user ? <HomePage /> : <Navigate to='/login' />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
      </Routes>
    </div>
  );
}

export default App;
