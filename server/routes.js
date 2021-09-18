require('dotenv').config();
const express = require("express");
const products = require("./products.json");

module.exports = function getRoutes() {
  const router = express.Router();

  router.get('/products', getProducts);
  router.get('/products/:productID', getProduct);
  return router;
};

function getProducts(req, res) {
  res.status(200).json({ products });
}

function getProduct(req, res) {
  const { productID } = req.params;
  const product = products.find(product => product.id === productID)

  try{
    if(!product) {
      throw Error(`No product found for id : ${productID}`)
    }
    res.status(200).json({ product })    
  } catch (error) {
    res.status(404).json({ statusCode: 404, message: error.message });
  }
}
