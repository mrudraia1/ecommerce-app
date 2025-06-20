const express = require('express');
const router = express.Router();
const Product = require('../models/Products');

// Get all products
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});


// Create new product
router.post('/', async (req, res) => {
    const { name, description, price, image } = req.body;
    const product = new Product({ name, description, price, image });
    await product.save();
    res.json(product);
});

module.exports = router;
