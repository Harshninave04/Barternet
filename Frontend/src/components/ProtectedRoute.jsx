import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>; // Show a loading message
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
