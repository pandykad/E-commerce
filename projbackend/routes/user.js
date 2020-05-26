const express = require("express")
const router = express.Router()

const {getUserById, getUser} = require("../controlllers/user")
const {isSignedin, isAuthenticated, isAdmin} = require("../controlllers/auth")

router.param("userId", getUserById)
router.get("/user/:userId",isSignedin, isAuthenticated, getUser)

module.exports = router