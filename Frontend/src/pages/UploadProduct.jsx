import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, CheckCircle, Tag, Layers, ChevronDown, Clock, BarChart2 } from 'lucide-react';

const UploadProduct = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    quantity: '',
    tags: [],
    priority: 'medium',
    estimatedRestockDays: 14,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [currentTag, setCurrentTag] = useState('');
  const [recentUploads, setRecentUploads] = useState([]);
  const [showRecent, setShowRecent] = useState(false);

  const categoryOptions = [
    'Electronics',
    'Clothing',
    'Home & Kitchen',
    'Books',
    'Health & Beauty',
    'Sports & Outdoors',
    'Other',
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'bg-blue-100 text-blue-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' },
  ];

  // Fetch recent uploads
  useEffect(() => {
    const fetchRecentUploads = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/products/recent', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecentUploads(response.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching recent uploads:', error);
      }
    };

    fetchRecentUploads();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    if (currentTag.trim() !== '' && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      const res = await axios.post('/api/products/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage({
        type: 'success',
        text: 'Product uploaded successfully!',
      });
      console.log('Uploaded product:', res.data);

      // Add to recent uploads
      setRecentUploads((prev) => [res.data, ...prev].slice(0, 3));

      // Reset form after successful upload
      setFormData({
        name: '',
        description: '',
        category: '',
        quantity: '',
        tags: [],
        priority: 'medium',
        estimatedRestockDays: 14,
      });
    } catch (error) {
      console.error('Error uploading product:', error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to upload product. Please try again.',
      });
    } finally {
      setLoading(false);
      // Auto-dismiss message after 5 seconds
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:pt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-gray-500 mt-1">
              Fill in the details to add a new product to your inventory
            </p>
          </div>
          {user?.role === 'admin' && (
            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-1 rounded">
              Admin Mode
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
            {/* Progress message */}
            {message.text && (
              <div
                className={`p-4 ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
                } flex items-center`}>
                {message.type === 'success' ? (
                  <CheckCircle className="h-5 w-5 mr-2" />
                ) : (
                  <AlertCircle className="h-5 w-5 mr-2" />
                )}
                <p>{message.text}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Describe your product..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <div className="relative">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="appearance-none w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition pl-3 pr-10"
                      required>
                      <option value="" disabled>
                        Select category
                      </option>
                      {categoryOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="1"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Units available"
                    required
                  />
                </div>
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-1" />
                    <span>Product Tags</span>
                  </div>
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    className="flex-grow p-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Add tags (press Enter)"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="bg-gray-100 p-2 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-200 transition">
                    Add
                  </button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag) => (
                      <div
                        key={tag}
                        className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm flex items-center">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 text-blue-700 hover:text-blue-900">
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div> */}

              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center">
                      <Layers className="h-4 w-4 mr-1" />
                      <span>Priority Level</span>
                    </div>
                  </label>
                  <div className="flex space-x-2">
                    {priorityOptions.map((option) => (
                      <label key={option.value} className="flex-1">
                        <input
                          type="radio"
                          name="priority"
                          value={option.value}
                          checked={formData.priority === option.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div
                          className={`cursor-pointer text-center py-2 rounded-md text-sm ${
                            formData.priority === option.value
                              ? option.color + ' ring-2 ring-offset-2 ring-blue-500'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}>
                          {option.label}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Estimated Restock (Days)</span>
                    </div>
                  </label>
                  <input
                    type="range"
                    name="estimatedRestockDays"
                    min="1"
                    max="60"
                    value={formData.estimatedRestockDays}
                    onChange={handleChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 day</span>
                    <span>{formData.estimatedRestockDays} days</span>
                    <span>60 days</span>
                  </div>
                </div>
              </div> */}

              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                    onClick={() => window.history.back()}>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-6 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ${
                      loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}>
                    {loading ? 'Uploading...' : 'Upload Product'}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Uploads */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="font-medium text-gray-700">Recent Uploads</h2>
                <button
                  type="button"
                  className="text-blue-600 text-sm hover:text-blue-800"
                  onClick={() => setShowRecent(!showRecent)}>
                  {showRecent ? 'Hide' : 'Show'}
                </button>
              </div>

              {showRecent && (
                <div className="p-4 divide-y divide-gray-200">
                  {recentUploads.length > 0 ? (
                    recentUploads.map((item, index) => (
                      <div key={index} className="py-2 first:pt-0 last:pb-0">
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm text-gray-500">{item.category}</span>
                          <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                            {item.quantity} in stock
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No recent uploads</p>
                  )}
                </div>
              )}
            </div>

            {/* Inventory Statistics */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="font-medium text-gray-700 flex items-center">
                  <BarChart2 className="h-4 w-4 mr-1" />
                  Inventory Statistics
                </h2>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Electronics</span>
                      <span className="text-gray-800 font-medium">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Clothing</span>
                      <span className="text-gray-800 font-medium">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Home & Kitchen</span>
                      <span className="text-gray-800 font-medium">32%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '32%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-500">Total Products</p>
                      <p className="font-medium text-gray-800">247</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-500">Low Stock</p>
                      <p className="font-medium text-gray-800">18</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadProduct;
