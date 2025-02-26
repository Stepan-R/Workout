import React, { useState } from 'react';
import './Form.css';
import { useSignup } from '../hooks/useSignup';
import { Link } from 'react-router-dom';

export const Signup = () => {
  const [showPass, setShowPass] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, isLoading, error } = useSignup();

  const toggleShowPass = () => {
    setShowPass(prev => !prev);
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    setEmailError(false);
    setPassError(false);

    if (!email.includes('@')) {
      setEmailError(true);
    }

    if (password.length < 8) {
      setPassError(true);
    }

    await signup(email, password)
    setEmail('');
    setPassword('');
  }

  return (
    <div className='form-layout'>
      <form className='form-card' onSubmit={handleSubmitForm}>
          <h1>Create an account</h1>

          <div className='form-input'>
            <label>Email</label>
            <input 
              type='email' 
              placeholder='Example2025@gmail.com'
              className={emailError && 'alert-input'}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {emailError && (
              <div className='error-msg'>
                <img className='alert-img' src='alert.svg' alt='alertImg' />
                <label className='alert-msg'>Please enter valid email!</label>
              </div>
            )}
          </div>

          <div className='form-input'>
            <label>Password</label>
            <input 
              type={showPass ? 'text' : 'password'} 
              placeholder='Password1234'
              className={passError && 'alert-input'}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <img 
              src={showPass ? 'openEye.png' : 'closedEye.png'} 
              alt='eye'
              onClick={toggleShowPass}
            />
            {passError && (
              <div className='error-msg'>
                <img className='alert-img' src='alert.svg' alt='alertImg' />
                <label className='alert-msg'>Password must be 8 digit min!</label>
              </div>
            )}
          </div>
          <button disabled={isLoading} className='form-btn'>Create an account</button>

          <label className='link_change'>
            Already have an account ? 
            <Link to='/login' className='link_link'>Log In</Link>
          </label>

          {error && (
            <label className='alert-msg error_style'>{error}</label>
          )}
      </form>
    </div>
  )
}