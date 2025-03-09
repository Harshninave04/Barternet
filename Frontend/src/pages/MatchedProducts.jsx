import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const MatchedProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // Store available categories
  const [selectedCategory, setSelectedCategory] = useState(''); // Selected category for filtering

  // Fetch all products and extract unique categories
  useEffect(() => {
    const fetchMatchedProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/match', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Set products
        setProducts(res.data);

        // Extract unique categories from products
        const uniqueCategories = [...new Set(res.data.map((product) => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching matched products:', error);
      }
    };

    fetchMatchedProducts();
  }, []);

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-6">Matched Products</h1>

        {/* Category Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Filter by Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border rounded">
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            onClick={() => setSelectedCategory('')}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mt-2">
            Clear Filter
          </button>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product._id} className="bg-white p-6 rounded shadow-md">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-2">{product.description}</p>
              <p className="text-gray-700 mb-2">Category: {product.category}</p>
              <p className="text-gray-700 mb-2">Quantity: {product.quantity}</p>
              <p className="text-gray-700 mb-2">Wholesaler: {product.wholesaler.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchedProducts;
