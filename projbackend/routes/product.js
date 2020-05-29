const express = require("express")
const router = express.Router()

const {getUserById} = require("../controlllers/user")
const {isSignedin, isAuthenticated, isAdmin} = require("../controlllers/auth")
const {getProductById} = require("../controlllers/product")

//params
router.param("userId", getUserById)
router.param("productId", getProductById)






module.exports = router