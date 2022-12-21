import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const SignUp = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const { createUser } = UserAuth();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUser(email, password);
      navigate('/progresspage')
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className='signup-container'>
      <div>
        <h1>Sign up for a free account</h1>
        <p>
          Already have an account yet?{' '}
          <button onClick={props.signInButton}>Sign In</button>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='signup-email-container'>
          <label>Email Address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type='email'
          />
        </div>
        <div className='signup-password-container'>
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type='password'
          />
        </div>
        <button>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
