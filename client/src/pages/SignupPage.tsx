import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError('');
    if (!email) {
      setError('Email is required');
      return;
    }

    try {
      setLoading(true);
        await axios.post('https://note-taking-app-d5iq.onrender.com/auth/signup', { email });
      navigate('/otp', { state: { email } });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">Sign Up</h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Enter your email address to receive a one-time password.
        </p>

        {error && (
          <p className="text-red-500 text-center mb-4 text-sm font-medium">{error}</p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-2 px-4 rounded text-white font-semibold transition-colors duration-200 ${
            loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Sending OTP...' : 'Send OTP'}
        </button>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="px-2 text-sm text-gray-500">or</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        <a
          href="http://localhost:5000/auth/google"
          className="w-full block text-center bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition"
        >
          Continue with Google
        </a>
      </div>
    </div>
  );
}
