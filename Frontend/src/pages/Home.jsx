import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
        {/* Hero Section */}
        <div className="text-center mb-16 pt-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 sm:text-5xl">
            Welcome to <span className="text-blue-600">BarterNet</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The modern platform for seamless trading between wholesalers and retailers.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          {user ? (
            <div className="space-y-8">
              <div className="flex items-center justify-center">
                <div className="h-12 w-12 hidden md:h-16 md:w-16 rounded-lg md:rounded-full bg-blue-100 md:flex items-center justify-center">
                  <span className="text-2xl text-blue-600">{user.name.charAt(0)}</span>
                </div>
                <div className="ml-4 text-left">
                  <h2 className="text-2xl font-medium text-gray-900">Hello, {user.name}</h2>
                  <p className="text-gray-600">You are logged in as a {user.role}</p>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-6">
                <Link
                  to="/dashboard"
                  className="w-full sm:w-64 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 text-center font-medium">
                  Go to Dashboard
                </Link>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
                  <Link
                    to="/explore"
                    className="p-6 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition duration-300">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Explore Products</h3>
                    <p className="text-gray-600">Browse available products from various sellers</p>
                  </Link>
                  <Link
                    to="/messages"
                    className="p-6 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition duration-300">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Connect & Trade</h3>
                    <p className="text-gray-600">Message other users and start trading</p>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="text-center max-w-md mx-auto">
                <h2 className="text-2xl font-medium text-gray-900 mb-4">
                  Join Our Trading Network
                </h2>
                <p className="text-gray-600 mb-8">
                  Connect with wholesalers and retailers for seamless trading experiences. Access
                  exclusive deals and grow your business network.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/login"
                    className="w-full sm:w-auto bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition duration-300 font-medium">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-medium">
                    Register
                  </Link>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8 mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                  <div className="p-4">
                    <div className="text-blue-600 text-2xl mb-2">✓</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Easy Trading</h3>
                    <p className="text-gray-600">Simple platform for trading goods and services</p>
                  </div>
                  <div className="p-4">
                    <div className="text-blue-600 text-2xl mb-2">✓</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Secure Transactions</h3>
                    <p className="text-gray-600">Protected exchanges between trusted partners</p>
                  </div>
                  <div className="p-4">
                    <div className="text-blue-600 text-2xl mb-2">✓</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Growing Network</h3>
                    <p className="text-gray-600">Connect with businesses around the world</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
