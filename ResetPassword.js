// ResetPassword.js

import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
  const token = useSearchParams().get('token'); // Get token from URL parameters
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(''); // Clear any previous errors

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      setIsLoading(false);
      return; // Prevent sending request if passwords don't match
    }

    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      const body = JSON.stringify({ new_password1: password, new_password2: password });

      const response = await axios.post(
        `http://localhost:8000/accounts/password_reset/confirm/?token=${token}`,
        body,
        { headers }
      );

      // Handle successful password reset
      console.log('Password reset successfully!');
      // You can redirect to login page or display a success message here

    } catch (error) {
      console.error(error); // Log error for debugging
      setIsLoading(false);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-4xl font-bold text-center mb-4">
          Reset <span className="text-[#20e019]">Password</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded-md"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full p-2 border rounded-md"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {!passwordMatch && (
            <p className="text-red-500 text-sm mb-4">Passwords do not match. Please try again.</p>
          )}
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}
          <button type="submit" className="bg-[#20e019] text-white py-2 px-4 rounded hover:bg-green-600" disabled={isLoading}>
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
