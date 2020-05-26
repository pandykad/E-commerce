const express = require("express");
var router = express.Router()
const { check, validationResult } = require('express-validator');
const { signout, signup, signin, isSignedin } = require("../controlllers/auth")




//routes
router.post("/signup",[
    check("name")
        .isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
    check("email")
        .isEmail().withMessage('email is required'),
    check("password")
        .isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
], signup)


router.post("/signin",[
    check("email")
        .isEmail().withMessage('email is required'),
    check("password")
        .isLength({ min: 3 }).withMessage('password field is required'),
], signin)

router.get("/signout", signout)

router.get("/testroute", isSignedin, (req,res) => {
    res.json(req.auth)
})


module.exports = router