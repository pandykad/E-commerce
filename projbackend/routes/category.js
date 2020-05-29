const express = require("express")
const router = express.Router()

const {getUserById} = require("../controlllers/user")
const {isSignedin, isAuthenticated, isAdmin} = require("../controlllers/auth")
const {getCategoryById, createCategory , getCategory, getAllCategory, updateCategory, removeCategory} = require("../controlllers/category")

//params
router.param("userId", getUserById)
router.param("categoryId", getCategoryById)


//actual routers
//create
router.post("/category/create/:userId", isSignedin, isAuthenticated, isAdmin, createCategory)
//read
router.get("/category/:categoryId", getCategory)
router.get("/categories", getAllCategory)
//update
router.put("/category/:categoryId/:userId", isSignedin, isAuthenticated, isAdmin, updateCategory)
//delete
router.delete("/category/:categoryId/:userId", isSignedin, isAuthenticated, isAdmin, removeCategory)

module.exports = router