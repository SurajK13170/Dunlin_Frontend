import React, { useState } from 'react';
import './Auth.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('https://dunlin-backend-qa9i.onrender.com/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Registered successfully!');
         window.location.href = '/login';
      } else {
        setError(data.error || 'Error registering. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Error registering. Please try again.');
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-box'>
        <h2 className='auth-title'>Register</h2>
        <form className='auth-form' onSubmit={handleRegister}>
          <div className='input-group'>
            <label htmlFor='name'>Name</label>
            <input
              id='name'
              type='text'
              placeholder='Enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className='auth-input'
            />
          </div>
          <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='auth-input'
            />
          </div>
          <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='auth-input'
            />
          </div>
          <button type='submit' className='auth-button'>Register</button>
        </form>
        {error && <p className='auth-error'>{error}</p>}
        {success && <p className='auth-success'>{success}</p>}
      </div>
    </div>
  );
}

export default Register;
