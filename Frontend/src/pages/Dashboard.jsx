import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {user && (
        <div className="bg-white p-6 rounded shadow-md">
          <p>Welcome, {user.name}!</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <button onClick={logout} className="mt-4 bg-red-500 text-white p-2 rounded">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
