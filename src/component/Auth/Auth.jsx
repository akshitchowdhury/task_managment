import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Auth = ({ isAuth, setIsAuth }) => {
  const [admin, setAdmin] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()
  const handleLogin = (e) => {
    e.preventDefault();
    admin === 'user' && password === 'password'
      ? (setIsAuth(!isAuth), 
      alert('Log in successful'),
      navigate('/admin'))
      
      : alert('Wrong username or password');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded-lg p-6 space-y-4 w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>
        <div className="flex flex-col space-y-2">
          <label htmlFor="username" className="text-gray-600">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-indigo-500"
            value={admin}
            onChange={(e) => setAdmin(e.target.value)}
            placeholder="Enter username"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Log in
        
        </button>
      </form>
    </div>
  );
};

export default Auth;
