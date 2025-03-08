import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  const WholesalerFeatures = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500 hover:shadow-md transition duration-300">
        <div className="text-blue-500 text-xl mb-3">📦</div>
        <h3 className="font-medium text-lg text-gray-900 mb-2">Inventory Management</h3>
        <p className="text-gray-600 mb-4">Upload and manage your excess inventory with ease.</p>
        <Link to="/inventory" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
          Manage Inventory →
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500 hover:shadow-md transition duration-300">
        <div className="text-green-500 text-xl mb-3">🤝</div>
        <h3 className="font-medium text-lg text-gray-900 mb-2">Retailer Connections</h3>
        <p className="text-gray-600 mb-4">
          Find and connect with retailers looking for your products.
        </p>
        <Link to="/connections" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
          Browse Retailers →
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500 hover:shadow-md transition duration-300">
        <div className="text-purple-500 text-xl mb-3">📊</div>
        <h3 className="font-medium text-lg text-gray-900 mb-2">Trade Analytics</h3>
        <p className="text-gray-600 mb-4">
          Track your trades, deliveries, and business performance.
        </p>
        <Link to="/analytics" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
          View Reports →
        </Link>
      </div>
    </div>
  );

  const RetailerFeatures = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-amber-500 hover:shadow-md transition duration-300">
        <div className="text-amber-500 text-xl mb-3">🔍</div>
        <h3 className="font-medium text-lg text-gray-900 mb-2">Product Discovery</h3>
        <p className="text-gray-600 mb-4">
          Browse products from trusted wholesalers in our network.
        </p>
        <Link to="/browse-products" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
          Browse Products →
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-teal-500 hover:shadow-md transition duration-300">
        <div className="text-teal-500 text-xl mb-3">💬</div>
        <h3 className="font-medium text-lg text-gray-900 mb-2">Negotiations</h3>
        <p className="text-gray-600 mb-4">Negotiate terms and finalize trades with wholesalers.</p>
        <Link to="/negotiations" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
          View Negotiations →
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-indigo-500 hover:shadow-md transition duration-300">
        <div className="text-indigo-500 text-xl mb-3">📋</div>
        <h3 className="font-medium text-lg text-gray-900 mb-2">Order Tracking</h3>
        <p className="text-gray-600 mb-4">Track your orders and manage upcoming deliveries.</p>
        <Link to="/orders" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
          Track Orders →
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

          {user && (
            <div className="mt-4 md:mt-0 flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm text-blue-600 font-medium">{user.name.charAt(0)}</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
          )}
        </div>

        {user ? (
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Active Trades</p>
                <p className="text-2xl font-semibold text-gray-900">12</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Pending Orders</p>
                <p className="text-2xl font-semibold text-gray-900">5</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 mb-1">New Messages</p>
                <p className="text-2xl font-semibold text-gray-900">3</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Account Status</p>
                <p className="text-2xl font-semibold text-green-600">Active</p>
              </div>
            </div>

            {/* Welcome Card */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Welcome back, {user.name}!
              </h2>
              <p className="text-gray-600 mb-6">
                Here's your personalized dashboard as a{' '}
                <span className="font-medium capitalize">{user.role}</span>. Manage your trades,
                connect with partners, and grow your business all from one place.
              </p>

              {/* Role-specific Features */}
              <div className="mb-2 pb-2 border-b border-gray-100">
                <h3 className="text-lg font-medium text-gray-900">
                  {user.role === 'wholesaler' ? 'Wholesaler Features' : 'Retailer Features'}
                </h3>
              </div>

              {user.role === 'wholesaler' ? <WholesalerFeatures /> : <RetailerFeatures />}
            </div>

            {/* Recent Activity Section */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                <Link to="/activity" className="text-blue-600 hover:text-blue-800 text-sm">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                <div className="flex items-start p-3 border-l-2 border-blue-500 bg-gray-50 rounded">
                  <div className="text-blue-500 mr-3">📦</div>
                  <div>
                    <p className="text-sm text-gray-900">
                      New order received from <span className="font-medium">ABC Retail</span>
                    </p>
                    <p className="text-xs text-gray-500">Today, 10:45 AM</p>
                  </div>
                </div>
                <div className="flex items-start p-3 border-l-2 border-green-500 bg-gray-50 rounded">
                  <div className="text-green-500 mr-3">💬</div>
                  <div>
                    <p className="text-sm text-gray-900">
                      Message from <span className="font-medium">John at XYZ Wholesale</span>
                    </p>
                    <p className="text-xs text-gray-500">Yesterday, 3:20 PM</p>
                  </div>
                </div>
                <div className="flex items-start p-3 border-l-2 border-purple-500 bg-gray-50 rounded">
                  <div className="text-purple-500 mr-3">🚚</div>
                  <div>
                    <p className="text-sm text-gray-900">
                      Shipment <span className="font-medium">#12345</span> delivered
                    </p>
                    <p className="text-xs text-gray-500">Mar 5, 2025, 9:30 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="text-amber-500 text-4xl mb-4">🔒</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Authentication Required</h2>
            <p className="text-gray-600 mb-6">
              Please login to access your personalized dashboard and features.
            </p>
            <Link
              to="/login"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-medium">
              Go to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
