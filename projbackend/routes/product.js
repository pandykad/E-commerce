const express = require("express")
const router = express.Router()

const {getUserById} = require("../controlllers/user")
const {isSignedin, isAuthenticated, isAdmin} = require("../controlllers/auth")
const {getProductById, createProduct, getProduct, photo, updateProduct, deleteProduct, getAllProduct, getAllUniqueCategories} = require("../controlllers/product")

//params
router.param("userId", getUserById)
router.param("productId", getProductById)

//actual routers
//create
router.post("/product/create/:userId", isSignedin, isAuthenticated, isAdmin, createProduct)
//read
router.get("/product/:productId", getProduct)
router.get("/product/photo/:productId", photo)
//update
router.put("/product/:productId/:userId", isSignedin, isAuthenticated, isAdmin, updateProduct)
//delete
router.delete("/product/:productId/:userId", isSignedin, isAuthenticated, isAdmin, deleteProduct)
//listing
router.get("/products", getAllProduct)
//listing categories
router.get("/products/categories", getAllUniqueCategories)

module.exports = router