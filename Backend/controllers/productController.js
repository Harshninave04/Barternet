const Product = require('../models/Product');

const uploadProduct = async (req, res) => {
  const { name, description, category, quantity } = req.body;

  try {
    const product = await Product.create({
      name,
      description,
      category,
      quantity,
      wholesaler: req.user._id,
    });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error uploading product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('wholesaler', 'name email');
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { uploadProduct, getProducts };
