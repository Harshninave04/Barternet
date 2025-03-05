import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          BarterNet
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="flex items-center space-x-4">
                <span className="hidden sm:inline">Welcome, {user.name}!</span>
                <span className="hidden sm:inline">({user.role})</span>
                <Link to="/dashboard" className="hover:text-blue-200">
                  Dashboard
                </Link>
                <button onClick={logout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200">
                Login
              </Link>
              <Link to="/register" className="bg-green-500 px-4 py-2 rounded hover:bg-green-600">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
