// src/All/Authentication.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/AuthForm.css';

const Authentication = ({ setAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '1234') {
      setAuthenticated(true);
      setMessage('Login successful!');
      navigate('/dashboard');
    } else {
      setMessage('Invalid username or password.');
    }
  };

  return (
    <div className="auth-form">
      <form onSubmit={handleSubmit}>
        <h2>Welcome Usha</h2>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default Authentication;
