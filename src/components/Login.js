import './css/login.css';
import Navigation from "./navigation/Navigation1";
import React, { useState } from 'react';

const url="https://policy-api.onrender.com/";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const email = username;
    const data = {
      email: email,
      password: password
    };
    try {
      const response = await fetch(url+'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const json = await response.json();
      console.log(json);
      localStorage.setItem('Token', json.token);
      localStorage.setItem('Name', json.name);

      if (json.role === 58585858) {
        window.location.href = './Admin';
      } else if (json.status === 'Unauthorized') {
        window.alert('Incorrect User or Password');
        window.location.href = './Login';
      } else {
        window.location.href = './Profile';
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      login();
    }
  };

  return (
    <>
      <Navigation />
      <div className='loginlayout'>
        <h1>Login</h1>
        <form>
          <br />
          <p>Username Or Email</p>
          <input
            type="text"
            id="username"
            placeholder="Enter your Username or Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <p>Password</p>
          <input
            type="password"
            id="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <br />
          <button type="button" onClick={login}>
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
