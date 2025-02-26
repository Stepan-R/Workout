import React, { useState } from 'react';
import './Form.css';
import { useLogin } from '../hooks/useLogin';
import { Link } from 'react-router-dom';

export const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useLogin();

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

    await login(email, password);
    setEmail('');
    setPassword('');
  }

  return (
    <div className='form-layout'>
      <form className='form-card' onSubmit={handleSubmitForm}>
          <h1>Login to your account</h1>
      
          <div className='form-input'>
            <label>Email:</label>
            <input
              type='email' 
              placeholder='Example2025@gmail.com'
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={emailError && 'alert-input'}
            />
            {emailError && (
              <div className='error-msg'>
                <img className='alert-img' src='alert.svg' alt='alertImg' />
                <label className='alert-msg'>Please enter valid email!</label>
              </div>
            )}
          </div>
      
          <div className='form-input'>
            <label className='label-password'>
              <label>Password:</label>
            </label>
            <input 
              type={showPass ? 'text' : 'password'} 
              placeholder='Password1234' 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={passError && 'alert-input'}
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
      
          <button disabled={isLoading} type='submit' className='form-btn'>Login now</button>
      
          <label className='link_change'>
            Don't have an account ? 
            <Link to='/signup' className='link_link'>Sign up</Link>
          </label>
          {error && (
            <label className='alert-msg error_style'>{error}</label>
          )}
      </form>
    </div>
  )
}