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

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
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
      }
    };

    fetchProfile();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
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
      console.log('Updated profile:', res.data);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile.');
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="min-h-screen p-8 pt-16">
          <h1 className="text-2xl font-bold mb-6">Profile</h1>
          <div className="bg-white p-6 rounded shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter new password (leave blank to keep current)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <input
                  type="text"
                  value={role}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                Update Profile
              </button>
            </form>
            {message && <p className="mt-4 text-green-600">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
