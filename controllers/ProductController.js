const Product = require('../models/products');
const User = require('../models/user');
async function createProduct(req, res) {
        const {name,description,categoryType,price,userId} = req.body;
        const product = new Product(
            {name, description, categoryType, price, userId}
        );
        const savedProduct = await Product.create(product);
      return  res.status(201).json(savedProduct);
}
async function getAllProducts(req, res) {
        const products = await Product.find();
        return res.status(200).json(products)
}
async function getProductById(req, res) {
    const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return  res.status(200).json(product);
}
async function updateProduct(req, res) {
    const { id } = req.params;
    const { name, description, categoryType, price, userId } = req.body;

        const product = await Product.findByIdAndUpdate(
            id,
            { name, description, categoryType, price, userId },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json(product);
}
async function deleteProduct(req, res) {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product is deleted." });
}

module.exports = {createProduct,getAllProducts, getProductById, updateProduct,deleteProduct}