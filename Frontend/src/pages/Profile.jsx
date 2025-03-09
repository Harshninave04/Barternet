import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Profile = () => {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState('success'); // 'success' or 'error'

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { name, email, role } = res.data;
        setName(name);
        setEmail(email);
        setRole(role);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setMessage('Failed to fetch profile data.');
        setMessageType('error');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        '/api/users/profile',
        { name, email, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setMessage('Profile updated successfully!');
      setMessageType('success');
      console.log('Updated profile:', res.data);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex items-center mb-8 space-x-4">
          <div className="bg-blue-500 text-white p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Your Profile</h1>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Enter new password (leave blank to keep current)"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                    <option value="Retailer">Retailer</option>
                    <option value="Wholesaler">Wholesaler</option>
                  </select>
                </div>
              </div>

              {message && (
                <div
                  className={`p-4 rounded-md ${
                    messageType === 'success'
                      ? 'bg-green-50 text-green-800'
                      : 'bg-red-50 text-red-800'
                  }`}>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      {messageType === 'success' ? (
                        <svg
                          className="h-5 w-5 text-green-400"
                          fill="currentColor"
                          viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5 text-red-400"
                          fill="currentColor"
                          viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm">{message}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none text-white font-medium rounded-md shadow transition duration-150 ease-in-out"
                  disabled={loading}>
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
