import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute'; 
import UploadProduct from './pages/UploadProduct';
import BrowseProducts from './pages/BrowseProducts';
import MatchedProducts from './pages/MatchedProducts';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/browse-products" element={<BrowseProducts />} />
          </Route>

          <Route element={<ProtectedRoute role="Wholesaler" />}>
            <Route path="/upload-product" element={<UploadProduct />} />
          </Route>
          <Route element={<ProtectedRoute role="Retailer" />}>
            <Route path="/matched-products" element={<MatchedProducts />} />
          </Route>

          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
