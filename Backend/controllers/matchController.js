const Product = require('../models/Product');

const matchProducts = async (req, res) => {
  try {
    const { category } = req.query;

    // Find products (filter by category if provided)
    const query = category ? { category } : {};
    const products = await Product.find(query).populate('wholesaler', 'name email');

    res.status(200).json(products);
  } catch (error) {
    console.error('Error matching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { matchProducts };
