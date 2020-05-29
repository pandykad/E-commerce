const express = require("express")
const router = express.Router()

const {getUserById, getUser, getAllUsers, updateUser, userPurchaseList} = require("../controlllers/user")
const {isSignedin, isAuthenticated, isAdmin} = require("../controlllers/auth")

router.param("userId", getUserById)
router.get("/user/:userId", isSignedin, isAuthenticated, getUser)
router.put("/user/:userId", isSignedin, isAuthenticated, updateUser)
router.put("/orders/user/:userId", isSignedin, isAuthenticated, userPurchaseList)
router.get("/users", getAllUsers) // Excercise

module.exports = router