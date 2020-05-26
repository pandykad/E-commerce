const User = require("../models/user")




exports.getUserById = (req, res, next, id) => {
     User.findById(id).exec((err, user) =>{  //database function alwys returns 2 thing : 1.err, 2.needed object i.e. here the user
         if(err || !user){
             return res.status(400).json({
                 error: "No user was found in DB"
             })
         }
        req.profile = user //user is assigned
        next()
     })
     
}

exports.getUser = (req, res) => {
    req.profile.salt = undefined // Making salt field unvisible to the GET req
    req.profile.encry_password = undefined // same for password
    return res.json(req.profile) //provides the user from the above function
}