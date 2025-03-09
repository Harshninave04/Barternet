import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({role}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>; // Show a loading message
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />; // Redirect to homepage if role doesn't match
  }

  return <Outlet />;
};

export default ProtectedRoute;
