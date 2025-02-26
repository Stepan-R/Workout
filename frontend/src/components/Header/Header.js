import { Link } from 'react-router-dom';
import './Header.css';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

export const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogOut = () => {
    logout();
  }

  return (
    <header>
      <div className='header_layout'>
        <Link to='/' className='header_link'>
          <h1 className='header_h1'>Workout Buddy!</h1>
        </Link>
        <nav className='nav_layout'>
          {user && (
            <div className='links_layout'>
              <div className='welcome_layout'>Hello
                <img src='./hand.svg' alt='hello hand' className='welcome_hand'/>
                <span className='email_name'>
                  {user.email.split('@')[0]}
                </span>
              </div>
              <button  className='logout_btn' onClick={handleLogOut}>Log out</button>
            </div>
          )}
          {!user && (
            <div className='log_layout'>
              <Link className='header_link' to='/login'>Login</Link>
              <Link className='header_link' to='/signup'>SignUp</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}