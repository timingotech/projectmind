import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/csrf/');
      const csrfToken = response.data.csrf_token;

      const headers = {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      };

      const body = JSON.stringify({ email });

      await axios.post('http://127.0.0.1:8000/password_reset/', body, { headers });

      setErrorMessage('Instructions to reset your password have been sent to your email.');
    } catch (error) {
      setErrorMessage('Failed to initiate password reset. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="mb-4 text-4xl font-bold text-center">
          Forget <span className="text-[#20e019]">Password</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your email"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#20e019] text-white py-2 px-4 rounded hover:bg-green-600"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Reset Password'}
          </button>
        </form>
        {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default ForgotPassword;
